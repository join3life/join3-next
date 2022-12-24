import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { NFTStorage } from "nft.storage";
import Header from "../../components/layouts/Headers";
import Back from "../../components/Back";
import {
  NFT_STORAGE_API_KEY,
  contractABI,
  contractAddress,
} from "../../utils/constants";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import Organization from "../../contexts/Organization";
import { convertSvgToFile } from "../../utils/tool";
import { useEffect } from "react";

import { IoIosAddCircleOutline } from "react-icons/io";
import { BsArrowUpCircleFill } from "react-icons/bs";

// Exported Types

export default function Badge() {
  const { info } = useContext(Organization);
  const [collection, setCollection] = useState();
  useEffect(() => {
    if (info) {
      setCollection([...info?.skills, ...info?.events, ...info?.projects]);
    }
  }, []);

  console.log(collection);
  const { register, handleSubmit } = useForm();

  const [name, setName] = useState("");
  const [ipfs, setIpfs] = useState("");

  const StoreMetadata = async (Name, Description, Collectionname) => {
    console.log("Preparing Metadata ....");
    const nft = {
      name: Name,
      description: Description,
      image: convertSvgToFile(Name),
      attributes: [
        {
          trait_type: "projects", // projects, skills, events 这边是用户选择的 ( select 下拉)
          value: Collectionname, // ( 不需要填写，继承自 colletion，保持一致性)
        },
      ],
    };
    console.log("Uploading Metadata to IPFS ....");
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
    const metadata = await client.store(nft);
    console.log("NFT data stored successfully 🚀🚀");
    return metadata;
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setIpfs(null);
      const metadata = await StoreMetadata(
        data.name, //用户填写的name
        data.description,
        data.name
      );
      const uri = metadata.url;
      setIpfs(uri);
      const url = `https://ipfs.io/ipfs/${metadata.ipnft}`;
      setIpfsUri(url);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("url", url);
        //collectionname
        ipfs && contract.mintNFT(name, ipfs, data.address); //todo name 因为合约创建不一致的原因，无法用
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="p-12">
        <div className="flex justify-between items-center">
          <div className="w-40">
            <Back />
          </div>
          <div className="font-bold text-3xl w-26">Badge Awarding</div>
          <div className="flex gap-3 w-26">
            <div className="btn">Save</div>
            <div className="btn">Review</div>
          </div>
        </div>
        <div className="p-20 pl-36 flex flex-col gap-3">
          <div className="">Step1</div>
          <div className="font-bold text-2xl">Choose Collection</div>
          <div className="flex gap-3">
            <select
              onChange={(e) => setName(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Please choose Collection
              </option>
              {collection?.map((item, index) => {
                return (
                  <>
                    <option
                      key={index}
                      value={item.name}
                      label={item.name}
                    ></option>
                  </>
                );
              })}
            </select>
            <div>
              <button
                className="btn"
                onClick={() => {
                  console.log(name);
                }}
              >
                New
              </button>
            </div>
          </div>
          <div className="mt-20">Step2</div>
          <div className="font-bold text-2xl">Choose Member</div>
          <div className="border h-56 f-c-c">No Member Selected</div>
          <div className="flex gap-8">
            <div className="f-c-c gap-1 cp">
              <IoIosAddCircleOutline size={30} />
              Add Member
            </div>
            <div className="f-c-c gap-1 cp">
              <BsArrowUpCircleFill size={26} />
              Upload Address
            </div>
          </div>
          <div className="mt-20">Step3</div>
          <div className="font-bold text-2xl">Set MetaData</div>
        </div>

        <div className="">
          <div className="flex">
            <form
              action=""
              className="max-w-xl w-screen m-auto py-10 px-8 border text-gray-700"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="">Name to the NFT</label>
              <input
                className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
                placeholder=""
                autoFocus
                {...register("name", {
                  required: "Please enter a your name.",
                })}
              />
              <label htmlFor="">Description to the NFT</label>
              <input
                className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
                placeholder=""
                autoFocus
                {...register("description", {
                  required: "Please enter a your name.",
                })}
              />
              <label htmlFor="">Send to the Address</label>
              <input
                className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
                placeholder=""
                autoFocus
                {...register("address", {
                  required: "Please enter a your name.",
                })}
              />
              <div className="f-c-c mt-6">
                <button className="btn" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

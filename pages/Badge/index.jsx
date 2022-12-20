import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { useState, useContext } from "react";
import { NFTStorage } from "nft.storage";
import {
  NFT_STORAGE_API_KEY,
  contractABI,
  contractAddress,
} from "../../utils/constants";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import Organization from "../../contexts/Organization";
import { convertSvgToFile } from "../../utils/tool";

// Exported Types

export default function Badge() {
  const router = useRouter();
  const { info } = useContext(Organization);
  const { skills, events, projects } = info;
  console.log("info", info);

  const collection = [...skills, ...events, ...projects];
  if (skills.length && events.length && projects.length) {
  }

  console.log(collection);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ipfsUri, setIpfsUri] = useState("");
  const [ipfs, setIpfs] = useState("");

  const { address } = useAccount();

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
    try {
      setIpfs(null);
      const metadata = await StoreMetadata(name, data.description, data.name);
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
        ipfs && contract.mintNFT(name, ipfs, data.address); //todo name 因为合约创建不一致的原因，无法用
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header>
        <div className="border-b h-[60px] bg-[#C9CDD4] flex justify-center items-center">
          <div className="h-[55px] w-full flex justify-between items-center">
            <div>back</div>
            <div>
              <div>money</div>
              <div>address</div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <h1>Badge Awarding</h1>
        {/* <div className="w-full flex items-center justify-center">
          <button className="btn">Save</button> |
          <button className="btn">Review</button>
        </div> */}
        <div className="w-full">
          <div className="w-full text-center">step1</div>
          <div className="w-full flex justify-center items-center">
            <select
              onChange={(e) => setName(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Please choose Collection
              </option>
              {collection.map((item) => {
                return (
                  <>
                    <option
                      key={item.id}
                      value={item.name}
                      label={item.name}
                    ></option>
                  </>
                );
              })}
            </select>
            {/* <div>
              <button
                className="btn"
                onClick={() => {
                  console.log(name);
                }}
              >
                New
              </button>
            </div> */}
          </div>
        </div>
        <div className="w-full">
          <div className="w-full text-center ">
            step3<h1>set Metadata</h1>
          </div>
          <div className="flex">
            <form
              action=""
              className="max-w-xl w-screen m-auto py-10 mt-10 px-8 border text-gray-700"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="">Name to the NFT</label>
              <input
                className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
                placeholder=""
                autoFocus
                {...register("name", { required: "Please enter a your name." })}
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
      </main>
    </>
  );
}

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { useState } from "react";
import { NFTStorage } from "nft.storage";
import {
  NFT_STORAGE_API_KEY,
  contractABI,
  contractAddress,
} from "../../utils/constants";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

// Exported Types

export default function Badge() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([]);
  const [ipfsUri, setIpfsUri] = useState("");
  const [ipfs, setIpfs] = useState("");

  const { address } = useAccount();
  const StoreMetadata = async (image, Name, Description) => {
    // const nftstorage_key = process.env.NFT_STORAGE_API_KEY;
    console.log("Preparing Metadata ....");
    const nft = {
      name: Name,
      description: Description,
      image: image,
      attributes: [
        {
          trait_type: "projects", // projects, skills, events 这边是用户选择的 ( select 下拉)
          value: "join3", // ( 不需要填写，继承自 colletion，保持一致性)
        },
      ],
    };
    console.log("Uploading Metadata to IPFS ....");
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
    const metadata = await client.store(nft);

    console.log("NFT data stored successfully 🚀🚀");
    return metadata;
  };

  const upload = async () => {
    try {
      const metadata = await StoreMetadata(img, name, description);
      const uri = metadata.url;
      setIpfs(uri);
      const url = `https://ipfs.io/ipfs/${metadata.ipnft}`;
      setIpfsUri(url);
      //mintNFT
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        contract.mintNFT("join3", ipfsUri, address);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getNFTipfs = () => {
    alert(ipfs);
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
        <div className="w-full flex items-center justify-center">
          <button className="btn">Save</button> |
          <button className="btn">Review</button>
        </div>
        <div>
          <div>step1</div>
          <div className="flex">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <div>
              <button className="btn">New</button>
            </div>
          </div>
        </div>
        <div>
          <div>step3</div>
          <h1>set Metadata</h1>
          <div className="flex">
            <form
              action=""
              className="max-w-xl w-screen m-auto py-10 mt-10 px-8 border text-gray-700"
            >
              <label htmlFor="">Traits</label>
              <input
                className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
                placeholder=""
                autoFocus
                {...register("name", { required: "Please enter a your name." })}
              />
            </form>
          </div>
        </div>
      </main>
      <div>
        <Head>
          <title>Upload metadata on IPFS</title>
          <meta
            name="description"
            content="Create and Upload metadata to IPFS in just a click"
          />
          <link rel="icon" href="/nfticon.png" />
        </Head>

        <main>
          <h1>
            Welcome to <a>NFT3</a>
          </h1>

          <p>Get started by filling the form for Metadata</p>

          <div>
            <div>
              <input
                type="text"
                value={name}
                placeholder="Name of the NFT"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="text"
                value={description}
                placeholder="Description for the NFT"
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div></div>
            <label>
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              ></input>
            </label>
            <div>
              <button onClick={upload}>Upload to IPFS.</button>
            </div>
            <button onClick={getNFTipfs}>
              (等待 upload 完成后) get ipfs_uri for nftMint.{" "}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

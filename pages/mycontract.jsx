// in jsx
// require('dotenv').config();
// const ethers = require('ethers');  ??? 为啥不能 require
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

// Get Alchemy App URL , ContractDEC Polygon Mumbai
// const API_KEY = process.env.API_KEY;
const API_KEY = "PUEdlCOjOtkjXJB4Lc97d8gseBNF_QgY";

// Define an Alchemy Provider
// 'goerli'..
// matic - Polgon mainnet
// maticmum - Polgon testnet
// https://docs.ethers.io/v5/api/providers/api-providers/
const provider = new ethers.providers.AlchemyProvider("maticmum", API_KEY);

// Create a contract instance
// const myNftContract = new ethers.Contract(contractAddress, contractABI, signer)
const myNftContract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
);
// Get the NFT Metadata IPFS URL
// 这个 URL 是手动上传到 IPFS 后获得的。
const tokenUri =
  "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP";

const init_collection = async () => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const res = await contract.initCollection(
        "Join3", // Collection name
        "projects", // 给合约加了 _type 但是目前获取不到，不知道有何用
        "symbol" // ERC721 的 symbol，用户可以不填这个，没啥用
      );
      console.log("init_contract status", res);
    }
  } catch (err) {
    console.log("error: ", err);
  }
};
const handle_mint = async () => {
  try {
    const { ethereum } = window;
    console.log("ethereum", ethereum);
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log("signer.address", signer);
      /* ape:
      const nftTxn = await contract.mint(signer.getAddress(), 5);  */
      /* SBT contract 
      const nftTxn = await contract.safeMint(
        "0xab6Abd1177a962036DE7EBa695983c284100F61a",
        "https://gateway.pinata.cloud/ipfs/QmUcCgfVb1wc8ngLY6LJ9rT85hyWkFe4SABfxX18VyAYmF");
      */
      const nftTxn = await contract.mintNFT(
        "Join3", // Collection Name
        "https://gateway.pinata.cloud/ipfs/QmRbQm3H8xHioAP92uPMWy4aX5H8zKCwTgqXQc74FH8H7B", // ipfs URL
        "0xab6Abd1177a962036DE7EBa695983c284100F61a" // to, mint 给哪个地址
      );
      console.log("click mint , Minting ... waiting ...");
      await nftTxn.wait();
      console.log("nftTxn.hash: ", nftTxn.hash);
    }
  } catch (err) {
    console.log("error: ", err);
  }
};

// const mintNFT = async () => {
//   let nftTxn = await myNftContract.mint(signer.address, 2)
//   console.log('click mint')
//   await nftTxn.wait()
//   console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
// }

const MyContract = () => {
  return (
    <>
      <button
        className="bg-inherit px-4 py-1 rounded text-xl"
        onClick={init_collection}
      >
        init_collection
      </button>
      <button
        className="bg-inherit px-4 py-1 rounded text-xl"
        onClick={handle_mint}
      >
        mint
      </button>
    </>
  );
};
export default MyContract;

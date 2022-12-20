import { useContext, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Select } from "antd";
import { useRouter } from "next/router";
import Back from "../../components/Back";
import Collection from "../../contexts/Collection";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../utils/constants";
import Organization from "../../contexts/Organization";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const CreateCollection = () => {
  const { info } = useContext(Organization);
  console.log(info);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const router = useRouter();
  const { collectionName, type, description, projectName } =
    useContext(Collection);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div className="w-18">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Upload collection cover</div>
    </div>
  );

  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };

  const getaddress = async () => {
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
        const addr = await contract.getColAddressByName(collectionName);
        const orgId = info._id;
        fetch(`http://47.99.143.186/api/org/${orgId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: info.name,
            [type]: { name: collectionName ?? projectName, address: addr },
          }),
        });
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };
  const successful = async () => {
    // try {
    //   const { ethereum } = window;
    //   if (ethereum) {
    //     const provider = new ethers.providers.Web3Provider(ethereum);
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(
    //       contractAddress,
    //       contractABI,
    //       signer
    //     );
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
        console.log("contractAddress", contractAddress, contractABI);
        const res = await contract.initCollection(
          collectionName, // Collection name
          "symbol" // ERC721 的 symbol，用户可以不填这个，没啥用
        );
        console.log("res", res);

        // const address = await contract.getColAddressByName("Join2232212");
        // console.log('address  ', address)
        return;

        //todo 获取org的名字，获取type类型
        const orgId = info._id;

        fetch(`http://47.99.143.186/api/org/${orgId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            name: info.name,
            projects: { name: collectionName ?? projectName, address: address },
          },
        });
        console.log("init_contract status", type, res, address);
      }
      router.push("/Collection/Successful");
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <div className="px-[54px] py-6">
      <div className="flex justify-between items-center">
        <Back />
        <div className="text-[50px] font-bold">Review</div>
        <div></div>
      </div>
      <div className="flex gap-20 ml-[182px]">
        <div>
          <div className="mt-16">
            <div className="text-[30px] font-bold">Collection Name</div>
            <div className="text-[#747474] text-[25px]">{collectionName}</div>
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">Type</div>
            <div className="text-[#747474] text-[25px]">{type}</div>
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">Description</div>
            <div className="text-[#747474] text-[25px]">{description}</div>
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">Traits</div>
            <div className="text-[#747474] text-[25px]">{description}</div>
          </div>
        </div>
      </div>
      <div className="f-c-c mt-4">
        <div className="btn" onClick={() => successful()}>
          Create
        </div>
      </div>
      <div className="f-c-c mt-4">
        <div className="btn" onClick={() => getaddress()}>
          getAddressWithOrgnization
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;

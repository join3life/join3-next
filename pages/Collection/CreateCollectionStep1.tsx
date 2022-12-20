import { useContext, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Select } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useRouter } from "next/router";
import Back from "../../components/Back";
import Collection from "../../contexts/Collection";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
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
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const router = useRouter();
  const {
    collectionName,
    setCollectionName,
    type,
    setType,
    description,
    setDescription,
    projectName,
    setProjectName,
  } = useContext(Collection);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
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

  const handleChangeSelect = (value: string) => {
    setType!(value);
  };

  const jumpToStep2 = () => {
    if (collectionName && description && type !== "Project") {
      router.push("/Collection/CreateCollectionStep2");
    } else if (collectionName && description && projectName) {
      router.push("/Collection/CreateCollectionStep2");
    } else {
      message.error("Please fill in the information");
    }
  };

  return (
    <div className="px-[54px] py-6">
      <div className="flex justify-between items-center">
        <Back />
        <div className="text-[50px] font-bold">Create collection</div>
        <div></div>
      </div>
      <div className="text-[#747474]">Step1</div>
      <div className="text-[#747474] w-[700px]">
        Please fill in the collection name and description, and select the type.
        The name and type of the collection cannot be changed after creation
      </div>
      <div className="flex gap-20 ml-[182px]">
        <div>
          <div className="mt-16">
            <div className="text-[30px] font-bold">Collection name</div>
            <input
              type="text"
              className="input input-bordered h-8 w-full max-w-xs"
              onChange={(e) => setCollectionName!(e.target.value)}
            />
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">Type</div>
            <Select
              defaultValue="Skill"
              style={{ width: 320 }}
              onChange={handleChangeSelect}
              options={[
                {
                  value: "skills",
                  label: "skills",
                },
                {
                  value: "projects",
                  label: "projects",
                },
                {
                  value: "events",
                  label: "events",
                },
                {
                  value: "Role",
                  label: "Role",
                },
              ]}
            />
          </div>
          {type === "Project" && (
            <div className="mt-[38px]">
              <div className="text-[30px] font-bold">Project name</div>
              <input
                type="text"
                className="input input-bordered h-8 w-full max-w-xs"
                onChange={(e) => setProjectName!(e.target.value)}
              />
            </div>
          )}

          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">Collection Description</div>
            <textarea
              className="textarea textarea-bordered h-8 w-full max-w-xs"
              onChange={(e) => setDescription!(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-[100px]">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader w-20"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
      <div className="f-c-c mt-4">
        <div className="btn" onClick={() => jumpToStep2()}>
          Continue
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;

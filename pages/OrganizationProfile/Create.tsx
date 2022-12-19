import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useRouter } from "next/router";
import Back from "../../components/Back";
import { createOrg } from "../../api/organization";
import { useForm } from "react-hook-form";

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

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [img, setImg] = useState<any>();
  const [orgName, setOrgName] = useState<string>("");
  const [orgDescription, setDescription] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      console.log(info.file);
      setImg(info.file);
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

  const Create = () => {
    const params = {
      name: orgName,
      description: orgDescription,
      image: img,
    };
    const formData = new FormData();
    formData.append("files", img);
    formData.append("name", orgName);
    formData.append("description", orgDescription);
    if (orgName) {
      console.log(params);
      fetch("http://47.99.143.186//api/org", {
        method: "post",
        body: formData,
      }).then((res) => console.log(res));
      // createOrg(JSON.stringify(params)).then(res => {
      //   console.log(res)
      // })
    } else {
      message.error("Please filled the information!");
    }
  };

  const [data, setData] = useState<any>(); // set Formdata
  const [image, setImage] = useState(""); // 图片上传

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    console.log("data", data);

    formData.append("files", data.files[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);

    setData(formData);
    fetch("http://47.99.143.186/api/org", {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    }).then((res) => console.log(res));
  };

  return (
    <div className="px-[54px] py-6">
      <div className="flex justify-between items-center">
        <Back />
        <div className="text-[50px] font-bold">Create Organization</div>
        <div></div>
      </div>
      <div className="flex gap-20 ml-[182px]">
        <div>
          <div className="mt-16">
            <div className="text-[30px] font-bold">Organization name</div>
            <input
              type="text"
              className="input input-bordered h-8 w-full max-w-xs"
              onChange={(e) => setOrgName!(e.target.value)}
            />
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">
              Organization Description
            </div>
            <textarea
              className="textarea textarea-bordered h-8 w-full max-w-xs"
              onChange={(e) => setDescription!(e.target.value)}
            />
          </div>
          <div className="mt-[40px]">
            <div className="text-[30px] font-bold">Organization Image</div>
            <Upload
              name="avatar"
              listType="picture-card"
              maxCount={1}
              className="avatar-uploader w-20"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <div className="w-24 h-24 overflow-hidden f-c-c rounded-lg">
                  <img src={imageUrl} alt="avatar" />
                </div>
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </div>
      </div>
      <div className="f-c-c mt-4">
        <div className="btn" onClick={() => Create()}>
          Create
        </div>
      </div>
      <>
        <form
          className="max-w-xl w-screen m-auto py-10 mt-10 px-8 border text-gray-700" //
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-gray-700 font-medium mt-4">
            <label className="text-gray-700 font-medium">组织名称：</label>
            <input
              className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
              placeholder=""
              autoFocus
              {...register("name", { required: "Please enter a your name." })}
            />
            <label className="text-gray-700 font-medium">组织介绍：</label>
            <input
              className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
              placeholder=""
              autoFocus
              {...register("description")}
            />
            {image && <img src={image} className="w-48" />}
            {/* <label id="fileupload" className='text-gray-700 font-medium block mt-4'>*参会形式：</label> */}
            <input
              type="file"
              id="fileupload"
              {...register("files")}
              className="hidden"
            />
            *
            <label htmlFor="fileupload" className="cursor-pointer ">
              <span className="inline">请上传 </span>
            </label>
          </div>
          {watch("files") && <strong>{watch("files")[0]?.name}</strong>}
          <button
            className="mt-4 w-full rounded-md bg-black px-20  py-2 text-white border font-semibold text-md"
            type="submit"
          >
            {" "}
            提交
          </button>
        </form>
      </>
    </div>
  );
};

export default Create;

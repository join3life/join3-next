import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useRouter } from 'next/router'
import Back from '../../components/Back'
import { createOrg } from '../../api/organization'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const Create = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [img, setImg] = useState<any>()
  const [orgName, setOrgName] = useState<string>('')
  const [orgDescription, setDescription] = useState<string>('')
  const router = useRouter()

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setImg(info.file)
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div className="w-18">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Upload collection cover</div>
    </div>
  )

  const Create = () => {
    const params = {
      name: orgName,
      description: orgDescription,
      image: img
    }
    if (orgName) {
      console.log(params)
      createOrg(JSON.stringify(params)).then(res => {
        console.log(res)
      })
    } else {
      message.error('Please filled the information!')
    }
  }

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
              onChange={e => setOrgName!(e.target.value)}
            />
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">
              Organization Description
            </div>
            <textarea
              className="textarea textarea-bordered h-8 w-full max-w-xs"
              onChange={e => setDescription!(e.target.value)}
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
    </div>
  )
}

export default Create

import { useContext, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload, Select } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useRouter } from 'next/router'
import Back from '../../components/Back'
import Collection from '../../contexts/Collection'

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

const CreateCollection = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const router = useRouter()
  const { collectionName, type, description } = useContext(Collection)

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
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

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`)
  }

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
        <div className="btn" onClick={() => router.push('')}>
          Create
        </div>
      </div>
    </div>
  )
}

export default CreateCollection

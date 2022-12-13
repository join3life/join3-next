import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload, Select } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { SelectProps } from 'antd/es/select'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useRouter } from 'next/router'
import Back from '../../components/Back'

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

const options: SelectProps['options'] = [
  {
    value: '前端',
    label: '前端'
  },
  {
    value: '后端',
    label: '后端'
  },
  {
    value: '设计',
    label: '设计'
  },
  {
    value: '运营',
    label: '运营'
  }
]

const CreateCollection = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const router = useRouter()

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
    <div className="w-30">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Upload default badge image</div>
    </div>
  )

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <div className="px-[54px] py-6">
      <div className="flex justify-between items-center">
        <Back />
        <div className="text-[50px] font-bold">Create collection</div>
        <div></div>
      </div>
      <div className="text-[#747474]">Step2</div>
      <div className="text-[#747474] w-[700px]">
        Please fill in the collection name and description, and select the type.
        The name and type of the collection cannot be changed after creation
      </div>
      <div className="ml-[182px]">
        <div>
          <div className="mt-16">
            <div className="text-[30px] font-bold">Traits</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-14">Project</div>
            <div>
              <input
                type="text"
                className="input input-bordered h-8 w-[320px]"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center mt-3">
            <div className="w-14">Role</div>
            <div>
              <Select
                mode="tags"
                className="w-[320px]"
                onChange={handleChangeSelect}
                options={options}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center mt-3">
            <div className="w-14">Weight</div>
            <div>
              <input
                type="text"
                className="input input-bordered h-8 w-[320px]"
              />
            </div>
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">Type</div>
            <Select
              defaultValue="Skill"
              style={{ width: 320 }}
              onChange={handleChangeSelect}
              options={[
                {
                  value: 'Skill',
                  label: 'Skill'
                },
                {
                  value: 'Project',
                  label: 'Project'
                },
                {
                  value: 'Event',
                  label: 'Event'
                },
                {
                  value: 'Role',
                  label: 'Role'
                }
              ]}
            />
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold">Amount limit</div>
            <input
              type="text"
              placeholder="Default is unlimited"
              className="input input-bordered h-8 w-full max-w-xs"
            />
          </div>
          <div className="mt-[38px]">
            <div className="text-[30px] font-bold"> Duration limit (day) </div>
            <input
              type="text"
              placeholder="Default is unlimited"
              className="input input-bordered h-8 w-full max-w-xs"
            />
          </div>
        </div>
        <div className="mt-5">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader w-40"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
      <div className="f-c-c mt-4">
        <div
          className="btn"
          onClick={() => router.push('/Collection/CreateCollectionReview')}
        >
          Continue
        </div>
      </div>
    </div>
  )
}

export default CreateCollection

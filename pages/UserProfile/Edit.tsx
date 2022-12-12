import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Select, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { MdDeleteForever } from 'react-icons/md'

const Edit = () => {
  const selectOptions = [
    {
      value: 'github',
      label: 'github'
    },
    {
      value: 'twitter',
      label: 'twitter'
    },
    {
      value: 'discord',
      label: 'discord'
    },
    {
      value: 'youtube',
      label: 'youtube'
    }
  ]

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [mediaList, setMediaList] = useState([
    {
      media: 'twitter',
      url: ''
    }
  ])

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

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <div className="px-[280px] py-[72px]">
      <div className="flex justify-between">
        <div className="text-[32px] font-bold">Edit Profile</div>
        <div className="btn w-[100px] h-[40px]">Save</div>
      </div>
      <div className="text-[#666] text-[16px] mt-16">Photo</div>
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action=""
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
      <div className="mt-6">
        <div className="text-[#666] mb-2">Name</div>
        <input
          type="text"
          className="input input-bordered h-10 w-full max-w-xs"
        />
      </div>
      <div className="mt-6">
        <div className="text-[#666] mb-2">Bio</div>
        <textarea
          className="textarea textarea-bordered w-full max-w-xs"
          placeholder="Bio"
        />
      </div>
      <div className="mt-6">
        <div className="flex gap-[280px]">
          <div className="text-[#666]">Social Media</div>
          <div
            className="text-[#fff] w-[80px] h-[30px] rounded-lg bg-[#333] text-[14px] f-c-c cursor-pointer"
            onClick={() => setMediaList([...mediaList, { media: '', url: '' }])}
          >
            Add
          </div>
        </div>
        {mediaList.map(item => {
          return (
            <div className="mt-2 flex items-center">
              <Select
                defaultValue="twitter"
                style={{ width: 120 }}
                onChange={handleChangeSelect}
                options={[
                  {
                    value: 'github',
                    label: 'github',
                    disabled: mediaList.some(i => i.media === 'github')
                  },
                  {
                    value: 'twitter',
                    label: 'twitter',
                    disabled: mediaList.some(i => i.media === 'twitter')
                  },
                  {
                    value: 'discord',
                    label: 'discord',
                    disabled: mediaList.some(i => i.media === 'discord')
                  },
                  {
                    value: 'youtube',
                    label: 'youtube',
                    disabled: mediaList.some(i => i.media === 'youtube')
                  }
                ]}
              />
              <input
                type="text"
                className="input input-bordered w-full max-w-xs h-8 ml-3"
              />
              <div
                className="cursor-pointer pl-1"
                onClick={() =>
                  setMediaList([...mediaList.filter(i => i !== item)])
                }
              >
                <MdDeleteForever size={24} color="#999" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Edit

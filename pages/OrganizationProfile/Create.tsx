import { useState } from 'react'
import { useRouter } from 'next/router'
import Back from '../../components/Back'
import { useForm } from 'react-hook-form'
import { message } from 'antd'

const Create = () => {
  const router = useRouter()

  const { register, handleSubmit, watch } = useForm()

  const [data, setData] = useState<any>() // set Formdata
  const [image, setImage] = useState('') // 图片上传

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    console.log('data', data)

    formData.append('files', data.files[0])
    setImage(data.files[0])
    formData.append('name', data.name)
    formData.append('description', data.description)

    setData(formData)
    fetch('http://47.99.143.186/api/org', {
      method: 'POST',
      headers: {
        Accept: 'multipart/form-data'
      },
      body: formData
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        message.success('Create Success')
      }
    })
  }

  return (
    <div className="px-[54px] py-6">
      <div className="flex justify-between items-center">
        <Back />
        <div className="text-[50px] font-bold">Create Organization</div>
        <div></div>
      </div>
      <>
        <form
          className="max-w-xl w-screen m-auto py-10 mt-10 px-8 border text-gray-700"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-gray-700 font-medium mt-4">
            <label className="text-gray-700 font-medium text-lg">
              Organization Name
            </label>
            <input
              className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
              placeholder=""
              autoFocus
              {...register('name', { required: 'Please enter a your name.' })}
            />
            <div className="mt-6">
              <label className="text-gray-700 font-medium text-lg">
                Organization Description
              </label>
              <textarea
                className="border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700"
                placeholder=""
                autoFocus
                {...register('description')}
              />
            </div>
            {/* <label id="fileupload" className='text-gray-700 font-medium block mt-4'>*参会形式：</label> */}
            <div>
              <input
                type="file"
                id="fileupload"
                {...register('files')}
                className="hidden"
              />
              <label htmlFor="fileupload">
                <span className="h-28 f-c-c cp">+ 请上传</span>
              </label>
            </div>
          </div>
          {watch('files') && <strong>{watch('files')[0]?.name}</strong>}
          <img src={image} alt="" />
          <div className="f-c-c mt-6">
            <button className="btn" type="submit">
              Create
            </button>
          </div>
        </form>
      </>
    </div>
  )
}

export default Create

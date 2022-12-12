import { BsChevronLeft } from 'react-icons/bs'

const CreateCollection = () => {
  return (
    <div className="px-[54px] py-6">
      <div className="flex justify-between items-center">
        <div className="cp">
          <BsChevronLeft size={24} />
        </div>
        <div className="text-[50px] font-bold">Create collection</div>
        <div></div>
      </div>
      <div className="text-[#747474]">Step1</div>
      <div className="text-[#747474] w-[700px]">
        Please fill in the collection name and description, and select the type.
        The name and type of the collection cannot be changed after creation
      </div>
      <div className="ml-[182px]">
        <div className="mt-16">
          <div className="text-[30px] font-bold">Collection name</div>
          <input
            type="text"
            className="input input-bordered h-8 w-full max-w-xs"
          />
        </div>
        <div className="mt-[38px]">
          <div className="text-[30px] font-bold">Project name</div>
          <input
            type="text"
            className="input input-bordered h-8 w-full max-w-xs"
          />
        </div>
        <div className="mt-[38px]">
          <div className="text-[30px] font-bold">Collection Description</div>
          <textarea className="textarea textarea-bordered h-8 w-full max-w-xs" />
        </div>
      </div>
    </div>
  )
}

export default CreateCollection

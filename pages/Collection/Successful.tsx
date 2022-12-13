import { useRouter } from 'next/router'
import { useContext } from 'react'

import Collection from '../../contexts/Collection'

const Successful = () => {
  const { collectionName } = useContext(Collection)
  const router = useRouter()

  return (
    <div>
      <div className="text-[50px] font-bold f-c-c mt-14">
        Successfully Created!
      </div>
      <div className="f-c-c">
        <div className="mt-[50px]">
          <img className="w-[285px] h-[285px]" src="" alt="" />
          <div className="f-c-c font-bold text-[25px] mt-4">
            {collectionName}
          </div>
        </div>
      </div>
      <div className="f-c-c">
        <div className="flex gap-24 mt-[100px]">
          <div className="btn w-[200px]" onClick={() => router.push('/')}>
            Back to homepage
          </div>
          <div className="btn w-[200px]">Issue PV2 now</div>
        </div>
      </div>
    </div>
  )
}

export default Successful

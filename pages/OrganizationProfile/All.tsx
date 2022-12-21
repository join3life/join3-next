import router from 'next/router'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import Back from '../../components/Back'
import Organization from '../../contexts/Organization'

const All = () => {
  const { data } = useQuery('repoData', () =>
    fetch('http://47.99.143.186/api/org').then(res => res.json())
  )
  const { setInfo } = useContext(Organization)

  return (
    <div className="flex justify-center p-[50px]">
      <Back />
      <div className="">
        {data &&
          data.map((item: any) => {
            return (
              <div
                key={item._id}
                className="flex gap-4 bg-[#f1f0f0] rounded-3xl m-10 p-3 w-[700px]"
              >
                <div className="w-[100px] h-[100px] overflow-clip rounded-full f-c-c">
                  <img
                    src={item.image}
                    className="w-full cp"
                    onClick={() => {
                      router.push('/OrganizationProfile')
                      setInfo(item)
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="font-bold cp"
                    onClick={() => {
                      router.push('/OrganizationProfile')
                      setInfo(item)
                    }}
                  >
                    {item.name}
                  </div>
                  <div className="text-[#737272]">{item.description}</div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default All

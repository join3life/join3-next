import Link from 'next/link'
import React from 'react'

const UserProfile = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[1100px] flex justify-between pt-14">
        <div className="flex flex-col h-[668px] justify-between">
          <div className="w-[350px] h-[250px] bg-[#C9CDD4] rounded-lg"></div>
          <div className="w-[350px] h-[390px] bg-[#C9CDD4] rounded-lg"></div>
        </div>
        <div className="w-[700px]">
          <div className="flex justify-evenly">
            <Link
              className="w-[100px] h-[40px] text-white bg-black flex justify-center items-center rounded-lg"
              href="UserProfile/Feed"
            >
              Feed
            </Link>
            <Link
              className="w-[100px] h-[40px] text-black bg-white flex justify-center items-center rounded-lg"
              href="UserProfile/ProJects"
            >
              ProJects
            </Link>
            <Link
              className="w-[100px] h-[40px] text-black bg-white flex justify-center items-center rounded-lg"
              href="UserProfile/Skills"
            >
              Skills
            </Link>
            <Link
              className="w-[100px] h-[40px] text-black bg-white flex justify-center items-center rounded-lg"
              href="UserProfile/Interests"
            >
              Interests
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

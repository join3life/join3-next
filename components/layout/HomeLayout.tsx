import Link from 'next/link'
import { ReactNode } from 'react'


export default function HomeLayout({ children }:{children:ReactNode}) {
    return (
        <div className="flex justify-center">
        <div className="w-[1100px] flex justify-between pt-14">
          <div className="flex flex-col h-[668px] justify-between">
            <div className="w-[350px] h-[250px] bg-[#C9CDD4] rounded-lg"></div>
            <div className="w-[350px] h-[390px] bg-[#C9CDD4] rounded-lg"></div>
          </div>
          <div className="w-[700px]">
          <div className="flex justify-evenly">
            <Link className="btn w-[100px]" href="UserProfile/Feed">
              Feed
            </Link>
            <Link className="btn w-[100px]" href="UserProfile/Projects">
              ProJects
            </Link>
            <Link className="btn w-[100px]" href="UserProfile/Skills">
              Skills
            </Link>
            <Link className="btn w-[100px]" href="UserProfile/Interests">
              Interests
            </Link>
          </div>
          {children}
      </div>
        </div>
      </div>
    )
  }
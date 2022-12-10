import Link from 'next/link'
import { ReactNode } from 'react'
import { BiEdit } from 'react-icons/bi'

/**
 * @package
 */
export function Layout({ children }: { children: ReactNode }) {
  //在这里写slider bar和header的layout布局 组件抽离再封装
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[1100px] flex justify-between pt-14">
          <div className="flex flex-col h-[668px] justify-between">
            <div className="w-[350px] h-[250px] bg-[#F5F5F5] rounded-lg p-4">
              <div className="w-full flex justify-between">
                <div className="avatar">
                  <div className="w-[88px] h-[88px] rounded-[50%]">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="w-[150px] my-auto">
                  <div className="font-bold">Richard</div>
                  <div className="text-[#333333] text-xs">0x7812345667</div>
                </div>
                <div className="flex items-center cursor-pointer rounded-full bg-[#C9CDD4] h-7 w-7 my-auto text-center">
                  <BiEdit color="white" size={20} className="m-auto" />
                </div>
              </div>
              <div className="">follow</div>
              <div className="">introduce</div>
              <div className="">other link</div>
            </div>
            <div className="w-[350px] h-[390px] bg-[#F5F5F5] rounded-lg"></div>
          </div>
          <div className="w-[700px]">
            <div className="flex justify-evenly">
              <Link className="btn w-[100px]" href="/UserProfile/Feed">
                Feed
              </Link>
              <Link className="btn w-[100px]" href="/UserProfile/Projects">
                ProJects
              </Link>
              <Link className="btn w-[100px]" href="/UserProfile/Skills">
                Skills
              </Link>
              <Link className="btn w-[100px]" href="/UserProfile/Interests">
                Interests
              </Link>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * @package
 */
export function HomeLayout(page: ReactNode): JSX.Element {
  return <Layout>{page}</Layout>
}

import Link from 'next/link'
import { ReactNode } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaChevronCircleRight, FaDiscord } from 'react-icons/fa'
import { AiFillTwitterCircle, AiFillGithub } from 'react-icons/ai'
import { useRouter } from 'next/router'

/**
 * @package
 */
export function UserLayoutComponent({ children }: { children: ReactNode }) {
  const router = useRouter()
  console.log(router)
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
                <Link
                  className="flex items-center cursor-pointer rounded-full bg-[#C9CDD4] h-7 w-7 my-auto text-center"
                  href="/UserProfile/Edit"
                >
                  <BiEdit color="white" size={20} className="m-auto" />
                </Link>
              </div>
              <div className="mt-5 w-[180px] flex justify-between text-sm">
                <div className="">
                  10 <span className="text-[#999]">Following</span>
                </div>
                <div className="">
                  100 <span className="text-[#999]">Followed</span>
                </div>
              </div>
              <div className="mt-4 text-base">
                there seems to be nothing to introduce
              </div>
              <div className="mt-4 flex gap-2">
                <div className="cursor-pointer">
                  <AiFillTwitterCircle size={26} />
                </div>
                <div className="cursor-pointer">
                  <AiFillGithub size={26} />
                </div>
                <div className="cursor-pointer">
                  <FaDiscord size={26} />
                </div>
              </div>
            </div>
            <div className="w-[350px] h-[390px] bg-[#F5F5F5] rounded-lg px-7 py-5">
              <div className="flex justify-between">
                <div className="flex gap-5">
                  <div className="text-[#333] text-[14px] cursor-pointer">
                    joined DAO
                  </div>
                  <div className="text-[#999] text-[14px] cursor-pointer">
                    following DAO
                  </div>
                </div>
                <div className="cursor-pointer">
                  <FaChevronCircleRight size={20} color="#C9CDD4" />
                </div>
              </div>
              <div className="mt-5">
                {[0, 1, 2, 3, 4].map(() => {
                  return (
                    <div className="flex gap-3 items-center mt-[18px]">
                      <div className="w-[44px] h-[44px] rounded-[50%] overflow-clip cursor-pointer">
                        <img src="https://placeimg.com/192/192/people" alt="" />
                      </div>
                      <div className="cursor-pointer text-[#333]">DAO</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="w-[700px]">
            <div className="flex justify-evenly">
              <Link
                className={
                  router.pathname === '/UserProfile/Feed'
                    ? 'btn w-[100px]'
                    : 'btn w-[100px] bg-white text-black hover:text-white'
                }
                href="/UserProfile/Feed"
              >
                Feed
              </Link>
              <Link
                className={
                  router.pathname === '/UserProfile/Projects'
                    ? 'btn w-[100px]'
                    : 'btn w-[100px] bg-white text-black hover:text-white'
                }
                href="/UserProfile/Projects"
              >
                ProJects
              </Link>
              <Link
                className={
                  router.pathname === '/UserProfile/Skills'
                    ? 'btn w-[100px]'
                    : 'btn w-[100px] bg-white text-black hover:text-white'
                }
                href="/UserProfile/Skills"
              >
                Skills
              </Link>
              <Link
                className={
                  router.pathname === '/UserProfile/Interests'
                    ? 'btn w-[100px]'
                    : 'btn w-[100px] bg-white text-black hover:text-white'
                }
                href="/UserProfile/Interests"
              >
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
export function UserLayout(page: ReactNode): JSX.Element {
  return <UserLayoutComponent>{page}</UserLayoutComponent>
}
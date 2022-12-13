import { ReactNode } from 'react'
import { AiOutlineGlobal, AiOutlineSetting } from 'react-icons/ai'
import { IoPersonCircle } from 'react-icons/io5'
import { FiTwitter } from 'react-icons/fi'
import { RxDiscordLogo } from 'react-icons/rx'
import { useRouter } from 'next/router'

export function OrgLayoutComponent({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <>
      <div className="relative pb-8">
        <img
          className="w-full h-[256px] object-cover object-center"
          src="https://react-starport-eta.vercel.app/assets/picture6.f7e0abb5.png"
          alt=""
        />
        <div className="absolute top-[226px] left-1/2">
          <IoPersonCircle size={60} />
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <div className="">Richard</div>
        <div className="">201 follower</div>
        <div className="flex gap-6">
          <div className="cursor-pointer">
            <AiOutlineGlobal size={22} />
          </div>
          <div className="cursor-pointer">
            <FiTwitter size={22} />
          </div>
          <div className="cursor-pointer">
            <RxDiscordLogo size={22} />
          </div>
          <div className="cursor-pointer">
            <AiOutlineSetting size={22} />
          </div>
        </div>
        <div>
          <div className="dropdown dropdown-end mr-2">
            <label tabIndex={0} className="btn h-[20px] w-[150px]">
              Management
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li
                onClick={() => router.push('/Collection/CreateCollectionStep1')}
              >
                <a>Manage collection</a>
              </li>
              <li>
                <a>Account manage</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </>
  )
}

export function OrganizationLayout(page: ReactNode): JSX.Element {
  return <OrgLayoutComponent>{page}</OrgLayoutComponent>
}

import { ReactNode } from 'react'
import { AiOutlineGlobal, AiOutlineSetting } from 'react-icons/ai'
import { IoPersonCircle } from 'react-icons/io5'
import { FiTwitter } from 'react-icons/fi'
import { RxDiscordLogo } from 'react-icons/rx'
import { useRouter } from 'next/router'

import Header from './Headers'

export function OrgLayoutComponent({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <>
      <Header />
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
      <div className="flex gap-6">
        <div className="basis-[48%]"></div>
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
      <div>
        <div className="flex gap-10 border-b-2 pl-20 pb-4">
          <div
            className={
              router.pathname === '/OrganizationProfile'
                ? 'cp border-b-4 border-[black] px-2 py-1'
                : 'cp px-2 py-1'
            }
            onClick={() => router.push('/OrganizationProfile')}
          >
            <div className="h-2 w-2 rounded-full bg-black mt-2"></div>
          </div>
          <div
            className={
              router.pathname === '/OrganizationProfile/Member'
                ? 'cp border-b-4 border-[black]'
                : 'cp'
            }
            onClick={() => router.push('/OrganizationProfile/Member')}
          >
            Member
          </div>
          <div
            className={
              router.pathname === '/OrganizationProfile/Projects'
                ? 'cp border-b-4 border-[black]'
                : 'cp'
            }
            onClick={() => router.push('/OrganizationProfile/Projects')}
          >
            Projects
          </div>
          <div
            className={
              router.pathname === '/OrganizationProfile/Event'
                ? 'cp border-b-4 border-[black]'
                : 'cp'
            }
            onClick={() => router.push('/OrganizationProfile/Event')}
          >
            Event
          </div>
        </div>
        <div className="px-12 py-5">{children}</div>
      </div>
    </>
  )
}

export function OrganizationLayout(page: ReactNode): JSX.Element {
  return <OrgLayoutComponent>{page}</OrgLayoutComponent>
}

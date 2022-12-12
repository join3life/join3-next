import { ReactNode } from 'react'
import { IoPersonCircle } from 'react-icons/io5'

export function OrgLayoutComponent({ children }: { children: ReactNode }) {
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
      <div className="flex justify-center">
        <div className="">Richard</div>
        <div>201 follower</div>
        <div className="">following</div>
      </div>
      <div>{children}</div>
    </>
  )
}

export function OrganizationLayout(page: ReactNode): JSX.Element {
  return <OrgLayoutComponent>{page}</OrgLayoutComponent>
}

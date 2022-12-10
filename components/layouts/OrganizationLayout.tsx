import { ReactNode } from 'react'
import { IoPersonCircle } from 'react-icons/io5'

export function OrgLayoutComponent({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative">
        <img
          className="w-full h-64 object-cover object-center"
          src="https://react-starport-eta.vercel.app/assets/picture6.f7e0abb5.png"
          alt=""
        />
        <div className="absolute top-60 left-1/2">
          <IoPersonCircle size={46} />
        </div>
      </div>
      <div>{children}</div>
    </>
  )
}

export function OrganizationLayout(page: ReactNode): JSX.Element {
  return <OrgLayoutComponent>{page}</OrgLayoutComponent>
}

import { ReactNode } from 'react'

export function OrgLayoutComponent({ children }: { children: ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  )
}

export function OrganizationLayout(page: ReactNode): JSX.Element {
  return <OrgLayoutComponent>{page}</OrgLayoutComponent>
}

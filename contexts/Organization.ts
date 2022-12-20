import { createContext } from 'react'

interface OrganizationProps {
  info: any
  setInfo: (info: any) => void
}

export default createContext({} as OrganizationProps)

import { createContext } from 'react'

interface CollectionProps {
  collectionName: string
  setCollectionName: (name: string) => void
  type: string
  setType: (type: string) => void
  description: string
  setDescription: (description: string) => void
}

export default createContext({} as Partial<CollectionProps>)

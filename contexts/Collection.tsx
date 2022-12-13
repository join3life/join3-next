import { createContext } from 'react'

interface CollectionProps {
  collectionName: string
  setCollectionName: (name: string) => void
}

export default createContext({} as Partial<CollectionProps>)

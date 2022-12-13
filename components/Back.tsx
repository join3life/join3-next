import { useRouter } from 'next/router'
import { FC } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

interface BackProps {
  size?: number
}

const Back: FC<BackProps> = ({ size }) => {
  const router = useRouter()

  return (
    <div className="cp" onClick={() => router.back()}>
      <BsChevronLeft size={size || 24} />
    </div>
  )
}

export default Back

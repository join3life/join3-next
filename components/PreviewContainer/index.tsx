import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

interface PreviewContainerProps {
  title: string
  intro?: string
  more?: string
  children: ReactNode
}

const PreviewContainer: FC<PreviewContainerProps> = ({
  title,
  intro,
  more,
  children
}) => {
  const router = useRouter()

  return (
    <div className="border px-16 pb-[50px]">
      <div className="flex justify-between  mt-5">
        <div className="font-[600] text-[20px]">{title}</div>
        <div className="cp" onClick={() => more && router.push(more)}>
          more &gt;
        </div>
      </div>
      <div className="mt-8 text-[16px] font-[300] text-[#000]">{intro}</div>
      <div className="mt-10">{children}</div>
    </div>
  )
}

export default PreviewContainer

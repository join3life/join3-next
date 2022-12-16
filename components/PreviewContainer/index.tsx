import { FC, ReactNode } from 'react'

interface PreviewContainerProps {
  title: string
  intro: string
  children: ReactNode
}

const PreviewContainer: FC<PreviewContainerProps> = ({
  title,
  intro,
  children
}) => {
  return (
    <div className="border px-16 pb-[50px]">
      <div className="font-[600] text-[20px] mt-5">{title}</div>
      <div className="mt-8 text-[16px] font-[300] text-[#000]">{intro}</div>
      <div className="mt-10">{children}</div>
    </div>
  )
}

export default PreviewContainer

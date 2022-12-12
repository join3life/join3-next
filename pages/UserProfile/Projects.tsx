import type { NextPageWithLayout } from '../_app'
import { UserLayout } from '../../components/layouts'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

const Projects: NextPageWithLayout = () => {
  return (
    <div className="flex flex-wrap gap-12 mt-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
        return (
          <div className="w-[200px] h-[240px] group rounded-xl overflow-clip cursor-pointer hover:shadow-2xl transition duration-300">
            <div className="w-full h-[160px] bg-[#C9CDD4] relative">
              <div className="absolute top-1 right-2 hidden group-hover:block">
                <AiOutlineEyeInvisible />
              </div>
            </div>
            <div className="w-full h-[80px] bg-[#F5F5F5] p-3 text-[14px]">
              CN Memetaverse Project Certificate
            </div>
          </div>
        )
      })}
    </div>
  )
}

Projects.getLayout = UserLayout

export default Projects

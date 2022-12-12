import type { NextPageWithLayout } from '../_app'
import { UserLayout } from '../../components/layouts'

const Feed: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="w-[700px] h-[180px] mt-8 bg-[#F5F5F5] rounded-xl p-6">
        <div className="flex justify-between">
          <div>
            PEZ got <span className="font-bold">CN MetAverse</span>
          </div>
          <div className="text-[#999]">May 12,2022</div>
        </div>
        <div className="flex justify-between mt-7">
          <div className="w-[88px]">
            <img
              className="rounded-[50%] cursor-pointer"
              src="https://placeimg.com/192/192/people"
              alt=""
            />
          </div>
          <div className="w-[550px]">
            <div className="w-[80px] h-[30px] bg-[#C9CDD4] rounded-xl f-c-c">
              Skill
            </div>
            <div className="text-[12px] mt-3 line-clamp-2">
              CN Memetaverse is the creative social group in China. It has a
              large community for making and dicussing meme, jokes and fun
              stories of Chinese pop clutureand blockchain industry. CN
              Memetaverse is the creative social group in China. It has a large
              community for making and dicussing meme, jokes and fun stories of
              Chinese pop clutureand blockchain industry.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[700px] h-[180px] mt-8 bg-[#F5F5F5] rounded-xl p-6">
        <div className="flex justify-between">
          <div>
            PEZ got <span className="font-bold">CN MetAverse</span>
          </div>
          <div className="text-[#999]">May 12,2022</div>
        </div>
        <div className="flex justify-between mt-7">
          <div className="w-[88px]">
            <img
              className="rounded-[50%] cursor-pointer"
              src="https://placeimg.com/192/192/people"
              alt=""
            />
          </div>
          <div className="w-[550px]">
            <div className="w-[80px] h-[30px] bg-[#C9CDD4] rounded-xl f-c-c">
              Skill
            </div>
            <div className="text-[12px] mt-3 line-clamp-2">
              CN Memetaverse is the creative social group in China. It has a
              large community for making and dicussing meme, jokes and fun
              stories of Chinese pop clutureand blockchain industry. CN
              Memetaverse is the creative social group in China. It has a large
              community for making and dicussing meme, jokes and fun stories of
              Chinese pop clutureand blockchain industry.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[700px] h-[180px] mt-8 bg-[#F5F5F5] rounded-xl p-6">
        <div className="flex justify-between">
          <div>
            PEZ got <span className="font-bold">CN MetAverse</span>
          </div>
          <div className="text-[#999]">May 12,2022</div>
        </div>
        <div className="flex justify-between mt-7">
          <div className="w-[88px]">
            <img
              className="rounded-[50%] cursor-pointer"
              src="https://placeimg.com/192/192/people"
              alt=""
            />
          </div>
          <div className="w-[550px]">
            <div className="w-[80px] h-[30px] bg-[#C9CDD4] rounded-xl f-c-c">
              Skill
            </div>
            <div className="text-[12px] mt-3 line-clamp-2">
              CN Memetaverse is the creative social group in China. It has a
              large community for making and dicussing meme, jokes and fun
              stories of Chinese pop clutureand blockchain industry. CN
              Memetaverse is the creative social group in China. It has a large
              community for making and dicussing meme, jokes and fun stories of
              Chinese pop clutureand blockchain industry.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Feed.getLayout = UserLayout

export default Feed

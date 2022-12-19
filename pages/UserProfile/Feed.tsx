import type { NextPageWithLayout } from "../_app";
import { UserLayout } from "../../components/layouts";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";

const Feed: NextPageWithLayout = () => {
  const options = {
    method: "GET",
    url: "https://deep-index.moralis.io/api/v2/0xc14B8187368738532c71318cD77e7e28Ed9d53d3/nft",
    params: { chain: "polygon", format: "decimal", normalizeMetadata: "false" },
    headers: {
      accept: "application/json",
      "X-API-Key":
        "EdmOJ0JOgp5FF1VXNdxHC5wtzovAB9zIemMRZJ7VsM4Xo5WnDdZ16ZU6Iy0a8kry",
    },
  };

  //get all nft
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return (
    <div className="flex flex-col">
      {[1, 2, 3].map((item) => {
        return (
          <div
            key={item}
            className="w-[700px] h-[180px] mt-8 bg-[#F5F5F5] rounded-xl p-6"
          >
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
                <div className="w-[80px] h-[30px] bg-[#C9CDD4] rounded-xl f-c-c cursor-pointer">
                  Skill
                </div>
                <div className="text-[12px] mt-3 line-clamp-2">
                  CN Memetaverse is the creative social group in China. It has a
                  large community for making and dicussing meme, jokes and fun
                  stories of Chinese pop clutureand blockchain industry. CN
                  Memetaverse is the creative social group in China. It has a
                  large community for making and dicussing meme, jokes and fun
                  stories of Chinese pop clutureand blockchain industry.
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Feed.getLayout = UserLayout;

export default Feed;

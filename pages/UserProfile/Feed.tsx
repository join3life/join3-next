import type { NextPageWithLayout } from "../_app";
import { UserLayout } from "../../components/layouts";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const Feed: NextPageWithLayout = () => {
  const [data, setData] = useState<[]>();
  const options = {
    method: "GET",
    url: "https://deep-index.moralis.io/api/v2/0xc14B8187368738532c71318cD77e7e28Ed9d53d3/nft",
    params: { chain: "mumbai", format: "decimal", normalizeMetadata: "false" },
    headers: {
      accept: "application/json",
      "X-API-Key":
        "EdmOJ0JOgp5FF1VXNdxHC5wtzovAB9zIemMRZJ7VsM4Xo5WnDdZ16ZU6Iy0a8kry",
    },
  };

  // const { data: nftdata } = useQuery("getallnft", () => {
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // });
  // console.log(response.data, 1111);
  //     setData(response.data.result);

  //get all nft
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data, 1111);
        setData(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  // console.log(nftdata);
  return (
    <div className="flex flex-col">
      {data?.map((item: any) => {
        const metaData = JSON.parse(item.metadata);
        console.log(
          metaData?.attributes?.length === 1
            ? metaData?.attributes[0]?.trait_type
            : "213"
        );
        return (
          <div
            key={item.token_hash}
            className="w-[700px] h-[180px] mt-8 bg-[#F5F5F5] rounded-xl p-6"
          >
            <div className="flex justify-between">
              <div>
                Richard got{" "}
                <span className="font-bold">
                  {metaData?.name}{" "}
                  {metaData?.attributes?.length === 1
                    ? metaData?.attributes[0]?.value
                    : "test"}
                </span>
              </div>
              <div className="text-[#999]">May 12,2022</div>
            </div>
            <div className="flex justify-between mt-7">
              <div className="w-[88px]">
                <img
                  className="rounded-[50%] cursor-pointer"
                  src={"https://ipfs.io/ipfs" + metaData?.image.slice(6)}
                  alt=""
                />
              </div>
              {/* {"https://ipfs.io/ipfs" + metaData?.image.slice(6)} */}
              <div className="w-[550px]">
                <div className="w-[80px] h-[30px] bg-[#C9CDD4] rounded-xl f-c-c cursor-pointer">
                  {metaData?.attributes?.length === 1
                    ? metaData?.attributes[0]?.trait_type
                    : "project"}
                </div>
                <div className="text-[12px] mt-3 line-clamp-2">
                  {metaData?.description}
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

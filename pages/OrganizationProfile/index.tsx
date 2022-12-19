import { FaUserCircle } from "react-icons/fa";
import { OrganizationLayout } from "../../components/layouts";
import PreviewContainer from "../../components/PreviewContainer";
import type { NextPageWithLayout } from "../_app";
import axios from "axios";
// import { useMutation, useQuery } from "react-query";
import { useState } from "react";

const OrganizationProfile: NextPageWithLayout = () => {
  const [data, setData] = useState(); // set Formdata

  fetch("http://47.99.143.186//api/org", { method: "post", body: "213" }).then(
    (res) => console.log(res)
  );

  return (
    <div className="flex flex-col gap-5">
      <PreviewContainer
        title="Member"
        intro="Thirty people have been awarded skills certification badges"
        more="/OrganizationProfile/Member"
      >
        <div className="flex gap-8">
          {["Tom", "Jerry", "John", "Doe", "Jane", "chares"].map((item) => {
            return (
              <div className="f-c-c gap-2 cp">
                <FaUserCircle size={30} />
                {item}
              </div>
            );
          })}
        </div>
      </PreviewContainer>
      <PreviewContainer
        title="Events"
        intro="There are five event under way. You can participate in collecting the badge."
        more="/OrganizationProfile/Event"
      >
        <div className="flex gap-8">
          {["Tom", "Jerry", "John", "Doe", "Jane", "chares"].map((item) => {
            return (
              <div className="f-c-c cp w-[100px] h-[100px] rounded-lg bg-slate-200">
                {item}
              </div>
            );
          })}
        </div>
      </PreviewContainer>
      <PreviewContainer
        title="Projects"
        intro="Four projects have been completed so far."
        more="/OrganizationProfile/Projects"
      >
        <div className="flex gap-8">
          {["Tom", "Jerry", "John", "Doe", "Jane", "chares"].map((item) => {
            return (
              <div className="f-c-c gap-2 cp">
                <FaUserCircle size={30} />
                {item}
              </div>
            );
          })}
        </div>
      </PreviewContainer>
    </div>
  );
};

OrganizationProfile.getLayout = OrganizationLayout;

export default OrganizationProfile;

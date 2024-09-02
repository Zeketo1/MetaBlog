import React, { useContext } from "react";
import { blogContext } from "../../context/BlogContextProvider";
import { useStore } from "eoion";
import store from "../../store/store";

const Banner = () => {
  const [dark] = useStore(store.subscribe("dark"));
  
  return (
    <>
      <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[480px] w-full bg-bannerBg2 bg-no-repeat bg-cover flex items-end mb-[90px]">
        <div className={`h-[250px] sm:h-[300px] md:h-[350px] lg:h-[480px] w-full transition duration-500 ${dark ? "opacity-40" : "opacity-0"} bg-black absolute top-0`}></div>
        <div className={`transition duration-500 ${dark ? "bg-[#242535] text-white" : "bg-white"}  shadow-lg rounded-md translate-y-10 translate-x-10 w-[300px] sm:w-[350px] p-7 flex flex-col gap-2`}>
          <p className="bg-[#4B6BFB] w-fit px-2 py-[1px] rounded-[4px] text-white">
            Technology
          </p>
          <p className="text-[14px] sm:text-[16px] font-semibold">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </p>
          <div className="flex items-center text-[13px] justify-around">
            <div className="w-[40px] h-[40px] bg-blue-900 rounded-[50%]" />
            <p>Jason Francisco</p>
            <p>August 20, 2022</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

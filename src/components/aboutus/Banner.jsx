import React, { useContext } from "react";
import { blogContext } from "../../context/BlogContextProvider";

const Banner = () => {
    const {dark} = useContext(blogContext)
  return (
    <>
      <div className={`transition duration-500 ${dark ? "bg-[#242535ec] text-white" : "bg-[#6b728027] text-black"} min-h-[400px]`}>
        <div className="h-[400px] w-full bg-aboutBannerBg bg-cover"></div>
        <div className="h-[400px] grid grid-cols-2 gap-10 place-content-center px-[10%]">
          <div className="flex flex-col gap-3 p-4">
            <h1 className="text-[14px] font-semibold opacity-80">OUR MISSION</h1>
            <h1 className="text-[22px] font-semibold">
              Creating valuable content for <br /> creatives all around the world
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br />
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non <br />
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. <br />
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <h1 className="text-[14px] font-semibold opacity-80">OUR VISION</h1>
            <h1 className="text-[22px] font-semibold">A platform that empowers <br /> individuals to improve</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br />
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non <br />
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. <br />
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

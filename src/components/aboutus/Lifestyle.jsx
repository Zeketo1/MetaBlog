import React, { useContext } from "react";
import { Hands, Teamwork } from "../..";
import store from "../../store/store";
import { useStore } from "eoion";

const Lifestyle = () => {
  const [dark] = useStore(store.subscribe("dark"));
  return (
    <>
      <div className={`py-10 px-5 transition-all duration-500 ${dark ? "bg-[#242535] text-white" : "bg-white text-black"} flex flex-col gap-5`}>
        <div className="flex justify-center items-center w-full sm:pl-20 sm:grid grid-cols-2 sm:place-self-center">
          <div className="flex flex-col justify-center gap-3">
            <h1 className="text-[25px] font-semibold">Our team of creatives</h1>
            <p className="text-[17px] font-semibold">
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
              sed do eiusmod tempor incididunt.
            </p>
            <p className="text-[14px] opacity-75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <br />
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim <br /> ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut <br /> aliquip ex ea commodo consequat. Duis aute
              irure dolor in <br />
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
          <div className="relative hidden sm:block">
            <div className="absolute h-[50px] w-[50px] bg-yellow-400 top-[12rem] handclip"/>
            <img src={Hands} alt="" className="about__radius object-cover h-[400px]" />
          </div>
        </div>
        <div className="flex justify-center items-center w-full sm:gap-20 sm:grid grid-cols-2 sm:place-self-center">
          <div className="hidden sm:block">
            <img src={Teamwork} alt="" className="about__radius object-cover h-[400px]" />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <h1 className="text-[25px] font-semibold">
              Why we started this Blog
            </h1>
            <p className="text-[17px] font-semibold">
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <p className="text-[14px] opacity-75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <br />
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim <br /> ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut <br /> aliquip ex ea commodo consequat. Duis aute
              irure dolor in <br />
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lifestyle;

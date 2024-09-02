import React, { useContext } from "react";
import { blogContext } from "../../context/BlogContextProvider";
import store from "../../store/store";
import { useStore } from "eoion";

const Title = () => {
  const [dark] = useStore(store.subscribe("dark"));
  return (
    <>
      <div className={`transition-all duration-500 ${dark ? "bg-[#242535] text-white" : "bg-white text-black"} h-[300px] flex justify-center`}>
        <div className="w-[90%] h-full grid translate-y-10 grid-cols-2">
          <div className={`transition duration-500 flex shadow-lg ${dark ? "bg-[#242535] text-white" : "bg-white text-black"} justify-center flex-col px-20`}>
            <h1>ABOUT US</h1>
            <h1 className="text-[30px] font-semibold">
              We are a team of <br /> content writers who <br /> share their
              learnings
            </h1>
          </div>
          <p className="flex justify-center items-center bg-transparent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut{" "}
            <br /> enim ad minim veniam, quis nostrud exercitation ullamco{" "}
            <br /> laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </>
  );
};

export default Title;

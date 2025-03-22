import React, { useContext, useEffect } from "react";
import { blogContext } from "../context/BlogContextProvider";
import { useStore } from "eoion";
import store from "../store/store";

const Contact = () => {
  const [dark] = useStore(store.subscribe("dark"));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <div
      className={`transition duration-500 flex flex-col ${
        dark ? "bg-[#242535] text-white" : "bg-white text-black"
      } text-center gap-10 py-10 items-center`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-[14px] font-semibold">CONTACT US</h1>
        <p className="text-[23px] font-semibold">Let's Start a Conversation</p>
        <p className="text-[14px] opacity-80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore <br /> et dolore magna aliqua. Ut
          enim ad minim.
        </p>
      </div>
      <div className="w-full md:w-[80%] lg:w-[70%] flex flex-col gap-3">
        <div
          className={`transition duration-500 grid sm:grid-cols-2 place-content-center ${
            dark ? "bg-[#0b0b0b6b] text-white" : "border border-[#1a18144b] text-black"
          } w-full min-h-[250px] py-10 sm:px-16 gap-16`}
        >
          <div className="flex flex-col gap-3">
            <p className="pb-2 border-b text-start opacity-70">Working hours</p>
            <p className=" text-start text-[17px] font-semibold">
              Monday To Friday <br /> 9:00AM to 8:00PM
            </p>
            <p className="text-[15px] text-start opacity-50">
              Our Support Team is available 24/7
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="pb-2 border-b text-start opacity-70">Contact Us</p>
            <p className=" text-start text-[17px] font-semibold">
              020 7993 2905
            </p>
            <p className=" text-[15px] text-start opacity-50">
              hello@finsweet.com
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-3 items-center">
          <input
            type="text"
            placeholder="Name"
            className={`transition duration-500 border p-2 outline-none w-full ${
              dark ? "bg-[#0b0b0b6b] text-white border-[#1A1814]" : "border border-[#1a18144b] text-black placeholder:text-black"
            }`}
          />
          <input
            type="email"
            placeholder="Email"
            className={`transition duration-500 border p-2 outline-none w-full ${
              dark ? "bg-[#0b0b0b6b] text-white border-[#1A1814]" : "border border-[#1a18144b] text-black placeholder:text-black"
            }`}
          />
          <textarea
            rows="4"
            placeholder="Message"
            className={`transition duration-500 border p-2 outline-none w-full ${
              dark ? "bg-[#0b0b0b6b] text-white border-[#1A1814]" : "border border-[#1a18144b] text-black placeholder:text-black"
            }`}
          />
          <button
            className={`${
              dark ? "bg-[#0b0b0b6b] text-white border-[#1A1814]" : "border border-[#1a18144b] text-black"
            } py-2 px-10 w-fit rounded-md`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

import React, { useContext, useState } from "react";
import { Logo, Logo2, LogoS, LogoS2 } from "..";
import { BiSearch } from "react-icons/bi";
import { LuSunDim } from "react-icons/lu";
import { blogContext } from "../context/BlogContextProvider";
import { WiStars } from "react-icons/wi";
import { CiLogout, CiMenuFries } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import store from "../store/store";
import { useStore } from "eoion";
import { logout } from "../firebase";

const NavBar = () => {
  const [dark, setDark] = useStore(store.subscribe("dark"));
  const [isOpen, setIsOpen] = useState(false);
  const { userActive } = useContext(blogContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const removeMenu = () => {
    toggleMenu();
    setDark(!dark);
  };
  const navigate = useNavigate();

  const options = [
    { option: "Home", link: "/" },
    { option: "Blog", link: "/blogs" },
    { option: "About", link: "/aboutus" },
    { option: "Contact", link: "/contact" },
    { option: "Dark Mode" },
    { option: "Logout" },
  ];

  return (
    <>
      <div
        className={`h-[10dvh] shadow-lg transition duration-500 px-2 py-3 z-10 ${
          dark ? "bg-[#242535] text-white" : "bg-white text-black"
        } flex items-center font-poppins sticky top-0 right-0 justify-between`}
      >
        <div className="flex items-start gap-1">
          <img src={dark ? LogoS : LogoS2} alt="" className="h-[25px]" />
          <p className="text-[16px] font-semibold translate-y-[2px]">
            Meta<span className="font-serif">Blog</span>
          </p>
        </div>
        <div className="hidden lg:flex gap-5 text-[14px]">
          {options.map(({ option, link }, i) => (
            <p
              onClick={() => navigate(link)}
              key={i}
              className={`cursor-pointer ${i === 4 && "hidden"}`}
            >
              {option}
            </p>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <form
            className={`flex border-b items-center ${
              dark ? "border-b-[#1A1814] " : "border-b-gray-200 "
            } pr-2`}
          >
            <input
              type="text"
              className="focus:w-[190px] w-[150px] py-1 px-2 transition-all duration-500 outline-none bg-transparent"
              placeholder="Search"
            />
            <BiSearch type="submit" />
          </form>
          <div
            onClick={() => setDark(!dark)}
            className={`hidden lg:flex transition duration-500 rounded-[50px] items-center p-1 w-[60px] ${
              dark ? "bg-[#4B6BFB] " : "bg-[#E8E8EA] "
            }`}
          >
            <div
              className={`transition duration-500 ${
                dark ? "translate-x-[100%] bg-white " : "translate-x-0 bg-black"
              } p-1 rounded-[50%]`}
            >
              {dark ? (
                <LuSunDim className="rounded-[50%] text-black" />
              ) : (
                <WiStars className="rounded-[50%] text-white" />
              )}
            </div>
          </div>
          {userActive && (
            <CiLogout
              className="hidden lg:block text-[20px]"
              onClick={() => {
                logout();
              }}
            />
          )}
          <div className="relative block lg:hidden">
            {/* Burger Button */}
            <button
              onClick={toggleMenu}
              className={`p-2 ${
                dark ? "text-white" : "text-black"
              } rounded focus:outline-none`}
            >
              {/* Burger Icon */}
              <CiMenuFries />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute translate-y-1 -right-2 mt-2 w-40 ${
                dark ? "bg-[#242535] text-white" : "bg-white text-gray-800"
              } rounded-b-md shadow-lg overflow-hidden z-20 ${
                isOpen ? "" : "hidden"
              }`}
            >
              {options.map(({ option, link }, i) => (
                <div
                  key={i}
                  onClick={i === 4 ? removeMenu : toggleMenu}
                  className={`transition duration-500 flex justify-between items-center w-full px-4 py-2${
                    dark ? " hover:bg-[#1a1814bc]" : " hover:bg-gray-200"
                  }`}
                >
                  {i < 4 && (
                    <Link className="w-full z-10" to={`${link}`}>
                      {option}
                    </Link>
                  )}
                  {i === 4 && <p>{dark ? "Light Mode" : option}</p>}
                  {userActive && i === 5 && (
                    <p
                      onClick={() => {
                        logout();
                      }}
                    >
                      {option}
                    </p>
                  )}
                  {dark && i === 4 && <LuSunDim className="text-white" />}
                  {!dark && i === 4 && <WiStars className="text-black" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

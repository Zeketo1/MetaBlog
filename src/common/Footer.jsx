import { CiMail } from "react-icons/ci";
import { LogoS, LogoS2 } from "..";
import { useStore } from "eoion";
import store from "../store/store";
import { Link } from "react-router-dom";

const Footer = () => {
  const [dark] = useStore(store.subscribe("dark"));
  const quicklinks = ["Home", "About", "Blogs", "Contact"];
  const category = [
    "Lifestyle",
    "Technology",
    "Travel",
    "Business",
    "Economy",
    "Sports",
  ];
  return (
    <>
      <div
        className={`static bottom-0 w-full transition duration-500 ${
          dark ? "bg-[#242535fb] text-white" : "bg-[#F6F6F7] text-black"
        }`}
      >
        <div className="flex flex-wrap gap-3 sm:gap-0 justify-between px-3 py-5 sm:px-8">
          <div>
            <div className="mb-4">
              <h1 className="text-[17px] font-semibold mb-3">About</h1>
              <p className="opacity-80 text-[13px] sm:text-[15px] w-[300px]">
                We&apos;re a blog dedicated to sharing insights and stories on
                various topics. Whether you&apos;re here to learn, explore, or
                simply enjoy a good read, we&apos;re glad you&apos;re with us.
                Thanks for being part of our journey!
              </p>
            </div>
            <div className="font-semibold">
              <h1>
                Email:{" "}
                <span className="font-normal text-[13px] sm:text-[15px]">
                  info@metablog.net
                </span>
              </h1>
              <h1>
                Phone:{" "}
                <span className="font-normal text-[13px] sm:text-[15px]">
                  880 123 456 789
                </span>
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-[17px] font-semibold mb-3">Quick Link</h1>
            <div className="flex flex-col gap-1 text-[13px] sm:text-[15px]">
              {quicklinks.map((link, i) => (
                <Link
                  to={i === 0 ? "/" : link.toLowerCase()}
                  key={i}
                  className="opacity-80"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-[17px] font-semibold mb-3">Category</h1>
            <div className="flex flex-col gap-1 text-[13px] sm:text-[15px]">
              {category.map((item, i) => (
                <p key={i} className="opacity-80">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div
            className={`hidden lg:flex flex-col rounded-md ${
              dark ? "bg-[#696a7544] " : "bg-white "
            } gap-7 p-10 text-center`}
          >
            <div className="flex flex-col gap-1 ">
              <h1 className="text-[18px] font-semibold">Weekly Newsletter</h1>
              <p className="opacity-60">
                Get blog articles and offers via email
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between px-2 border rounded-md border-[#00000020]">
                <input
                  className="placeholder:text-[14px] bg-transparent outline-none p-[6px]"
                  type="text"
                  placeholder="Your Email"
                />
                <CiMail className="text-[17px]" />
              </div>
              <button className="rounded-md text-white bg-[#4B6BFB] p-[6px] text-center w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            dark ? "border-t border-white" : "border-t border-black"
          } flex flex-wrap gap-3 items-center justify-between px-3 py-3 sm:px-8`}
        >
          <div className="flex items-center gap-1">
            <img
              src={dark ? LogoS : LogoS2}
              alt=""
              className="h-[25px] translate-y-[2px]"
            />
            <div>
              <p className="text-[15px]">
                Meta<span className="font-semibold">Blog</span>
              </p>
              <p className="text-[12px] opacity-80 flex gap-1">
                <span>&copy;Ikoro Francis 2024 .</span>
                <span className="opacity-50 hidden sm:block">
                  All rights reserved.
                </span>
              </p>
            </div>
          </div>
          <p className="block sm:hidden">Terms of Use</p>
          <p className="block sm:hidden">Privacy Policy</p>
          <p className="block sm:hidden">Cookie Policy</p>
          <div className="gap-4 text-[14px] hidden sm:flex ">
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

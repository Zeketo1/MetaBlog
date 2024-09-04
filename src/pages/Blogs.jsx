import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SkeletonCards from "../utils/skeleton/SkeletonCards";
import { blogContext } from "../context/BlogContextProvider";
import { Link } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imageDB } from "../firebase";
import { useStore } from "eoion";
import store from "../store/store";

const Blogs = () => {
  const [dark] = useStore(store.subscribe("dark"));
  const { blogs } = useContext(blogContext);
  const [imageUrl, setImageUrl] = useState([]);
  const [isloading, setisloading] = useState(true);

  // Mixing
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];

  const fetchImages = () => {
    listAll(ref(imageDB, `Images`)).then((fireimages) => {
      fireimages.items.forEach((item) => {
        getDownloadURL(item).then((downloadURL) => {
          if (imageExtensions.some((ext) => downloadURL.includes(ext))) {
            setImageUrl((prev) => [...prev, downloadURL]);
          }
        });
      });
    });
  };

  useEffect(() => {
    fetchImages();
    if (blogs.length > 0) {
      setInterval(() => {
        setisloading(false);
      }, 3800);
    }
  }, [blogs]);

  const bannerInfos = blogs.filter((item) => item.blogBanner);

  const [index, setindex] = useState(0);

  // Framer-motion
  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       delayChildren: 0.5,
  //     },
  //   },
  // };

  const container = (x, delay) => ({
    hidden: { x: x, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: delay },
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div
        className={`transition duration-500 ${
          dark ? "bg-[#242535] text-white" : "bg-white text-black"
        } flex items-center pb-10 flex-col gap-[30px]`}
      >
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[480px] w-full mb-[90px]">
          {/* <div
            className={`h-[250px] sm:h-[300px] md:h-[350px] lg:h-[480px] w-full transition duration-500 ${
              dark ? "opacity-40" : "opacity-0"
            } bg-black absolute top-0`}
          /> */}
          {bannerInfos.map(({ title, name, date, id }, i) => {
            const matchingImage = imageUrl.find((url) =>
              url.includes(`${id}.`)
            );
            return (
              i === index && (
                <div key={i} className="relative h-full w-full flex items-end">
                  <motion.img
                    // variants={container(100, 1)}
                    // initial="hidden"
                    // animate="visible"
                    // initial={{ opacity: 0 }}
                    // animate={{
                    //   opacity: 1,
                    //   transition: { duration: 0.5, delay: 0.5 },
                    // }}
                    src={matchingImage}
                    alt=""
                    className="absolute object-cover w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[480px]"
                  />
                  <div
                    className={`p-4 sm:p-7 transition duration-500 ${
                      dark ? "bg-[#242535] text-white" : "bg-white"
                    }  shadow-lg rounded-md translate-y-10 translate-x-10 w-[300px] sm:w-[350px] flex flex-col gap-2`}
                  >
                    <p className="bg-[#4B6BFB] w-fit px-2 py-[1px] rounded-[4px] text-white">
                      Technology
                    </p>
                    <p className="text-[14px] sm:text-[16px] font-semibold">
                      {title}
                    </p>
                    <div className="flex items-center text-[13px] justify-around">
                      <div className="w-[40px] h-[40px] bg-blue-900 rounded-[50%]" />
                      <p>{name}</p>
                      <p>August 20, 2022</p>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="w-full sm:w-[90%] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5">
          {isloading ? (
            <SkeletonCards
              cards={blogs?.length}
              base={dark ? "#111827" : "#eedece"}
            />
          ) : (
            blogs.map(({ type, title, date, image, name, id }, i) => {
              const matchingImage = imageUrl.find((url) =>
                url.includes(`${id}.`)
              );
              return (
                <Link
                  to={`/blogs/${id}`}
                  key={i}
                  className={`flex flex-col justify-between p-4 xs:p-2 sm:p-4 border ${
                    dark ? "border-[#1A1814]" : "border-gray-200"
                  } rounded-xl`}
                >
                  <div>
                    <img
                      src={matchingImage} // Reference the image from the map
                      alt={type}
                      className="rounded-lg object-cover h-[220px] w-full"
                    />
                    <h2 className="text-[13px] w-fit px-2 py-1 mt-4 rounded-[4px] bg-[#4b6bfb0e] text-[#4B6BFB]">
                      {type}
                    </h2>
                    <p
                      className={`mt-2 font-semibold xs:text-[13px] sm:text-[15px]`}
                    >
                      {title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center justify-center h-[35px] w-[35px] rounded-[50%] bg-blue-400">
                      {name.slice(0, 1).toUpperCase()}
                    </div>
                    <div
                      className={`xs:text-[13px] ${
                        dark ? "text-[#ffffff86]" : "text-[#00000086]"
                      }`}
                    >
                      {name}
                    </div>
                    <div
                      className={`xs:text-[13px] ${
                        dark ? "text-[#ffffff86]" : "text-[#00000086]"
                      }`}
                    >
                      {date}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;

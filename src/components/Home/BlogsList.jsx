import React, { useContext, useEffect, useState } from "react";
import { blogContext } from "../../context/BlogContextProvider";
import SkeletonCards from "../../utils/skeleton/SkeletonCards";
import { Link } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imageDB } from "../../firebase";
import store, { store2 } from "../../store/store";
import { useStore } from "eoion";

const BlogsList = () => {
  // Eoion
  const [dark] = useStore(store.subscribe("dark"));
  const [skeletonCon, setSkeletonCon] = useStore(
    store2.subscribe("skeletonCon")
  );
  const [imageUrl, setImageUrl] = useStore(
    store2.subscribe("imageUrl2")
  );
  const [blogsStoreFiltered, setBlogsStoreFiltered] = useStore(
    store2.subscribe("blogsStoreFiltered")
  );

  const { blogs, blogSort } = useContext(blogContext);
  const blogsFilteredSort = blogSort?.slice(0, 9) || [];
  const [isLoading, setIsLoading] = useState(false);

  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".avif"];

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
    setBlogsStoreFiltered(blogsFilteredSort);
    if (skeletonCon) {
      setIsLoading(true);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      setSkeletonCon(false);
    }, 3800);

    fetchImages();

    return () => clearTimeout(timer);
  }, [blogs]);

  return (
    <div
      className={`transition duration-500 ${
        dark ? "text-white" : "text-black"
      } flex items-center pb-10 flex-col gap-[30px]`}
    >
      <div className="flex flex-col px-2 w-full lg:px-0 lg:w-[90%] items-center">
        <h1 className="w-full font-bold mb-2">Latest Post</h1>
        <div className="grid grid-cols-1 w-full xs:grid-cols-2 sm:grid-cols-3 gap-5">
          {isLoading ? (
            <SkeletonCards
              cards={9}
              base={dark ? "#3A3B4A" : "#E0E0E0"}
              highlightColor={dark ? "#4A4B5A" : "#F0F0F0"}
            />
          ) : (
            blogsStoreFiltered.map(({ type, title, date, name, id }, i) => {
              const matchingImage = imageUrl?.find((url) =>
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
                    {matchingImage ? (
                      <img
                        src={matchingImage}
                        alt={type}
                        className="rounded-lg object-cover h-[220px] w-full"
                      />
                    ) : (
                      <div className="bg-gray-200 rounded-lg h-[220px] w-full flex items-center justify-center">
                        <p className="text-gray-500">Image not available</p>
                      </div>
                    )}
                    <h2 className="text-[13px] w-fit px-2 py-1 mt-4 rounded-[4px] bg-[#4b6bfb0e] text-[#4B6BFB]">
                      {type || "No type available"}
                    </h2>
                    <p
                      className={`mt-2 font-semibold xs:text-[13px] sm:text-[15px]`}
                    >
                      {title || "No title available"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center justify-center h-[35px] w-[35px] rounded-[50%] bg-blue-400">
                      {name?.slice(0, 1).toUpperCase() || "U"}
                    </div>
                    <div
                      className={`xs:text-[13px] ${
                        dark ? "text-[#ffffff86]" : "text-[#00000086]"
                      }`}
                    >
                      {name || "Unknown author"}
                    </div>
                    <div
                      className={`xs:text-[13px] ${
                        dark ? "text-[#ffffff86]" : "text-[#00000086]"
                      }`}
                    >
                      {date || "No date available"}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
      <Link
        to="/blogs"
        className={`py-1 px-3 border-2 ${
          dark ? "border-[#ffffff93]" : "border-[#00000093]"
        } rounded-md`}
      >
        View All Post
      </Link>
    </div>
  );
};

export default BlogsList;

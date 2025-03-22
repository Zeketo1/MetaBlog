import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogContext } from "../context/BlogContextProvider";
import { IoPerson } from "react-icons/io5";
import { imageDB } from "../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useStore } from "eoion";
import store from "../store/store";

const BlogDetails = () => {
  const [dark] = useStore(store.subscribe("dark"));
  const { id } = useParams();
  const { blogs } = useContext(blogContext);

  const userblog = blogs.filter((blog) => blog.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
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

    fetchImages();
  }, []);

  return (
    <div
      className={`transition duration-500 ${
        dark ? "bg-[#242535] text-[#BABABF]" : "bg-white text-black"
      } px-3 py-3 lg:px-[10%]`}
    >
      {userblog?.map(
        (
          {
            type,
            title,
            date,
            name,
            tip1,
            tip2,
            tip3,
            tip4,
            tip5,
            tipheader1,
            tipheader2,
            tipheader3,
            tipheader4,
            tipheader5,
            article,
            quote,
            conclusion,
            id,
          },
          i
        ) => {
          const matchingImage = imageUrl.find((url) => url.includes(`${id}.`));
          const matchingImage2 = imageUrl.find((url) =>
            url.includes(`${id}S.`)
          );
          return (
            <div key={i} className="flex flex-col gap-2">
              {type && (
                <h2 className="text-[13px] w-fit px-2 py-1 mt-4 rounded-[4px] bg-[#4b6bfb0e] text-[#4B6BFB]">
                  {type}
                </h2>
              )}
              {title && <h1 className="text-2xl font-semibold">{title}</h1>}
              <div className="flex gap-2 items-center mb-3 mt-1">
                <div className="bg-gray-400 rounded-[50%] p-2 w-fit">
                  <IoPerson className="text-[16px] text-black" />
                </div>
                {name && <p>{name}</p>}
                {date && <p>{date}</p>}
              </div>
              {matchingImage && (
                <img
                  src={matchingImage}
                  alt=""
                  className="mb-2 rounded-md h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full object-cover"
                />
              )}
              {article && <p className="mb-3">{article}</p>}
              {tipheader1.trim() === "" ? null : (
                <h1 className="text-xl font-semibold mb-1">{tipheader1}</h1>
              )}
              {tip1.trim() === "" ? null : <p className="mb-3">{tip1}</p>}
              {tipheader2.trim() === "" ? null : (
                <h1 className="text-xl font-semibold mb-1">{tipheader2}</h1>
              )}
              {tip2.trim() === "" ? null : <p className="mb-3">{tip2}</p>}
              {quote && (
                <p
                  className={`transition duration-500 mb-4 text-xl p-3 border-l-4 rounded-xl border-black ${
                    dark ? "bg-[#3d3f5b]" : "bg-[#E8E8EA]"
                  } `}
                >
                  {quote}
                </p>
              )}
              {matchingImage2 && (
                <img
                  src={matchingImage2}
                  alt=""
                  className="mb-2 rounded-md h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full object-cover"
                />
              )}
              {tipheader3.trim() === "" ? null : (
                <h1 className="text-xl font-semibold mb-1">{tipheader3}</h1>
              )}
              {tip3.trim() === "" ? null : <p className="mb-3">{tip3}</p>}
              {tipheader4.trim() === "" ? null : (
                <h1 className="text-xl font-semibold mb-1">{tipheader4}</h1>
              )}
              {tip4.trim() === "" ? null : <p className="mb-3">{tip4}</p>}
              {tipheader5.trim() === "" ? null : (
                <h1 className="text-xl font-semibold mb-1">{tipheader5}</h1>
              )}
              {tip5.trim() === "" ? null : <p className="mb-3">{tip5}</p>}
              {conclusion && (
                <>
                  <h1 className="text-xl font-semibold mb-1">Conclusion:</h1>
                  <p className="mb-3">{conclusion}</p>
                </>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default BlogDetails;

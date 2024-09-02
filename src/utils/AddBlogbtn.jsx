import React, { useContext, useEffect, useState } from "react";
import { GiFeather } from "react-icons/gi";
import { Link } from "react-router-dom";
import { blogContext } from "../context/BlogContextProvider";

const AddBlogbtn = () => {
  const [scrollPosition, setScrollPosition] = useState(false);
  const { userActive } = useContext(blogContext);

  window.addEventListener("scroll", () => {
    window.scrollY >= 400 ? setScrollPosition(true) : setScrollPosition(false);
  });

  return (
    <Link
      to={userActive ? "/create" : "/signup" }
      className={`p-3 fixed bottom-16 transition-all duration-700 right-5 rounded-[50%] bg-[#4B6BFB] z-40 ${
        scrollPosition ? "translate" : "translateB"
      }`}
    >
      <GiFeather className="text-[25px] text-white" />
    </Link>
  );
};

export default AddBlogbtn;

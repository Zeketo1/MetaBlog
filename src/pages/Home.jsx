import React, { useContext } from "react";
import Banner from "../components/Home/Banner";
import BlogsList from "../components/Home/BlogsList";
import { blogContext } from "../context/BlogContextProvider";

const Home = () => {
  const {dark} = useContext(blogContext)
  
  return (
    <div className={`transition duration-500 font-poppins ${dark && "bg-[#242535]" } `}>
      <Banner />
      <BlogsList />
    </div>
  );
};

export default Home;

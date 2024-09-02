import React, { useContext, useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import BlogsList from "../components/Home/BlogsList";
import { blogContext } from "../context/BlogContextProvider";
import AddBlogbtn from "../utils/AddBlogbtn";
import { useStore } from "eoion";
import store from "../store/store";

const Home = ({ setfooter }) => {
  const [dark] = useStore(store.subscribe("dark"));

  useEffect(() => {
    setfooter(true);
  }, []);

  return (
    <div
      className={`transition duration-500 font-poppins ${
        dark && "bg-[#242535]"
      } `}
    >
      <AddBlogbtn />
      <Banner />
      <BlogsList />
    </div>
  );
};

export default Home;

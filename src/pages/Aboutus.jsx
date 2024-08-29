import React, { useEffect } from "react";
import Title from "../components/aboutus/Title";
import Banner from "../components/aboutus/Banner";
import Lifestyle from "../components/aboutus/Lifestyle";
import AuthorList from "../components/aboutus/AuthorList";

const Aboutus = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <div className="font-poppins">
      <Title />
      <Banner />
      <Lifestyle />
      <AuthorList />
    </div>
  );
};

export default Aboutus;

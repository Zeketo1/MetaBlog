import React from "react";
import Home from "../pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../common/NavBar";
import NotFound from "../common/NotFound";
import Footer from "../common/Footer";
import { BlogContextProvider } from "../context/BlogContextProvider";
import BlogDetails from "./BlogDetails";
import Aboutus from "../pages/Aboutus";
import Contact from "../pages/Contact";
import Blogs from "../pages/Blogs";

const AppRoutes = () => {
  return (
    <>
      <BlogContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </BlogContextProvider>
    </>
  );
};

export default AppRoutes;

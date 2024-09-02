import React, { useEffect, useState } from "react";
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
import AddBlogPost from "../pages/crud/Create";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = () => {
  const [footer, setfooter] = useState(true);

  return (
    <>
      <BlogContextProvider>
        <BrowserRouter>
          <NavBar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home setfooter={setfooter} />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/create" element={<AddBlogPost />} />
            <Route path="/login" element={<Login setfooter={setfooter} />} />
            <Route path="/signup" element={<Signup setfooter={setfooter} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {footer && <Footer />}
        </BrowserRouter>
      </BlogContextProvider>
    </>
  );
};

export default AppRoutes;

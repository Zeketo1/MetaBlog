import React, { useContext, useEffect, useState } from "react";
import Home from "../pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../common/NavBar";
import NotFound from "../common/NotFound";
import Footer from "../common/Footer";
import { blogContext } from "../context/BlogContextProvider";
import BlogDetails from "./BlogDetails";
import Aboutus from "../pages/Aboutus";
import Contact from "../pages/Contact";
import Blogs from "../pages/Blogs";
import AddBlogPost from "../pages/crud/Create";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Spinner from "../utils/spinner/Spinner";

const AppRoutes = () => {
  const [footer, setfooter] = useState(true);
  const { userActive, setUserActive } = useContext(blogContext);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Check the auth state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserActive(true);
        setLoading(true);
      } else {
        setUserActive(false);
      }
      setLoading(false); // Set loading to false once we know the auth state
    });
  }, [setUserActive]);

  if (loading) {
    // Show spinner while loading
    return <Spinner size={50} height="h-screen" />;
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home setfooter={setfooter} />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          {userActive && <Route path="/create" element={<AddBlogPost />} />}
          {!userActive && (
            <Route path="/login" element={<Login setfooter={setfooter} />} />
          )}
          {!userActive && (
            <Route path="/signup" element={<Signup setfooter={setfooter} />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {footer && <Footer />}
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;

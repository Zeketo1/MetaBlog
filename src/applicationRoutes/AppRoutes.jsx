import { useContext, useEffect, useState } from "react";
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
import Dashboard from "@/pages/Shadcn";

const AppRoutes = () => {
  const [footer, setfooter] = useState(true);
  const { userActive, setUserActive } = useContext(blogContext);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Check the auth state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserActive(true);
      } else {
        setUserActive(false);
      }
      setLoading(false); // Set loading to false once we know the auth state
    });
  }, [setUserActive]);

  if (loading) {
    // Show spinner while loading
    return <Spinner height="h-screen" size={50} />;
  }

  return (
    <>
      {/* <div className="flex items-center">
              <label
                htmlFor="image1" // Updated to match the unique ID
                className={`cursor-pointer py-2 px-4 rounded-lg transition-colors ${
                  dark
                    ? "bg-gray-600 hover:bg-gray-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
                }`}
              >
                Choose File
              </label>
              <input
                type="file"
                id="image1" // Unique ID
                onChange={handleImageUpload}
                className="hidden" // Hide the default file input
                required
              />
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                {image ? image.name : "No file chosen"}
              </span>
            </div> */}
      <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home setfooter={setfooter} />} />
          <Route path="/about" element={<Aboutus />} />
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
          <Route path="/shadcn" element={<Dashboard />} />
        </Routes>
        {footer && <Footer />}
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;

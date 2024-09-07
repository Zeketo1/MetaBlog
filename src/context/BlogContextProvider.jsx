import { onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { colBlogs } from "../firebase";

const blogContext = createContext(null);

const BlogContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [blogs, setblogs] = useState([]);
  const [userActive, setUserActive] = useState(false);
  const [profile, setProfile] = useState("");

  const blogSort = blogs.sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    // Set up Firestore listener for real-time updates
    const unsubscribe = onSnapshot(colBlogs, (snapshot) => {
      try {
        const blogsArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
  
        setblogs(blogsArray);
      } catch (e) {
        console.log(e.message);
      }
    });
  
    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);
  

  return (
    <blogContext.Provider
      value={{
        blogSort,
        blogs,
        dark,
        setDark,
        userActive,
        setUserActive,
        profile,
        setProfile,
      }}
    >
      {children}
    </blogContext.Provider>
  );
};

export { BlogContextProvider, blogContext };

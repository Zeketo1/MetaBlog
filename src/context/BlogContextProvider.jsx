import { onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { colBlogs } from "../firebase";

const blogContext = createContext(null);

const BlogContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
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

    return () => unsubscribe();
  }, []);
  console.log(dark);
  
  return (
    <blogContext.Provider value={{blogs, dark, setDark }}>
      {children}
    </blogContext.Provider>
  );
};

export { BlogContextProvider, blogContext };

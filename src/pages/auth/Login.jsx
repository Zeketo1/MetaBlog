import React, { useState, useContext, useEffect } from "react";
import { blogContext } from "../../context/BlogContextProvider"; // Assuming dark mode context
import store from "../../store/store";
import { useStore } from "eoion";
import { GridBackgroundDemo } from "../../lib/GridBackgroundDemo";
import { FcGoogle } from "react-icons/fc";
import { handleLoginForm, signupWithGoogle } from "../../firebase";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = ({ setfooter }) => {
  const [dark] = useStore(store.subscribe("dark"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for login
    setEmail("");
    setPassword("");
    e.preventDefault();
    handleLoginForm(e, email, password);
  };

  useEffect(() => {
    setfooter(false);
  }, [setfooter]);

  const [showPass, setShowPass] = useState(true)  

  return (
    <div
      className={`relative h-[90dvh] flex items-center justify-center px-6 transition-colors duration-500 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <GridBackgroundDemo />
      <div
        className={`absolute w-full max-w-md p-8 shadow-md rounded-lg transition-colors duration-500 ${
          dark ? "bg-[#1f2937c2]" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "border-gray-300"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <div className={`flex items-center gap-1 p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "border-gray-300"
              }`}>
              <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full bg-transparent outline-none`}
              required
            />
            {showPass ? (
                  <FaRegEye onClick={() => setShowPass(!showPass)} />
                ) : (
                  <FaRegEyeSlash onClick={() => setShowPass(!showPass)} />
                )}
            </div>
            
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors ${
              dark ? "bg-blue-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            Login
          </button>
        </form>
        <div className="w-full flex flex-col gap-2 mt-4 justify-between items-center">
          <div
            onClick={signupWithGoogle}
            className={`w-fit flex cursor-pointer items-center gap-2 py-2 px-4 ${
              dark ? "bg-transparent text-white" : "bg-white text-black"
            }  rounded-md border-[#8080805c] border`}
          >
            <FcGoogle className="text-[20px]" />
            <p className="text-[13px] font-semibold">Sign with Google</p>
          </div>
          <div className="flex items-center gap-1">
            <p>Already have an account?</p>
            <Link to="/signup" className="h-fit font-serif text-purple-500">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

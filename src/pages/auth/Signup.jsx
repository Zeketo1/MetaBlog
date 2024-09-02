import React, { useState, useContext, useEffect, useRef } from "react";
import { blogContext } from "../../context/BlogContextProvider"; // Assuming dark mode context
import store from "../../store/store";
import { useStore } from "eoion";
import { GridBackgroundDemo } from "../../lib/GridBackgroundDemo";
import { FcGoogle } from "react-icons/fc";
import { handleSignupForm, showToast, signupWithGoogle } from "../../firebase";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = ({ setfooter }) => {
  const ref = useRef(null);
  const [dark] = useStore(store.subscribe("dark")); // Get dark mode value from context

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Only for signup

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for signup
    if (password === confirmPassword) {
      console.log("Signing up with", { email, password });
      handleSignupForm(name, email, password);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      showToast("`Welcome to the community!" + name, "success");
    } else {
      console.log("Passwords do not match!");
      showToast("Passwords do not match!", "error");
      ref.current.classList.add("border", "border-red-500");
    }
  };

  useEffect(() => {
    setfooter(false);
  }, [setfooter]);
  const [showPass, setShowPass] = useState(true);
  const [showPass2, setShowPass2] = useState(true);

  return (
    <div
      className={`relative h-[90dvh] flex items-center justify-center px-6 transition-colors duration-500 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <GridBackgroundDemo />
      <div
        className={`absolute w-full max-w-md px-8 py-7 shadow-md rounded-lg transition-colors duration-500 ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`text-[15px] block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
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
              className={`text-[15px] block mb-2 ${
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
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label
                className={`text-[15px] block mb-2 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="password"
              >
                Password
              </label>
              <div className="border px-3 py-2 rounded-lg flex items-center">
                <input
                  type={showPass ? "password" : "text"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`placeholder:text-[14px] w-full focus:outline-none focus:border-blue-500 bg-transparent`}
                  required
                />
                {showPass ? (
                  <FaRegEye onClick={() => setShowPass(!showPass)} />
                ) : (
                  <FaRegEyeSlash onClick={() => setShowPass(!showPass)} />
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className={`text-[15px] block mb-2 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div
                ref={ref}
                className="border px-3 py-2 rounded-lg flex items-center gap-1"
              >
                <input
                  type={showPass2 ? "password" : "text"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className={`placeholder:text-[14px] w-full focus:outline-none focus:border-blue-500 bg-transparent`}
                  required
                />
                {showPass2 ? (
                  <FaRegEye onClick={() => setShowPass2(!showPass2)} />
                ) : (
                  <FaRegEyeSlash onClick={() => setShowPass2(!showPass2)} />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors ${
              dark ? "bg-blue-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            Sign Up
          </button>
        </form>
        <div className="w-full flex flex-col gap-2 mt-4 justify-between items-center">
          <div
            onClick={signupWithGoogle}
            className={`w-fit flex cursor-pointer items-center gap-2 py-2 px-4 ${
              dark ? "bg-transparent text-white" : "bg-white text-black"
            }  rounded-md border-[#8080805c] border`}
          >
            {/* <img src={googleIcon} alt="" className="h-[20px]" /> */}
            <FcGoogle className="text-[20px]" />
            <p className="text-[13px] font-semibold">Login with Google</p>
          </div>
          <div className="flex items-center gap-1">
            <p>Already have an account?</p>
            <Link to="/login" className="h-fit font-serif text-purple-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

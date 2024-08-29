"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./LampContainer";
import { LampContainerLight } from "./LampContainerLight";
import { blogContext } from "../context/BlogContextProvider";

export function LampDemo({ text }) {
  const { dark } = useContext(blogContext);

  return dark ? (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-white md:text-7xl"
      >
        {text}
      </motion.h1>
    </LampContainer>
  ) : (
    <LampContainerLight>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="custom__text__shadow mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-black md:text-7xl"
      >
        {text}
      </motion.h1>
    </LampContainerLight>
  );
}

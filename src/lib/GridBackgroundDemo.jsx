import { useStore } from "eoion";
import React from "react";
import store from "../store/store";

export function GridBackgroundDemo() {
  const [dark] = useStore(store.subscribe("dark"));

  return (
    <div
      className={`h-[90dvh] absolute w-full ${
        dark ? "bg-gray-900 text-white bg-grid-white/[0.2]" : "bg-gray-100 text-gray-900 bg-grid-black/[0.2]"
      } flex items-center justify-center`}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className={`absolute pointer-events-none inset-0 flex items-center justify-center ${dark ? "bg-black" : " bg-white"}   [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}></div>
      {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p> */}
    </div>
  );
}

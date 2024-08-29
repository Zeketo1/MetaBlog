import { cn } from "./cn";
import { motion } from "framer-motion";

export const LampContainerLight = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-gray-100 w-full z-0", // Changed to a softer bg-gray-100
        className
      )}
    >
      <div className="translate-y-[7.5rem] relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-gray-800 [--conic-position:from_70deg_at_center_top]" // Changed text to gray-800
        >
          <div className="absolute  w-[100%] left-0 bg-gray-100 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,gray,transparent)]" /> {/* Changed bg-white to bg-gray-100 and mask-image to gray */}
          <div className="absolute  w-40 h-[100%] left-0 bg-gray-100  bottom-0 z-20 [mask-image:linear-gradient(to_right,gray,transparent)]" /> {/* Changed bg-white to bg-gray-100 and mask-image to gray */}
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-gray-800 [--conic-position:from_290deg_at_center_top]" // Changed text to gray-800
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-gray-100  bottom-0 z-20 [mask-image:linear-gradient(to_left,gray,transparent)]" /> {/* Changed bg-white to bg-gray-100 and mask-image to gray */}
          <div className="absolute  w-[100%] right-0 bg-gray-100 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,gray,transparent)]" /> {/* Changed bg-white to bg-gray-100 and mask-image to gray */}
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-gray-100 blur-2xl"></div> {/* Changed bg-white to bg-gray-100 */}
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-gray-100 "></div> {/* Changed bg-white to bg-gray-100 */}
      </div>

      <div className="relative z-50 flex -translate-y-[12.5rem] flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

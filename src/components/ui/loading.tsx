"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import icon from "@/assets/logo.png";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);
    const text = setTimeout(() => {
      setLoadingText("LapBooking");
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(text);
    };
  }, []);

  return (
    <div className="absolute w-full min-h-screen overflow-hidden">
      <motion.div
        animate={{ y: isLoading ? 0 : "-100%" }}
        className="fixed top-0 h-1/2 w-full bg-[#76ADFF] z-50"
        initial={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <motion.div
        animate={{ y: isLoading ? 0 : "100%" }}
        className="fixed bottom-0 w-full h-2/3 bg-[#76ADFF] z-50"
        initial={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="absolute left-0 right-0 w-10/12 mx-auto text-lg font-semibold text-center text-neutral-200 bottom-14"
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 2.9 }}
        >
          Solusi mudah dalam berolahraga
        </motion.div>
      </motion.div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none`}
      >
        <motion.div
          animate={{ opacity: isLoading ? 1 : 0 }}
          className="relative flex flex-col items-center"
          initial={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div
            animate={{
              scale: 1,
              opacity: 1,
              y: loadingText === "LapBooking" ? -48 : 0,
            }}
            initial={{ scale: 0, opacity: 0, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 300,
            }}
          >
            <Image
              alt="LapBooking icon"
              className="w-24 h-24 md:w-48 md:h-48"
              height={300}
              src={icon}
              width={300}
            />
          </motion.div>
          <motion.div
            animate={{
              scale: loadingText === "LapBooking" ? 1 : 0,
              opacity: loadingText === "LapBooking" ? 1 : 0,
            }}
            className={`font-bayon text-neutral-200 text-xl font-bold ${
              loadingText !== "LapBooking" ? "animate-pulse" : ""
            }`}
            initial={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 200,
              ease: "easeOut",
              delay: loadingText === "LapBooking" ? 0.4 : 0,
            }}
          >
            {loadingText}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

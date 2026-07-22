"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden">

      {/* Sfondo stadio */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/stadium.jpg')",
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      />

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black/60" />


      {/* Contenuto */}
      <div className="relative z-10 text-center text-white">


        <motion.h1
          className="text-7xl font-bold tracking-widest"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
          }}
        >
          DIETRO
          <br />
          LA PANCHINA
        </motion.h1>


        <motion.p
          className="mt-6 text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 1,
          }}
        >
          Vivi la carriera oltre il campo
        </motion.p>


        <motion.button
          className="
          mt-10
          px-12
          py-4
          rounded-xl
          bg-yellow-500
          text-black
          font-bold
          text-xl
          shadow-lg
          "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          AVVIA CARRIERA
        </motion.button>

      </div>

    </main>
  );
}
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroNew() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] bg-black text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-bg.jpg" 
          alt="Hero background" 
          fill 
          className="object-cover opacity-50"
          priority
          style={{filter: "grayscale(100%) contrast(110%)"}}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-white">LA<span className="text-gray-500">FORESTA</span></span>
          <motion.span 
            className="block text-white text-3xl md:text-5xl font-light tracking-widest mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            ELECTRONIC EVENTS
          </motion.span>
        </motion.h1>

        {/* Animated line */}
        <motion.div 
          className="h-px w-0 bg-white mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 0.8, delay: 0.7 }}
        ></motion.div>

        <motion.p
          className="text-lg md:text-xl text-center max-w-2xl mx-auto mb-12 text-gray-300 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          Modern DJ & Techno events. Underground music, exclusive mixes, and
          unforgettable nights. Experience the future of sound.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <motion.a
            href="/events"
            className="relative group overflow-hidden flex items-center justify-center border border-white bg-transparent px-12 py-4 text-white font-medium uppercase tracking-widest transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button fill effect */}
            <span className="absolute inset-0 w-full h-full bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">View Events</span>
          </motion.a>

          <motion.a
            href="/recordings"
            className="relative group overflow-hidden flex items-center justify-center border border-gray-700 bg-gray-900/50 px-12 py-4 text-white font-medium uppercase tracking-widest transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button fill effect */}
            <span className="absolute inset-0 w-full h-full bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Listen</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg className="w-6 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}

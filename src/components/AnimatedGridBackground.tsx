"use client";

import { motion } from "framer-motion";

export default function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Animated grid pattern */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px', '0px 0px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-transparent to-black/70"></div>
      
      {/* Subtle animated dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Subtle scanlines effect */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%)',
          backgroundSize: '4px 100%'
        }}
        animate={{
          backgroundPositionX: ['0px', '4px']
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

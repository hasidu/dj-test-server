"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative group p-2 bg-black/20 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-black/40 transition-colors"
      aria-label="Toggle dark mode"
    >
      <div className="relative">
        <motion.div
          initial={false}
          animate={{ 
            rotateZ: isDark ? 45 : 0,
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="text-white group-hover:text-white transition-colors"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{ 
            rotateZ: isDark ? 0 : -45,
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 text-white transition-colors"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl blur-md -z-10 transition-opacity"></div>
    </motion.button>
  );
};

export default ThemeToggle;

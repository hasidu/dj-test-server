"use client";

import React from "react";
import { useNavigation } from "@/context/NavigationContext";
import NavbarNew from "@/components/NavbarNew";

export default function NavbarWrapper() {
  // Temporarily always show navbar to debug
  const showNavbar = true;
  
  return (
    <div 
      className={`transition-all duration-300 ${
        showNavbar ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
      style={{ 
        transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
        zIndex: 50
      }}
    >
      <NavbarNew />
    </div>
  );
}

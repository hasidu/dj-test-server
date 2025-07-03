"use client";

import React from "react";
import { useNavigation } from "@/context/NavigationContext";
import Navbar from "@/components/NavbarNew";

const ConditionalNavbar: React.FC = () => {
  const { isNavbarVisible } = useNavigation();

  if (!isNavbarVisible) {
    return null;
  }

  return <Navbar />;
};

export default ConditionalNavbar;

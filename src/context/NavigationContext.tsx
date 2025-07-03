"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isNavbarVisible: boolean;
  hideNavbar: () => void;
  showNavbar: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const hideNavbar = () => {
    console.log('NavigationContext: hiding navbar');
    setIsNavbarVisible(false);
  };
  
  const showNavbar = () => {
    console.log('NavigationContext: showing navbar');
    setIsNavbarVisible(true);
  };

  return (
    <NavigationContext.Provider value={{ isNavbarVisible, hideNavbar, showNavbar }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

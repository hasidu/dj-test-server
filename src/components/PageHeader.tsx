"use client";

import React, { useState, useEffect } from 'react';
import WavySilkBackground from './WavySilkBackground';
import StaticWavyBackground from './StaticWavyBackground';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  // Use state to track if animation is working
  const [useCanvas, setUseCanvas] = useState(true);
  
  // If canvas doesn't load properly after 2 seconds, fall back to static background
  useEffect(() => {
    const timer = setTimeout(() => {
      const canvas = document.querySelector('.page-header-canvas');
      if (!canvas || (canvas as HTMLCanvasElement).width === 0) {
        console.log('Canvas not initialized properly, falling back to static background');
        setUseCanvas(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-black text-white py-24 md:py-36 relative overflow-hidden">
      {/* Silk background container - with both options */}
      <div className="absolute inset-0 z-0" style={{ height: '100%', width: '100%' }}>
        {useCanvas ? (
          <WavySilkBackground className="page-header-canvas" />
        ) : (
          <StaticWavyBackground />
        )}
      </div>
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-white block">{title}</span>
        </h1>
        <div className="w-24 h-1 bg-[#a3ff12] mx-auto my-8"></div>
        {description && (
          <p className="text-lg max-w-3xl mx-auto text-gray-300 mt-6">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

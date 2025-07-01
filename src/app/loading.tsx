"use client";

import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90 backdrop-blur-md">
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <span className="animate-pulse">
            <svg className="w-5 h-5 text-[#a3ff12]" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" />
            </svg>
          </span>
          <span className="animate-pulse delay-100">
            <svg className="w-5 h-5 text-[#a3ff12]" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" />
            </svg>
          </span>
          <span className="animate-pulse delay-200">
            <svg className="w-5 h-5 text-[#a3ff12]" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" />
            </svg>
          </span>
        </div>
      </div>
      
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#a3ff12]" 
          style={{ width: `${progress}%`, transition: 'width 0.2s ease-in-out' }}
        />
      </div>
      
      <p className="mt-4 text-gray-400 text-sm font-mono">
        LOADING BEATS {Math.floor(progress)}%
      </p>
    </div>
  );
}

"use client";

import React from 'react';

interface StaticWavyBackgroundProps {
  className?: string;
}

const StaticWavyBackground: React.FC<StaticWavyBackgroundProps> = ({ className = "" }) => {
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        background: `
          linear-gradient(180deg, rgba(30,30,35,0.8) 0%, rgba(25,25,30,0.8) 20%, rgba(20,20,25,0.8) 40%, 
          rgba(25,25,30,0.8) 60%, rgba(30,30,35,0.8) 80%, rgba(25,25,30,0.8) 100%)
        `,
        backgroundSize: '100% 600%',
        animation: 'moveWave 8s linear infinite'
      }}
    >
      <style jsx>{`
        @keyframes moveWave {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default StaticWavyBackground;

"use client";

import { useState, useEffect } from 'react';

interface AudioWaveProps {
  isPlaying?: boolean;
  color?: string;
  height?: number;
  barCount?: number;
  className?: string;
}

export default function AudioWave({ 
  isPlaying = false, 
  color = "#a3ff12", 
  height = 40,
  barCount = 20,
  className = "" 
}: AudioWaveProps) {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial random heights for bars
    const initialBars = Array.from({ length: barCount }, () => 
      Math.floor(Math.random() * (height * 0.8)) + (height * 0.2)
    );
    setBars(initialBars);

    if (isPlaying) {
      // Animate bars when playing
      const interval = setInterval(() => {
        setBars(prevBars => 
          prevBars.map(() => Math.floor(Math.random() * (height * 0.8)) + (height * 0.2))
        );
      }, 100);

      return () => clearInterval(interval);
    } else {
      // Set to minimal animation when paused
      setBars(prevBars => prevBars.map(() => height * 0.2));
    }
  }, [isPlaying, barCount, height]);
  return (
    <div className={`flex items-end justify-center space-x-1 ${className}`} 
      style={{ height: `${height}px` }}>
      {bars.map((barHeight, index) => (
        <div
          key={index}
          className="w-1 rounded-t-sm transition-all duration-100"
          style={{ 
            height: `${isPlaying ? barHeight : 4}px`,
            backgroundColor: color,
            opacity: isPlaying ? 1 : 0.5,
            transition: isPlaying ? 'height 0.1s ease-in-out' : 'height 0.5s ease-out'
          }}
        />
      ))}
    </div>
  );
}

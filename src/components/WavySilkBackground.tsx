"use client";

import React, { useRef, useEffect } from 'react';

interface WavySilkBackgroundProps {
  className?: string;
}

const WavySilkBackground: React.FC<WavySilkBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Debugging log
  console.log('WavySilkBackground rendering');
  useEffect(() => {
    console.log('WavySilkBackground useEffect running');
    
    // Slight delay to ensure the component is properly mounted in the DOM
    const initTimeout = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Canvas context not available');
        return;
      }

    // Set canvas to be the size of its parent
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);    // Animation variables
    const waves = 6; // Fewer waves for more visible effect
    const amplitude = canvas.height / 20; // Larger amplitude for more visible waves
    const frequency = 0.003; // Lower frequency for smoother, more visible waves
    
    // More visible colors with higher opacity
    const colors = [
      'rgba(32, 32, 40, 0.7)',
      'rgba(40, 40, 48, 0.7)', 
      'rgba(48, 48, 56, 0.7)',
      'rgba(56, 56, 64, 0.7)',
      'rgba(64, 64, 72, 0.7)',
      'rgba(72, 72, 80, 0.7)'
    ];
    
    let time = 0;

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw waves
      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        
        const yOffset = (i / waves) * canvas.height;
        const waveHeight = canvas.height / waves;
        
        ctx.moveTo(0, yOffset);
            // Create smooth wave pattern with multiple sine waves for more complex motion
        for (let x = 0; x <= canvas.width; x += 5) { // Larger step for performance
          // Combine multiple sine waves with different frequencies for a more natural look
          const y = yOffset + 
                  Math.sin((x * frequency) + (time / 1000) + (i * Math.PI * 0.5)) * amplitude * 1.0 +
                  Math.sin((x * frequency * 1.2) + (time / 1500) + (i * Math.PI * 0.25)) * amplitude * 0.7 +
                  (waveHeight / 2);
          
          ctx.lineTo(x, y);
        }
        
        // Complete the wave shape
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Fill with gradient and add stroke for more visibility
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        
        // Add subtle stroke to make waves more visible
        if (i % 2 === 0) { // Only add stroke to every other wave
          ctx.strokeStyle = 'rgba(100, 100, 120, 0.3)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      
      time += 20; // Faster animation
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();      // Cleanup
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, 100); // 100ms delay to ensure DOM is ready
    
    return () => clearTimeout(initTimeout);
  }, []);
  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full ${className}`}
      style={{ 
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default WavySilkBackground;

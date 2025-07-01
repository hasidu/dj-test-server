"use client";

import { useCallback } from "react";
import { useEffect, useRef } from "react";

interface SilkBackgroundProps {
  className?: string;
}

const SilkBackground: React.FC<SilkBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions to match container size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    updateCanvasSize();
      
    // Settings
    const particleCount = 80;
    const particles: Particle[] = [];
    const connectionDistance = Math.min(canvas.width, canvas.height) * 0.2; // Relative to container size
    const mouseInfluenceDistance = Math.min(canvas.width, canvas.height) * 0.3; // Relative to container size
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: `rgba(163, 255, 18, ${Math.random() * 0.5 + 0.2})` // Green with varying opacity
      });
    }
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;
    });
    
    canvas.addEventListener('mouseout', () => {
      mouseActive = false;
    });
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Mouse influence
        if (mouseActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseInfluenceDistance) {
            const force = (mouseInfluenceDistance - dist) / mouseInfluenceDistance;
            p.vx -= (dx / dist) * force * 0.02;
            p.vy -= (dy / dist) * force * 0.02;
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - dist / connectionDistance) * 0.2;
            ctx.strokeStyle = `rgba(163, 255, 18, ${opacity})`; // Green with distance-based opacity
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      // Apply velocity dampening
      particles.forEach(p => {
        p.vx *= 0.99;
        p.vy *= 0.99;
        
        // Add slight random motion
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
      // Resize handler
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    const cleanup = draw();
    return cleanup;
  }, [draw]);
  
  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ pointerEvents: 'none' }} 
      />
    </div>
  );
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export default SilkBackground;

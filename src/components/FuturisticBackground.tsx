"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FuturisticBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
  intensity?: number;
}

export default function FuturisticBackground({
  color1 = "#6600ff",
  color2 = "#00ffff",
  color3 = "#ff00ff",
  intensity = 0.5
}: FuturisticBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      direction: number;
      vx: number;
      vy: number;
    }[] = [];

    const colors = [color1, color2, color3];
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Recreate particles on resize
      createParticles();
    };

    const createParticles = () => {
      particles.length = 0;
      
      const particleCount = Math.floor((width * height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.8 + 0.2,
          direction: Math.random() * Math.PI * 2,
          vx: 0,
          vy: 0
        });
      }
    };

    const updateParticles = () => {
      for (const particle of particles) {
        // Update position with slight randomness
        particle.direction += (Math.random() - 0.5) * 0.1;
        particle.vx = Math.cos(particle.direction) * particle.speed;
        particle.vy = Math.sin(particle.direction) * particle.speed;
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.direction = Math.atan2(particle.vy, particle.vx);
        }
        
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.direction = Math.atan2(particle.vy, particle.vx);
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        // Create glowing effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Draw connections between close particles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
    
    // Add subtle movement to the canvas
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color1, color2, color3]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 bg-gradient-to-br from-black via-[#0a0a18] to-black overflow-hidden"
      style={{ backgroundSize: '200% 200%' }}
    >
      <div className="absolute inset-0 opacity-40" style={{ 
        backgroundImage: `radial-gradient(circle at 20% 30%, ${color1}20 0%, transparent 50%), 
                          radial-gradient(circle at 80% 70%, ${color2}20 0%, transparent 50%), 
                          radial-gradient(circle at 50% 50%, ${color3}20 0%, transparent 50%)` 
      }}></div>
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none"></div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0000_0%,#0000_50%,#00000010_50%,#00000010_100%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
    </div>
  );
}

"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
}

const CountUp = ({ end, duration = 2 }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    let startTime: number | undefined;
    let animationFrame: number | undefined;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / (duration * 1000), 1);
      
      // Easing function - easeOutExpo
      const easeOutExpo = (t: number) => (t === 1) ? 1 : 1 - Math.pow(2, -10 * t);
      const easedProgress = easeOutExpo(progressPercent);
      
      setCount(Math.floor(easedProgress * end));

      if (progressPercent < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    if (inView) {
      animationFrame = requestAnimationFrame(updateCount);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

export default function StatsSection() {
  const stats = [
    { id: 1, number: 120, label: "Events Hosted" },
    { id: 2, number: 15000, label: "Attendees" },
    { id: 3, number: 250, label: "Artists Featured" },
    { id: 4, number: 8, label: "Years of Experience" },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              className="text-center p-6 relative"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.id * 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp end={stat.number} />
                <span className="text-gray-500">+</span>
              </h3>
              <div className="mx-auto my-3 w-12 h-px bg-white/30"></div>
              <p className="text-gray-400 uppercase text-sm tracking-wider">{stat.label}</p>
              
              {/* Border */}
              <div className="absolute inset-0 border border-gray-800"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

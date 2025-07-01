"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "LaForesta's events are unlike anything I've experienced. The music, the atmosphere - it's all incredible.",
      name: "Sophia M.",
      role: "Club-goer",
      image: "/images/team-member1.jpg"
    },
    {
      id: 2,
      quote: "As a DJ who's performed at LaForesta events, I can attest to the quality and care they put into every detail.",
      name: "David K.",
      role: "DJ & Producer",
      image: "/images/team-member2.jpg"
    },
    {
      id: 3,
      quote: "Their sound system and venue choices are top-notch. It's become the gold standard for electronic events.",
      name: "Elena T.",
      role: "Music Blogger",
      image: "/images/team-member3.jpg"
    }
  ];

  return (    <section className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            TESTIMONIALS
          </h2>
          <div className="mx-auto my-6 w-24 h-px bg-white"></div>
          <p className="max-w-2xl mx-auto text-gray-400">
            What people are saying about our events and experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-900 p-8 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Quote icon */}              <div className="absolute -top-5 left-8 text-5xl text-white opacity-10 font-serif">
                "
              </div>
              
              <p className="text-gray-300 mb-6 relative z-10">
                {testimonial.quote}
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 relative">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    style={{ filter: "grayscale(100%)" }}
                  />
                </div>                <div>
                  <h4 className="font-medium text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              {/* Border transition effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-white transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

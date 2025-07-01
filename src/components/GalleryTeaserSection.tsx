"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryTeaserSection() {
  return (    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            OUR GALLERY
          </h2>
          <div className="mx-auto my-6 w-24 h-px bg-white"></div>
          <p className="max-w-2xl mx-auto text-gray-400">
            Take a look at moments from our past events. The energy, the people, the music - all captured to relive the experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
          {[1, 2, 3, 4].map((num) => (
            <motion.div 
              key={num}
              className="relative aspect-square overflow-hidden group rounded-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: num * 0.1 }}
            >
              <Image 
                src={`/images/event${num}.jpg`} 
                alt="Gallery image" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: "grayscale(100%) contrast(110%)"
                }}
              />
                {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Border */}
              <div className="absolute inset-0 border border-gray-800 group-hover:border-white/50 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="/gallery"
            className="relative group overflow-hidden bg-transparent inline-block"
          >            <div className="relative z-10 px-8 py-3 border border-white text-white hover:text-black font-medium uppercase tracking-wider inline-flex items-center overflow-hidden transition-all duration-300">
              <span className="relative z-10">View Gallery</span>
              
              {/* Button fill effect */}
              <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="order-2 lg:order-1">
            <motion.div 
              className="relative"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-10">                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2 font-medium">Our Story</h3>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                  ABOUT <span className="font-light">US</span>
                </h2>
                <div className="w-20 h-px bg-white mb-8"></div>
              </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Here at La Foresta, we are a team of passionate individuals dedicated to creating unique electronic 
                music experiences. Our love for underground sounds runs deep, and we believe in curating 
                unforgettable musical journeys for our community.
              </p>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                We pride ourselves on discovering and showcasing talented artists from around the globe and creating 
                an environment where both performers and attendees can connect on a deeper level through the universal 
                language of music.
              </p>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>                <Link 
                  href="/about" 
                  className="group relative overflow-hidden inline-block border border-white px-10 py-3 uppercase tracking-wide font-medium transition-all duration-300"
                >
                  {/* Button fill effect */}
                  <span className="absolute inset-0 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">Explore More</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2">
            <motion.div 
              className="relative overflow-hidden aspect-[4/5]"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image 
                src="/images/about-image2.jpg" 
                alt="La Foresta Events" 
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Image frame */}              <motion.div 
                className="absolute inset-0 border border-white pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              ></motion.div>
                {/* Brand mark overlay */}
              <div className="absolute bottom-0 right-0 bg-black p-4">
                <div className="font-bold text-2xl text-white">
                  <span>LA</span> FORESTA
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

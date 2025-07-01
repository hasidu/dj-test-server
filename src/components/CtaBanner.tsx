"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="py-16 bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            JOIN OUR COMMUNITY
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get exclusive access to ticket pre-sales, special promotions, and behind-the-scenes content from LaForesta events.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/register"
                className="relative group overflow-hidden flex items-center justify-center border border-white bg-transparent px-10 py-4 text-white font-medium uppercase tracking-widest transition-all duration-300"
              >
                {/* Button fill effect */}
                <span className="absolute inset-0 w-full h-full bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Sign Up</span>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/contact"
                className="relative group overflow-hidden flex items-center justify-center border border-gray-700 bg-gray-900/50 px-10 py-4 text-white font-medium uppercase tracking-widest transition-all duration-300"
              >
                {/* Button fill effect */}
                <span className="absolute inset-0 w-full h-full bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Contact Us</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

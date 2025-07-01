"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NewsletterNew() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your API
      console.log('Subscribing email:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the submitted state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="text-center">
              <motion.span 
                className="text-sm uppercase tracking-widest text-gray-400 mb-2 block"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                JOIN OUR COMMUNITY
              </motion.span>
              
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                STAY CONNECTED
              </motion.h2>
              
              <div className="w-20 h-0.5 bg-white mx-auto mb-10"></div>
              
              <motion.p 
                className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Get exclusive access to ticket pre-sales, special promotions, and behind-the-scenes content from LaForesta events.
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email and Subscribe Row */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-6 py-3 bg-transparent border border-white/50 text-white placeholder-gray-400 outline-none"
                  required
                />
                
                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300"
                >
                  SUBSCRIBE
                </button>
              </div>
              
              {/* Sign Up and Contact Us Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Link 
                  href="/register"
                  className="w-full sm:w-auto px-8 py-3 border border-white text-white uppercase tracking-wider text-center hover:bg-white hover:text-black transition-colors duration-300"
                >
                  SIGN UP
                </Link>
                
                <Link 
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3 border border-gray-800 bg-gray-900 text-white uppercase tracking-wider text-center hover:bg-gray-800 transition-colors duration-300"
                >
                  CONTACT US
                </Link>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
            
            {/* Success message */}
            {isSubmitted && (
              <motion.div 
                className="absolute top-0 left-0 right-0 bottom-0 bg-black/90 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <svg className="w-16 h-16 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-white">Thank You!</h3>
                  <p className="text-gray-300">You've been successfully subscribed.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

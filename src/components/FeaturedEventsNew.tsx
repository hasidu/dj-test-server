"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import events from '@/data/events';
import { motion } from 'framer-motion';

// Simple Event Card for black and white design
const SimpleEventCard = ({ event }: { event: any }) => {
  return (
    <motion.div 
      className="group relative overflow-hidden bg-white text-black hover:shadow-xl transition-all duration-500"
      whileHover={{ y: -10 }}
    >
      <div className="relative h-[280px]">
        <Image 
          src={event.image || "/images/event1.jpg"} 
          alt={event.title} 
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Date overlay */}
        <div className="absolute top-4 right-4 bg-white text-black py-2 px-4">
          <div className="text-xl font-bold">{new Date(event.date).getDate()}</div>
          <div className="text-xs uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200">
        <div className="mb-2 flex justify-between items-center">
          <div className="text-sm uppercase tracking-wider text-gray-500">{event.time}</div>
          <div className="text-sm font-medium">
            {event.price === 0 ? 'FREE' : `${event.price}€`}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 group-hover:underline">{event.title}</h3>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            {event.location}
          </div>
          
          <motion.button 
            className="text-black font-medium hover:text-gray-700 flex items-center gap-1"
            whileHover={{ x: 5 }}
          >
            Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function FeaturedEventsNew() {
  const featuredEvents = events.filter(event => event.featured);
  
  return (
    <section className="py-24 bg-black text-white" id="upcoming-events">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-16 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-3">Join Us</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            UPCOMING <span className="font-light">EVENTS</span>
          </h2>
          
          {/* Animated line */}
          <motion.div 
            className="h-px w-20 bg-white mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          
          <p className="text-gray-400">
            Check out our most anticipated upcoming events. From underground techno nights to immersive audio-visual experiences, 
            we curate the most cutting-edge electronic music events.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.slice(0, 3).map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.15
              }}
            >
              <Link href={`/events/${event.id}`} className="block h-full">
                <SimpleEventCard event={event} />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/events">
            <motion.div
              className="group relative overflow-hidden flex items-center justify-center border border-white bg-transparent px-12 py-4 text-white font-medium uppercase tracking-widest transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button fill effect */}
              <span className="absolute inset-0 w-full h-full bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">View All Events</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

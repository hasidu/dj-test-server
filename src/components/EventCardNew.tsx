"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Event } from '@/data/events';
import { useSavedEvents } from '@/context/SavedEventsContext';
import { motion } from 'framer-motion';

interface EventCardNewProps {
  event: Event;
}

export default function EventCardNew({ event }: EventCardNewProps) {
  const { isEventSaved, toggleSavedEvent, isLoaded } = useSavedEvents();
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Only update saved state when context is loaded
    if (isLoaded) {
      setIsSaved(isEventSaved(event.id));
    }
  }, [isLoaded, event.id, isEventSaved]);
  
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedEvent(event.id);
    setIsSaved(!isSaved);
  };
  
  // Extract date elements from ISO date
  const eventDate = event.isoDate ? new Date(event.isoDate) : null;
  const day = eventDate ? eventDate.getDate() : "";
  const month = eventDate ? eventDate.toLocaleString('en-US', { month: 'short' }) : "";
  const price = event.tickets?.price || "$20";
  
  return (
    <motion.div
      className="event-card relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-900 overflow-hidden h-full transition-transform duration-300 group-hover:translate-y-[-4px] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
        {/* Image Container */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image 
            src={event.image} 
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: "grayscale(100%)" }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          {/* Price tag */}
          <div className="absolute top-0 right-0 bg-white px-3 py-1 text-xs font-bold text-black">
            {price}
          </div>
          
          {/* Featured badge */}
          {event.featured && (
            <div className="absolute top-0 left-0 bg-black px-3 py-1 text-xs font-medium border border-white text-white">
              FEATURED
            </div>
          )}
          
          {/* Date badge for month and day */}
          {eventDate && !event.featured && (
            <div className="absolute top-0 left-0">
              <div className="flex flex-col">
                <div className="bg-white text-black px-3 py-0.5 text-xs font-bold uppercase">
                  {month.toUpperCase()}
                </div>
                <div className="bg-black text-white px-3 py-0.5 text-base font-bold">
                  {day}
                </div>
              </div>
            </div>
          )}
          
          {/* Save button */}
          <button 
            onClick={handleSaveToggle}
            className="absolute bottom-3 right-3 p-2 bg-black/70 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={isSaved ? "Remove from saved events" : "Save event"}
          >
            <svg 
              className={`w-4 h-4 ${isSaved ? 'text-white' : 'text-gray-300'}`} 
              fill={isSaved ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={isSaved ? 0 : 2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 bg-gray-950">
          {/* Title */}
          <Link href={`/events/${event.id}`} className="block">
            <h3 className="text-lg font-bold text-white mb-2.5">{event.title}</h3>
          </Link>
          
          {/* Time info */}
          <div className="flex items-center text-gray-400 text-xs mb-1.5">
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
          
          {/* Location */}
          <div className="flex items-center text-gray-400 text-xs mb-4">
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>
          
          {/* Category tag */}
          {event.categories && event.categories.length > 0 && (
            <div className="mb-2">
              <span className="uppercase text-[10px] tracking-wider font-semibold bg-transparent text-white border border-white/30 px-2 py-0.5">
                {event.categories[0]}
              </span>
            </div>
          )}
            {/* Details button with arrow */}
          <div className="flex justify-end mt-3">
            <Link 
              href={`/events/${event.id}`}              className="inline-flex items-center bg-transparent border border-white/30 hover:border-white hover:bg-white hover:text-black px-4 py-1.5 transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            >              <span className="text-xs uppercase tracking-wider font-bold text-white group-hover:text-black transition-colors duration-300">Details</span>
              <svg 
                className="w-3 h-3 ml-2 transition-all duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

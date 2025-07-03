"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Event } from '@/data/events';
import { useSavedEvents } from '@/context/SavedEventsContext';

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const { isEventSaved, toggleSavedEvent, isLoaded } = useSavedEvents();
  const [isSaved, setIsSaved] = useState(false);
  
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
  
  // Format price for display
  const formatPrice = (price: string) => {
    return price.startsWith('$') ? price : `$${price}`;
  };

  // Extract date elements from ISO date
  const eventDate = event.isoDate ? new Date(event.isoDate) : null;
  const day = eventDate ? eventDate.getDate() : "";
  const month = eventDate ? eventDate.toLocaleString('en-US', { month: 'short' }) : "";
  
  return (
    <div className="event-card modern-card relative overflow-hidden group transform transition-all duration-500 hover:scale-[1.02] max-w-sm mx-auto">
      <Link href={`/events/${event.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image 
            src={event.image} 
            alt={event.title} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-75 transition-opacity"></div>
          
          {/* Save button */}
          <button 
            onClick={handleSaveToggle}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur-lg focus:outline-none z-10 group-hover:opacity-100 opacity-75 transition-all duration-300 hover:bg-black/70"
            aria-label={isSaved ? "Remove from saved events" : "Save event"}
          >
            <svg 
              className={`w-5 h-5 ${isSaved ? 'text-accent-green' : 'text-white'} transition-colors duration-300`} 
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
          
          {/* Date badge */}
          {eventDate && !event.featured && (
            <div className="absolute top-4 left-4 flex flex-col items-center shadow-lg">
              <div className="bg-white text-black px-3 py-1 text-xs font-bold">
                {month.toUpperCase()}
              </div>
              <div className="bg-gray-200 text-black px-3 py-1 text-xl font-bold">
                {day}
              </div>
            </div>
          )}
          
          {/* Featured badge */}
          {event.featured && (
            <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1.5 font-bold uppercase tracking-wider shadow-lg">
              Featured
            </div>
          )}
          
          {/* Event info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h3 className="text-white text-xl font-bold mb-2 group-hover:text-gray-300 transition-colors duration-300">{event.title}</h3>
            
            <div className="flex items-center text-gray-300 mb-2">
              <svg className="w-4 h-4 mr-2 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{event.location}</span>
            </div>
            
            <div className="flex items-center text-gray-300 mb-4">
              <svg className="w-4 h-4 mr-2 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{event.time}</span>
            </div>
            
            {/* Categories */}
            {event.categories && event.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {event.categories.slice(0, 2).map((category, index) => (
                  <span 
                    key={index} 
                    className="bg-white/10 text-gray-200 text-xs px-2 py-1 backdrop-blur-lg border border-gray-600 rounded"
                  >
                    {category}
                  </span>
                ))}
                {event.categories.length > 2 && (
                  <span className="bg-white/10 text-gray-200 text-xs px-2 py-1 backdrop-blur-lg border border-gray-600 rounded">
                    +{event.categories.length - 2}
                  </span>
                )}
              </div>
            )}
            
            <div className="flex justify-between items-center mt-2">
              {event.tickets ? (
                <span className="font-bold text-white text-lg">
                  {formatPrice(event.tickets.price)}
                </span>
              ) : (
                <span className="text-gray-400">Price TBA</span>
              )}
              
              <span className="bg-white/10 text-xs text-white px-3 py-1.5 uppercase tracking-wider group-hover:bg-white/20 transition-colors duration-300 border border-gray-600 rounded">
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;

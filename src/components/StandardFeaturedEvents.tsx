"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import events from '@/data/events';

export default function StandardFeaturedEvents() {
  const featuredEvents = events.filter(event => event.featured);
  
  return (
    <section className="py-20 relative overflow-hidden" id="upcoming-events">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-90 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-start mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white uppercase tracking-wider">
            UPCOMING <span className="text-[#a3ff12]">EVENTS</span>
          </h2>
          <div className="w-20 h-1 bg-[#a3ff12]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredEvents.slice(0, 2).map(event => (
            <div key={event.id} className="group relative overflow-hidden rounded-sm transform transition-all duration-500 hover:scale-[1.01]">
              <Link href={`/events/${event.id}`}>
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image 
                    src={event.image} 
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
                  
                  {/* Event info overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="bg-[#a3ff12] text-black px-2 py-1 uppercase text-xs font-bold tracking-wider">
                        {event.categories?.[0] || 'Featured'}
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="text-white uppercase text-xs font-semibold mb-1">
                          {new Date(event.isoDate || '').toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="bg-black bg-opacity-70 text-white px-3 py-1 text-xl font-bold">
                          {new Date(event.isoDate || '').toLocaleDateString('en-US', { day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <div className="flex items-center text-white text-sm mb-2">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                        </svg>
                        {event.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-[#a3ff12] font-bold">
                          {event.time}
                        </div>
                        {event.tickets && (
                          <div className="text-white bg-[#a3ff12] bg-opacity-20 px-2 py-1 text-sm">
                            {event.tickets.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <Link 
            href="/events" 
            className="btn-outline border-2 border-[#a3ff12] text-[#a3ff12] hover:bg-[#a3ff12] hover:text-black px-8 py-3 uppercase font-bold tracking-wider transition-all"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}

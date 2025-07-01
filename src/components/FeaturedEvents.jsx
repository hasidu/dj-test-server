"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import events from '@/data/events';

// This is a simplified version without using EventCard component
export default function FeaturedEvents() {
  const featuredEvents = events.filter(event => event.featured);
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Check out our most anticipated events. From underground raves to ambient experiences, 
            we curate unique musical journeys for all electronic music lovers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
              <Link href={`/events/${event.id}`} className="block">
                <div className="relative h-48 w-full">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill
                    className="object-cover"
                    priority
                  />
                  {event.featured && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="p-5">
                <Link href={`/events/${event.id}`} className="block">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                </Link>
                
                <div className="mb-4 flex items-center text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date} · {event.time}</span>
                </div>
                
                <div className="mb-4 flex items-center text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                {event.categories && event.categories.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {event.categories.map((category, index) => (
                        <span 
                          key={index} 
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  {event.tickets ? (
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {event.tickets.price}
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">Price TBA</span>
                  )}
                  
                  <Link 
                    href={`/events/${event.id}`}
                    className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

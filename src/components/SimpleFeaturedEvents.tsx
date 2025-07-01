"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import events from '@/data/events';

export default function SimpleFeaturedEvents() {
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
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48 w-full">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{event.date}</p>
                <Link 
                  href={`/events/${event.id}`}
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import events from '@/data/events';
import { useSavedEvents } from '@/context/SavedEventsContext';
import ShareEvent from '@/components/ShareEvent';
import AddToCalendar from '@/components/AddToCalendar';
import { getDaysUntilEvent } from '@/utils/dateUtils';

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const id = params.id;
  const event = events.find(event => event.id === id);
  const { isEventSaved, toggleSavedEvent, isLoaded } = useSavedEvents();
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    if (isLoaded && event) {
      setIsSaved(isEventSaved(event.id));
    }
  }, [isLoaded, event, isEventSaved]);
  
  const handleSaveClick = () => {
    if (event) {
      toggleSavedEvent(event.id);
      setIsSaved(!isSaved);
    }
  };
  
  if (!event) {
    notFound();
  }
  
  // Calculate days until event
  const daysUntil = event.isoDate ? getDaysUntilEvent(event.isoDate) : null;
    return (
    <main className="bg-dark-bg-1">
      {/* Event Header Image */}
      <div className="relative h-[40vh] md:h-[70vh]">
        <Image 
          src={event.image} 
          alt={event.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex space-x-2 mb-4">
                  {event.categories && event.categories.slice(0, 3).map((category, index) => (
                    <span 
                      key={index} 
                      className="bg-accent-green/20 border border-accent-green/30 text-accent-green text-xs px-3 py-1 uppercase tracking-wider"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-white">
                  <div className="flex items-center glass-card-light px-3 py-1.5">
                    <svg className="w-5 h-5 mr-2 text-accent-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center glass-card-light px-3 py-1.5">
                    <svg className="w-5 h-5 mr-2 text-accent-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                    {event.time}
                  </div>
                  <div className="flex items-center glass-card-light px-3 py-1.5">
                    <svg className="w-5 h-5 mr-2 text-accent-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    {event.location}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleSaveClick}
                className="bg-black/50 backdrop-blur-lg p-3 rounded-full transition-all duration-300 hover:bg-black/70"
                aria-label={isSaved ? "Remove from saved" : "Save this event"}
              >
                {isSaved ? (
                  <svg className="w-6 h-6 text-accent-green" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                {daysUntil !== null && daysUntil > 0 && (
                  <div className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 px-4 py-3 rounded-lg mb-6 inline-block">
                    <p className="text-sm font-medium">
                      {daysUntil === 1 ? 'Tomorrow!' : `${daysUntil} days until this event`}
                    </p>
                  </div>
                )}
                
                {event.categories && event.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.categories.map((category, index) => (
                      <span 
                        key={index} 
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                
                <h2>About This Event</h2>
                <p>{event.description}</p>
                <p>
                  At La Foresta, we pride ourselves on curating unforgettable events that showcase
                  the very best in underground music. From large-scale festivals to immersive outdoor 
                  experiences, we have the experience and expertise to create truly unforgettable 
                  moments for our guests.
                </p>
                
                <h2>Featured Artists</h2>
                <ul>
                  {event.artists.map((artist, index) => (
                    <li key={index}>{artist}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg sticky top-8">
                <h3 className="text-xl font-bold mb-4">Event Details</h3>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Date & Time</h4>
                  <p className="text-gray-800 dark:text-white">{event.date}</p>
                  <p className="text-gray-800 dark:text-white">{event.time}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Location</h4>
                  <p className="text-gray-800 dark:text-white">{event.location}</p>
                </div>
                
                {event.tickets && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Price</h4>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{event.tickets.price}</p>
                  </div>
                )}
                
                <Link 
                  href={event.tickets?.link || '#'} 
                  className="block w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 text-center rounded-full transition-colors"
                >
                  Get Tickets
                </Link>
                
                <div className="mt-6 flex justify-between">
                  <ShareEvent eventId={event.id} eventTitle={event.title} />
                  <AddToCalendar event={event} />
                </div>
                
                <button 
                  onClick={handleSaveClick}
                  className={`block w-full mt-4 ${
                    isSaved 
                      ? 'bg-transparent border-2 border-green-500 text-green-600 dark:text-green-400' 
                      : 'bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-3 text-center rounded-full transition-colors`}
                >
                  {isSaved ? 'Saved to My Events' : 'Save to My Events'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Events */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You Might Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events
              .filter(e => e.id !== event.id)
              .slice(0, 3)
              .map(relatedEvent => (
                <div key={relatedEvent.id} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48">
                    <Image 
                      src={relatedEvent.image} 
                      alt={relatedEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{relatedEvent.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{relatedEvent.date}</p>
                    <Link 
                      href={`/events/${relatedEvent.id}`} 
                      className="text-green-600 dark:text-green-400 font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </main>
  );
}

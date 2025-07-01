"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import EventCardNew from './EventCardNew';
import { Event } from '@/data/events';

export default function UpcomingEventsSection() {
  const upcomingEvents: Event[] = [
    {
      id: "summer-fest-2025",
      title: "Summer Festival 2025",
      date: "July 15, 2025",
      time: "2:00 PM - 11:00 PM",
      location: "Central Park, New York",
      description: "Join us for the biggest underground electronic music festival of the summer.",
      image: "/images/event1.jpg",
      artists: ["DJ Harmony", "Echo Collective"],
      tickets: {
        price: "$59.99",
        link: "/tickets/summer-fest-2025"
      },
      featured: true,
      categories: ["Festival", "Electronic"],
      isoDate: "2025-07-15T14:00:00"
    },
    {
      id: "techno-night",
      title: "Techno Night Vol. 5",
      date: "August 3, 2025",
      time: "10:00 PM - 4:00 AM",
      location: "The Underground Club, Berlin",
      description: "Experience a night of cutting-edge techno music.",
      image: "/images/event2.jpg",
      artists: ["Mindscape", "Neural Pulse"],
      tickets: {
        price: "$30",
        link: "/tickets/techno-night"
      },
      categories: ["Techno", "Night"],
      isoDate: "2025-08-03T22:00:00"
    },
    {
      id: "jazz-lounge",
      title: "Jazz & Chill Lounge",
      date: "June 20, 2025",
      time: "8:00 PM - 1:00 AM",
      location: "Blue Note, New York",
      description: "A sophisticated evening of jazz and electronic fusion.",
      image: "/images/event3.jpg",
      artists: ["Melody Masters", "Jazz Collective"],
      tickets: {
        price: "$25",
        link: "/tickets/jazz-lounge"
      },
      categories: ["Jazz", "Lounge"],
      isoDate: "2025-06-20T20:00:00"
    },
    {
      id: "house-music-festival",
      title: "House Music Festival",
      date: "Sep 10, 2025",
      time: "3:00 PM - 12:00 AM",
      location: "Waterfront Park, Miami",
      description: "The ultimate house music festival experience.",
      image: "/images/event4.jpg",
      artists: ["House Heroes", "Deep Vibes"],
      tickets: {
        price: "$45",
        link: "/tickets/house-fest"
      },
      categories: ["House", "Festival"],
      isoDate: "2025-09-10T15:00:00"
    }
  ];
  
  return (    <section className="py-20 bg-black text-white relative">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <motion.span 
                className="block text-sm uppercase tracking-wider text-gray-400 mb-3"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                ROYAL COLLECTION
              </motion.span>
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                UPCOMING EVENTS
              </motion.h2>
              <div className="w-24 h-0.5 bg-white mb-6"></div>
              <p className="max-w-md text-gray-400 text-sm">
                Exclusive upcoming experiences curated for our community
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link 
                href="/events"
                className="mt-6 md:mt-0 inline-block px-6 py-3 border border-white text-white text-sm uppercase font-medium tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                VIEW ALL EVENTS
              </Link>
            </motion.div>
          </div>
        </motion.div>        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCardNew event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

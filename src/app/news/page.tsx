"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const newsItems = [
    {
      id: 'news1',
      title: 'LA FORESTA Announces New Resident DJs for Summer 2025',
      date: 'June 10, 2025',
      excerpt: "We're thrilled to welcome three new resident DJs to our summer lineup. Each brings a unique style that perfectly complements our musical vision.",
      image: '/images/event5.jpg',
      category: 'Announcements',
      readTime: '3 min read',
      featured: true
    },
    {
      id: 'news2',
      title: 'New Venue Announced for Our Signature Underground Series',
      date: 'June 5, 2025',
      excerpt: "After months of searching, we've found the perfect new home for our Underground Series events. The location will be revealed two days before each event.",
      image: '/images/event6.jpg',
      category: 'Events',
      readTime: '5 min read',
      featured: false
    },
    {
      id: 'news3',
      title: 'LA FORESTA Podcast Launches Next Month',
      date: 'May 28, 2025',
      excerpt: 'Our new monthly podcast will feature exclusive mixes from our resident DJs and special guests from around the globe.',
      image: '/images/event1.jpg',
      category: 'Media',
      readTime: '2 min read',
      featured: false
    },
    {
      id: 'news4',
      title: 'Summer Festival Lineup Revealed',
      date: 'May 15, 2025',
      excerpt: 'Our biggest event of the year is coming this summer with a stellar lineup of international talent across three stages.',
      image: '/images/event2.jpg',
      category: 'Events',
      readTime: '4 min read',
      featured: true
    },
    {
      id: 'news5',
      title: 'LA FORESTA Expands to New Cities in 2025',
      date: 'May 3, 2025',
      excerpt: 'After our success in Colombo, we\'re excited to announce expansion plans to three new cities across Southeast Asia.',
      image: '/images/event3.jpg',
      category: 'Announcements',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 'news6',
      title: 'Exclusive Merchandise Collection Drops This Week',
      date: 'April 28, 2025',
      excerpt: 'Our limited edition merchandise featuring designs by local artists will be available online and at our next event.',
      image: '/images/event4.jpg',
      category: 'Merchandise',
      readTime: '3 min read',
      featured: false
    }
  ];
  
  const categories = ['All', ...Array.from(new Set(newsItems.map(item => item.category)))];
  const filteredNews = selectedCategory === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);
  
  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Animated Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGridBackground />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-white">NEWS</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest announcements, event details, and happenings from La Foresta Events
            </p>
          </motion.div>
        </div>
      </div>

      {/* Modern Filter Bar */}
      <section className="py-8 bg-gray-900/20 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <span className="text-gray-400 text-sm mr-4">Filter by category:</span>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20 bg-gray-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-white">Latest</span>
              <span className="text-gray-500 ml-2">Updates</span>
            </h2>
            <div className="w-24 h-1 bg-white mb-8"></div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-sm text-white">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span>{item.date}</span>
                        <span>{item.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {item.excerpt}
                      </p>
                      
                      <Link 
                        href={`/news/${item.id}`}
                        className="inline-flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
                      >
                        <span className="text-sm font-semibold">READ MORE</span>
                        <motion.svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-white">Featured</span>
              <span className="text-gray-500 ml-2">Stories</span>
            </h2>
            <div className="w-24 h-1 bg-white mb-8"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredNews.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white text-black font-semibold rounded-full text-sm">
                        {item.category}
                      </span>
                    </div>
                    
                    {/* Read Time */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm text-white">
                        {item.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-400 text-sm mb-3">{item.date}</p>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm">{item.excerpt}</p>
                    
                    <Link 
                      href={`/news/${item.id}`}
                      className="inline-flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-300"
                    >
                      <span className="font-semibold text-sm">READ MORE</span>
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Stay In The Loop
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter and be the first to get the latest news, 
              event announcements, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-white focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

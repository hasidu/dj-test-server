"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { saveAs } from 'file-saver';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced gallery items with more metadata
  const galleryItems = [
    {
      id: 'gallery1',
      image: '/images/event1.jpg',
      title: 'SPECTRUM DJ RUBY BACK TO PARADISE',
      location: 'COLOMBO',
      date: '04 FEB 2025',
      category: 'Spectrum',
      year: '2025',
      tags: ['electronic', 'dj', 'paradise'],
      description: 'An unforgettable night with DJ Ruby featuring the best electronic beats'
    },
    {
      id: 'gallery2',
      image: '/images/event2.jpg',
      title: 'SPECTRUM DJ RUBY',
      location: 'COLOMBO',
      date: '21 JAN 2025',
      category: 'Spectrum',
      year: '2025',
      tags: ['electronic', 'dj', 'ruby'],
      description: 'Ruby\'s signature sound lighting up the dance floor'
    },
    {
      id: 'gallery3',
      image: '/images/event3.jpg',
      title: 'SOULFUL ARTIST LABEL SHOWCASE',
      location: 'COLOMBO',
      date: '15 DEC 2024',
      category: 'Label Showcase',
      year: '2024',
      tags: ['soulful', 'showcase', 'artist'],
      description: 'Showcasing the finest talents from our soulful artist label'
    },
    {
      id: 'gallery4',
      image: '/images/event4.jpg',
      title: 'SPECTRUM DJ INNA CATHERINES',
      location: 'COLOMBO',
      date: '05 NOV 2024',
      category: 'Spectrum',
      year: '2024',
      tags: ['spectrum', 'inna', 'catherines'],
      description: 'Inna Catherines delivers a mesmerizing spectrum of sounds'
    },
    {
      id: 'gallery5',
      image: '/images/event5.jpg',
      title: 'UNDERGROUND SESSIONS VOL.3',
      location: 'COLOMBO',
      date: '20 OCT 2024',
      category: 'Underground',
      year: '2024',
      tags: ['underground', 'sessions', 'vol3'],
      description: 'Deep underground vibes in our third volume series'
    },
    {
      id: 'gallery6',
      image: '/images/event6.jpg',
      title: 'FORESTA AMBIENT NIGHT',
      location: 'COLOMBO',
      date: '12 SEP 2024',
      category: 'Ambient',
      year: '2024',
      tags: ['ambient', 'foresta', 'night'],
      description: 'A serene ambient journey through forest soundscapes'
    },
    {
      id: 'gallery7',
      image: '/images/event1.jpg',
      title: 'TECHNO TUESDAY',
      location: 'COLOMBO',
      date: '30 AUG 2024',
      category: 'Techno',
      year: '2024',
      tags: ['techno', 'tuesday', 'beats'],
      description: 'Hard-hitting techno beats every Tuesday night'
    },
    {
      id: 'gallery8',
      image: '/images/event2.jpg',
      title: 'SUMMER CLOSING PARTY',
      location: 'COLOMBO',
      date: '15 AUG 2024',
      category: 'Party',
      year: '2024',
      tags: ['summer', 'closing', 'party'],
      description: 'The ultimate summer closing celebration'
    },
    // Add more items for demonstration
    {
      id: 'gallery9',
      image: '/images/event3.jpg',
      title: 'MIDNIGHT MYSTERIES',
      location: 'COLOMBO',
      date: '10 JUL 2024',
      category: 'Underground',
      year: '2024',
      tags: ['midnight', 'mysteries', 'dark'],
      description: 'Explore the mysteries of midnight electronic music'
    },
    {
      id: 'gallery10',
      image: '/images/event4.jpg',
      title: 'SUNRISE SESSIONS',
      location: 'COLOMBO',
      date: '25 JUN 2024',
      category: 'Ambient',
      year: '2024',
      tags: ['sunrise', 'sessions', 'morning'],
      description: 'Gentle morning vibes as the sun rises'
    },
    {
      id: 'gallery11',
      image: '/images/event5.jpg',
      title: 'BASS UNDERGROUND',
      location: 'COLOMBO',
      date: '18 MAY 2024',
      category: 'Underground',
      year: '2024',
      tags: ['bass', 'underground', 'heavy'],
      description: 'Deep bass lines in our underground venue'
    },
    {
      id: 'gallery12',
      image: '/images/event6.jpg',
      title: 'PROGRESSIVE NIGHTS',
      location: 'COLOMBO',
      date: '02 APR 2024',
      category: 'Progressive',
      year: '2024',
      tags: ['progressive', 'nights', 'journey'],
      description: 'A progressive journey through electronic landscapes'
    }
  ];

  const categories = ['All', ...Array.from(new Set(galleryItems.map(item => item.category)))];
  
  // Filter items based on category and search
  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const visibleFilteredItems = filteredItems.slice(0, visibleItems);

  // Prepare lightbox slides
  const lightboxSlides = filteredItems.map(item => ({
    src: item.image,
    alt: item.title,
    title: item.title,
    description: `${item.location} • ${item.date} • ${item.description}`
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.classList.add('image-viewer-open');
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.classList.remove('image-viewer-open');
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [lightboxOpen]);

  // Cleanup body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('image-viewer-open');
    };
  }, []);

  const loadMore = () => {
    setVisibleItems(prev => prev + 12);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Blur Overlay for Image Viewer */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-md"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9998
          }}
        ></div>
      )}

      {/* Animated Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGridBackground />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">GALLERY</span>
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-white mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Capturing the energy, the moments, and the magic of our electronic music journey
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <motion.input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-2xl px-6 py-4 pl-14 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <svg 
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisibleItems(12);
                  }}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                    selectedCategory === category
                      ? 'bg-white text-black border-white'
                      : 'bg-black/40 text-gray-300 border-gray-600 hover:border-gray-400 hover:bg-gray-800/50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Results Count */}
            <motion.p 
              className="text-center text-gray-400 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {filteredItems.length} {filteredItems.length === 1 ? 'image' : 'images'} found
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Masonry Gallery */}
      <section className="py-20 bg-gray-900/10">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              {visibleFilteredItems.map((item, index) => {
                const [ref, inView] = useInView({
                  threshold: 0.1,
                  triggerOnce: true
                });

                return (
                  <motion.div
                    key={item.id}
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="break-inside-avoid mb-6 group cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5">
                      <div className="relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={600}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Overlay Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {/* Top Actions */}
                          <div className="flex justify-between items-start">
                            <motion.div
                              className="bg-black/60 backdrop-blur-sm rounded-full p-3"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </motion.div>
                            
                            <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
                              {item.category}
                            </span>
                          </div>
                          
                          {/* Bottom Info */}
                          <div className="space-y-2">
                            <p className="text-gray-300 text-sm">{item.location} • {item.date}</p>
                            <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.tags.slice(0, 3).map((tag) => (
                                <span 
                                  key={tag}
                                  className="bg-gray-800/60 backdrop-blur-sm text-gray-300 px-2 py-1 rounded-full text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Load More Button */}
          {visibleItems < filteredItems.length && (
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={loadMore}
                className="bg-black/40 backdrop-blur-sm border-2 border-gray-600 text-white px-12 py-4 rounded-full font-semibold transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Images ({filteredItems.length - visibleItems} remaining)
              </motion.button>
            </motion.div>
          )}

          {/* No Results */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No images found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/20 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: galleryItems.length, label: 'Total Images' },
              { number: categories.length - 1, label: 'Categories' },
              { number: new Set(galleryItems.map(item => item.year)).size, label: 'Years Covered' },
              { number: new Set(galleryItems.map(item => item.location)).size, label: 'Locations' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <motion.h3 
                  className="text-4xl md:text-5xl font-bold text-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    delay: index * 0.1 + 0.3 
                  }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Image Viewer Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999
            }}
          >
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              {/* Close Button - Top Right */}
              <motion.button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-[10000] bg-black/90 backdrop-blur-xl text-white p-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-2xl border border-gray-700/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Navigation Buttons */}
              {filteredItems.length > 1 && (
                <>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(prev => prev === 0 ? filteredItems.length - 1 : prev - 1);
                    }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-[10000] bg-black/90 backdrop-blur-xl text-white p-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-2xl border border-gray-700/30"
                    whileHover={{ scale: 1.05, x: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(prev => prev === filteredItems.length - 1 ? 0 : prev + 1);
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-[10000] bg-black/90 backdrop-blur-xl text-white p-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-2xl border border-gray-700/30"
                    whileHover={{ scale: 1.05, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </>
              )}

              {/* Main Image Container with Zoom */}
              <div 
                className="relative flex items-center justify-center w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <TransformWrapper
                  initialScale={1}
                  minScale={0.3}
                  maxScale={3}
                  wheel={{ step: 0.1 }}
                  pinch={{ step: 5 }}
                  doubleClick={{ step: 0.7 }}
                  limitToBounds={false}
                  centerOnInit={true}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      {/* Elegant Tool Panel - Bottom Center */}
                      <motion.div 
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                      >
                        <div className="bg-black/90 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl px-2 py-2">
                          <div className="flex items-center space-x-1">
                            {/* Zoom Controls Group */}
                            <div className="flex items-center bg-gray-800/40 rounded-2xl p-1">
                              <motion.button
                                onClick={() => zoomOut()}
                                className="group relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Zoom Out"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                                </svg>
                              </motion.button>
                              
                              <motion.button
                                onClick={() => resetTransform()}
                                className="group relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Reset View"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              </motion.button>
                              
                              <motion.button
                                onClick={() => zoomIn()}
                                className="group relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Zoom In"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </motion.button>
                            </div>

                            {/* Separator */}
                            <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>

                            {/* Action Controls Group */}
                            <div className="flex items-center bg-gray-800/40 rounded-2xl p-1">
                              <motion.button
                                onClick={async () => {
                                  try {
                                    const response = await fetch(filteredItems[currentImageIndex].image);
                                    const blob = await response.blob();
                                    saveAs(blob, `${filteredItems[currentImageIndex].title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`);
                                  } catch (error) {
                                    console.error('Download failed:', error);
                                  }
                                }}
                                className="group relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Download Image"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </motion.button>

                              <motion.button
                                onClick={() => {
                                  if (navigator.share) {
                                    navigator.share({
                                      title: filteredItems[currentImageIndex].title,
                                      text: filteredItems[currentImageIndex].description,
                                      url: window.location.href
                                    });
                                  } else {
                                    navigator.clipboard.writeText(window.location.href);
                                  }
                                }}
                                className="group relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title="Share Image"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                              </motion.button>
                            </div>

                            {/* Separator */}
                            <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>

                            {/* Image Counter */}
                            <div className="px-4 py-2 text-sm text-gray-300 bg-gray-800/40 rounded-2xl font-medium">
                              <span className="text-white">{currentImageIndex + 1}</span>
                              <span className="text-gray-500 mx-1">/</span>
                              <span className="text-gray-400">{filteredItems.length}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Image Info Panel - Top Left */}
                      <motion.div 
                        className="absolute top-6 left-6 z-50 max-w-xs"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      >
                        <div className="bg-black/95 backdrop-blur-xl rounded-2xl border border-gray-700/30 shadow-2xl p-4">
                          <div className="space-y-2">
                            <div>
                              <h3 className="text-base font-bold text-white leading-tight">
                                {filteredItems[currentImageIndex]?.title}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1.5">
                                <div className="flex items-center text-xs text-gray-300">
                                  <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {filteredItems[currentImageIndex]?.location}
                                </div>
                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                <div className="flex items-center text-xs text-gray-300">
                                  <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {filteredItems[currentImageIndex]?.date}
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t border-gray-700/50 pt-2">
                              <p className="text-xs text-gray-400 leading-relaxed">
                                {filteredItems[currentImageIndex]?.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <span className="bg-white text-black px-2 py-1 rounded-full text-xs font-semibold">
                                {filteredItems[currentImageIndex]?.category}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {filteredItems[currentImageIndex]?.tags.slice(0, 2).map((tag) => (
                                  <span 
                                    key={tag}
                                    className="bg-gray-800/60 text-gray-300 px-1.5 py-0.5 rounded-full text-xs"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Transform Component for Image */}
                      <TransformComponent
                        wrapperClass="w-screen h-screen flex items-center justify-center"
                        contentClass="w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={filteredItems[currentImageIndex]?.image || ''}
                          alt={filteredItems[currentImageIndex]?.title || ''}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-auto h-auto max-w-[calc(100vw-120px)] max-h-[calc(100vh-160px)] object-contain rounded-lg shadow-2xl"
                          priority
                        />
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventFilter from '@/components/EventFilter';
import EventSorting from '@/components/EventSorting';
import SimpleEventCard from '@/components/SimpleEventCard';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';
import events from '@/data/events';
import { isUpcomingEvent, isEventToday, isPastEvent } from '@/utils/dateUtils';

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({});
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortOption, setSortOption] = useState('dateDesc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique locations and categories
  const locations = Array.from(new Set(events.map(event => event.location)));
  const allCategories: string[] = [];
  events.forEach(event => {
    event.categories?.forEach(category => {
      if (!allCategories.includes(category)) {
        allCategories.push(category);
      }
    });
  });
  const categories = allCategories.sort();

  // Handle search and filtering
  useEffect(() => {
    let result = events;
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(term) || 
        event.description.toLowerCase().includes(term) || 
        event.location.toLowerCase().includes(term) ||
        event.artists.some(artist => artist.toLowerCase().includes(term))
      );
    }
    
    // Apply location filters
    const activeLocationFilters = Object.entries(activeFilters)
      .filter(([, isActive]) => isActive)
      .map(([location]) => location);
      
    if (activeLocationFilters.length > 0) {
      result = result.filter(event => 
        activeLocationFilters.includes(event.location)
      );
    }
    
    // Apply date filters
    if (dateFilter !== 'all' && result.length > 0) {
      result = result.filter(event => {
        if (!event.isoDate) return true;
        
        switch (dateFilter) {
          case 'upcoming':
            return isUpcomingEvent(event.isoDate);
          case 'today':
            return isEventToday(event.isoDate);
          case 'past':
            return isPastEvent(event.isoDate);
          default:
            return true;
        }
      });
    }
    
    // Apply category filters
    if (selectedCategories.length > 0) {
      result = result.filter(event => 
        event.categories?.some(category => selectedCategories.includes(category))
      );
    }
    
    // Apply price range filter
    if (priceRange[0] > 0 || priceRange[1] < 100) {
      result = result.filter(event => {
        if (!event.tickets?.price) return true;
        const price = parseFloat(event.tickets.price.replace(/[^0-9.]/g, '') || '0');
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'dateAsc':
          return new Date(a.isoDate || '').getTime() - new Date(b.isoDate || '').getTime();
        case 'dateDesc':
          return new Date(b.isoDate || '').getTime() - new Date(a.isoDate || '').getTime();
        case 'priceAsc':
          const priceA = a.tickets?.price ? parseFloat(a.tickets.price.replace(/[^0-9.]/g, '') || '0') : 0;
          const priceB = b.tickets?.price ? parseFloat(b.tickets.price.replace(/[^0-9.]/g, '') || '0') : 0;
          return priceA - priceB;
        case 'priceDesc':
          const priceBDesc = b.tickets?.price ? parseFloat(b.tickets.price.replace(/[^0-9.]/g, '') || '0') : 0;
          const priceADesc = a.tickets?.price ? parseFloat(a.tickets.price.replace(/[^0-9.]/g, '') || '0') : 0;
          return priceBDesc - priceADesc;
        case 'titleAsc':
          return a.title.localeCompare(b.title);
        case 'titleDesc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    setFilteredEvents(result);
  }, [searchTerm, activeFilters, dateFilter, selectedCategories, priceRange, sortOption]);

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] bg-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <AnimatedGridBackground />
        </div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full opacity-40"
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100,
                delay: 0.2 
              }}
            >
              EVENTS
            </motion.h1>
          </motion.div>
          
          <motion.div
            className="h-px w-0 bg-white mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          />
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Immerse yourself in the underground electronic music scene with 
            </motion.span>
            <motion.span 
              className="text-white font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
            >
              {" "}La Foresta's
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              {" "}carefully curated events.
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              From intimate club nights to massive festivals.
            </motion.span>
          </motion.p>

          {/* Stats Bar */}
          <motion.div 
            className="flex justify-center space-x-8 md:space-x-16 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            {[
              { number: events.length, label: 'Total Events', delay: 0 },
              { number: events.filter(e => e.featured).length, label: 'Featured', delay: 0.1 },
              { number: locations.length, label: 'Locations', delay: 0.2 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 2.4 + stat.delay,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className={`text-3xl md:text-4xl font-bold ${
                    index === 0 ? 'text-white' : 
                    index === 1 ? 'text-gray-400' : 'text-gray-300'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 2.6 + stat.delay,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
          >
            <svg className="w-6 h-12 text-gray-400 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Filter Controls */}
      <section className="py-8 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full lg:w-auto">
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-6 py-3 bg-black border border-gray-600 rounded-lg hover:border-white hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </motion.svg>
                <span>Filters</span>
                <motion.span
                  animate={{ rotate: isFilterOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </motion.button>

              {/* Quick Search */}
              <motion.div 
                className="relative flex-1 max-w-md group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="relative search-glow">
                  {/* Animated background gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Search input */}
                  <motion.input
                    type="text"
                    placeholder="Search events, artists, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="relative w-full pl-6 pr-14 py-4 bg-black/90 backdrop-blur-enhanced border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-black/95 transition-all duration-300 group-hover:border-gray-500 group-hover:shadow-2xl group-hover:shadow-white/10"
                    whileFocus={{ 
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                  />
                  
                  {/* Search icon with enhanced effects */}
                  <motion.div 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none flex items-center justify-center w-6 h-6"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      {/* Icon background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-white/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 w-8 h-8 -m-1"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <svg className="relative w-5 h-5 text-gray-400 group-hover:text-white group-focus-within:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  {/* Active search indicator */}
                  <AnimatePresence>
                    {searchTerm && (
                      <motion.div
                        className="absolute left-2 bottom-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Search suggestions with animation */}
                <AnimatePresence>
                  {!searchTerm && (
                    <motion.div
                      className="absolute top-full mt-2 left-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -5, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      💡 Try: "techno", "berlin", "underground"
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className="text-sm text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Showing <motion.span 
                  className="text-white font-medium"
                  key={filteredEvents.length}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredEvents.length}
                </motion.span> of <span className="text-white">{events.length}</span> events
              </motion.div>
            </div>

            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <EventSorting onSortChange={setSortOption} currentSort={sortOption} />
            </motion.div>
          </motion.div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, scale: 0.95 }}
                animate={{ height: "auto", opacity: 1, scale: 1 }}
                exit={{ height: 0, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mt-6"
              >
                <motion.div 
                  className="bg-black border border-gray-700 rounded-lg p-6"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <EventFilter 
                    onSearch={setSearchTerm} 
                    onFilterChange={setActiveFilters}
                    onDateFilterChange={setDateFilter}
                    onCategoryFilterChange={setSelectedCategories}
                    onPriceRangeChange={setPriceRange}
                    locations={locations}
                    categories={categories}
                    dateFilter={dateFilter}
                    selectedCategories={selectedCategories}
                    events={events}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {filteredEvents.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.02,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                  }}
                  className="group"
                >
                  <SimpleEventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 mx-auto mb-8 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center"
                >
                  <motion.svg 
                    className="w-16 h-16 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </motion.svg>
                </motion.div>
              </div>
              
              <motion.h3 
                className="text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                No Events Found
              </motion.h3>
              <motion.p 
                className="text-gray-400 mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                We couldn&apos;t find any events matching your search criteria. 
                Try adjusting your filters or search terms.
              </motion.p>
              
              <motion.button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilters({});
                  setDateFilter('all');
                  setSelectedCategories([]);
                  setPriceRange([0, 100]);
                }}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
                <span>Clear All Filters</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom Stats Section */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2">
              <motion.div 
                className="text-4xl font-bold text-white"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              >
                {events.filter(e => isUpcomingEvent(e.isoDate || '')).length}
              </motion.div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Upcoming</div>
            </div>
            
            <div className="space-y-2">
              <motion.div 
                className="text-4xl font-bold text-gray-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              >
                {categories.length}
              </motion.div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Categories</div>
            </div>
            
            <div className="space-y-2">
              <motion.div 
                className="text-4xl font-bold text-gray-400"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
              >
                {events.filter(e => e.tickets?.price && parseFloat(e.tickets.price.replace(/[^0-9.]/g, '')) === 0).length}
              </motion.div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Free Events</div>
            </div>
            
            <div className="space-y-2">
              <motion.div 
                className="text-4xl font-bold text-white"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              >
                {Array.from(new Set(events.flatMap(e => e.artists))).length}
              </motion.div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Artists</div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

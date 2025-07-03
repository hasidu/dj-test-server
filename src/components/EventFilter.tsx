"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '@/data/events';

interface EventFilterProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: { [key: string]: boolean }) => void;
  onDateFilterChange: (filter: string) => void;
  onCategoryFilterChange: (categories: string[]) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  locations: string[];
  categories: string[];
  dateFilter: string;
  selectedCategories: string[];
  events: Event[];
}

export default function EventFilter({
  onSearch,
  onFilterChange,
  onDateFilterChange,
  onCategoryFilterChange,
  onPriceRangeChange,
  locations,
  categories,
  dateFilter,
  selectedCategories,
  events
}: EventFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLocationFilters, setActiveLocationFilters] = useState<{ [key: string]: boolean }>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleLocationToggle = (location: string) => {
    const newFilters = {
      ...activeLocationFilters,
      [location]: !activeLocationFilters[location]
    };
    setActiveLocationFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateFilterChange = (filter: string) => {
    onDateFilterChange(filter);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryFilterChange(newCategories);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const newRange: [number, number] = [min, max];
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveLocationFilters({});
    setPriceRange([0, 100]);
    onSearch('');
    onFilterChange({});
    onDateFilterChange('all');
    onCategoryFilterChange([]);
    onPriceRangeChange([0, 100]);
  };

  const dateFilters = [
    { key: 'all', label: 'All Events' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'today', label: 'Today' },
    { key: 'past', label: 'Past Events' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Date Filters */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Date
          </h3>
          <div className="space-y-3">
            {dateFilters.map((filter, index) => (
              <motion.button
                key={filter.key}
                onClick={() => handleDateFilterChange(filter.key)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  dateFilter === filter.key
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-black/40 text-gray-300 border-gray-600 hover:border-gray-400 hover:bg-gray-800/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{filter.label}</span>
                  {dateFilter === filter.key && (
                    <motion.svg
                      className="w-5 h-5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Location Filters */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Location
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
            {locations.map((location, index) => (
              <motion.button
                key={location}
                onClick={() => handleLocationToggle(location)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  activeLocationFilters[location]
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-black/40 text-gray-300 border-gray-600 hover:border-gray-400 hover:bg-gray-800/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.005,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.995 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate pr-2">{location}</span>
                  {activeLocationFilters[location] && (
                    <motion.svg
                      className="w-5 h-5 flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Categories
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  selectedCategories.includes(category)
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-black/40 text-gray-300 border-gray-600 hover:border-gray-400 hover:bg-gray-800/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.005,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.995 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium pr-2">{category}</span>
                  {selectedCategories.includes(category) && (
                    <motion.svg
                      className="w-5 h-5 flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Price Range
          </h3>
          <motion.div 
            className="space-y-4 p-4 bg-black/40 rounded-xl border border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              {/* Custom dual range slider */}
              <div className="relative h-8 flex items-center">
                {/* Track background */}
                <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
                
                {/* Active track */}
                <div 
                  className="absolute h-2 bg-white rounded-full"
                  style={{
                    left: `${priceRange[0]}%`,
                    width: `${priceRange[1] - priceRange[0]}%`
                  }}
                ></div>
                
                {/* Min slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), priceRange[1])}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb z-10"
                  style={{ background: 'transparent' }}
                />
                
                {/* Max slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(priceRange[0], parseInt(e.target.value))}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb z-10"
                  style={{ background: 'transparent' }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <motion.div 
                className="text-center bg-black/60 px-4 py-3 rounded-lg border border-gray-600"
                whileHover={{ scale: 1.05, borderColor: '#ffffff' }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-bold text-white">${priceRange[0]}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Min</div>
              </motion.div>
              
              <div className="flex-1 mx-4">
                <div className="h-px bg-gradient-to-r from-white via-gray-400 to-white"></div>
              </div>
              
              <motion.div 
                className="text-center bg-black/60 px-4 py-3 rounded-lg border border-gray-600"
                whileHover={{ scale: 1.05, borderColor: '#ffffff' }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-bold text-white">{priceRange[1] === 100 ? '$100+' : `$${priceRange[1]}`}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Max</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-center pt-6">
        <motion.button
          onClick={clearAllFilters}
          className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-black border-2 border-gray-600 text-white rounded-xl hover:border-white transition-all duration-300 font-medium"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
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
          <span className="group-hover:text-gray-200 transition-colors duration-300">Clear All Filters</span>
        </motion.button>
      </div>
    </div>
  );
}

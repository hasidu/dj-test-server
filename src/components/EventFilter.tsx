"use client";

import { useState, useEffect } from 'react';
import { Event } from '@/data/events';
import { isUpcomingEvent, isEventToday, isPastEvent } from '@/utils/dateUtils';
import PriceRangeFilter from './PriceRangeFilter';

interface EventFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: { [key: string]: boolean }) => void;
  onDateFilterChange: (dateFilter: string) => void;
  onCategoryFilterChange: (categories: string[]) => void;
  onPriceRangeChange?: (range: [number, number]) => void;
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
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventCounts, setEventCounts] = useState({
    upcoming: 0,
    today: 0,
    past: 0
  });
  
  // Calculate event counts by date
  useEffect(() => {
    const counts = {
      upcoming: 0,
      today: 0,
      past: 0
    };
    
    events.forEach(event => {
      if (event.isoDate) {
        if (isUpcomingEvent(event.isoDate)) counts.upcoming++;
        if (isEventToday(event.isoDate)) counts.today++;
        if (isPastEvent(event.isoDate)) counts.past++;
      }
    });
    
    setEventCounts(counts);
  }, [events]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  const handleFilterChange = (location: string) => {
    const newFilters = { 
      ...filters, 
      [location]: !filters[location] 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleDateFilterChange = (filter: string) => {
    onDateFilterChange(filter);
  };
  
  const handleCategoryChange = (category: string) => {
    let newCategories;
    
    if (selectedCategories.includes(category)) {
      newCategories = selectedCategories.filter(c => c !== category);
    } else {
      newCategories = [...selectedCategories, category];
    }
    
    onCategoryFilterChange(newCategories);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Events
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm dark:text-white"
            placeholder="Search by title, artist, or location"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Date</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleDateFilterChange('all')}
            className={`px-3 py-1 text-xs rounded-full ${
              dateFilter === 'all' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => handleDateFilterChange('upcoming')}
            className={`px-3 py-1 text-xs rounded-full ${
              dateFilter === 'upcoming' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Upcoming ({eventCounts.upcoming})
          </button>
          <button
            onClick={() => handleDateFilterChange('today')}
            className={`px-3 py-1 text-xs rounded-full ${
              dateFilter === 'today' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Today ({eventCounts.today})
          </button>
          <button
            onClick={() => handleDateFilterChange('past')}
            className={`px-3 py-1 text-xs rounded-full ${
              dateFilter === 'past' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Past Events ({eventCounts.past})
          </button>
        </div>      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 text-xs rounded-full ${
                selectedCategories.includes(category) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {onPriceRangeChange && (
        <PriceRangeFilter events={events} onPriceRangeChange={onPriceRangeChange} />
      )}
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Location</h3>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
          >
            {isExpanded ? 'Show Less' : 'Show All'}
          </button>
        </div>
        <div className={`space-y-2 ${isExpanded ? '' : 'max-h-32 overflow-y-auto'}`}>
          {locations.map((location) => (
            <div key={location} className="flex items-center">
              <input
                id={`location-${location}`}
                name={`location-${location}`}
                type="checkbox"
                checked={!!filters[location]}
                onChange={() => handleFilterChange(location)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor={`location-${location}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

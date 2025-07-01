"use client";

import { useState, useEffect } from 'react';
import { Event } from '@/data/events';

interface PriceRangeFilterProps {
  events: Event[];
  onPriceRangeChange: (range: [number, number]) => void;
}

export default function PriceRangeFilter({ events, onPriceRangeChange }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [currentMin, setCurrentMin] = useState(0);
  const [currentMax, setCurrentMax] = useState(100);

  // Calculate price range from events on component mount
  useEffect(() => {
    if (events.length > 0) {
      const prices = events
        .filter(event => event.tickets?.price)
        .map(event => parseFloat(event.tickets?.price.replace(/[^0-9.]/g, '') || '0'));
      
      if (prices.length > 0) {
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        
        setMinPrice(min);
        setMaxPrice(max);
        setCurrentMin(min);
        setCurrentMax(max);
      }
    }
  }, [events]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentMin(value);
    onPriceRangeChange([value, currentMax]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentMax(value);
    onPriceRangeChange([currentMin, value]);
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Price Range</h3>
      
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          ${currentMin}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          ${currentMax}
        </div>
      </div>
      
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div 
          className="absolute inset-y-0 left-0 right-0 flex items-center" 
          style={{ 
            left: `${((currentMin - minPrice) / (maxPrice - minPrice)) * 100}%`, 
            right: `${100 - ((currentMax - minPrice) / (maxPrice - minPrice)) * 100}%` 
          }}
        >
          <div className="h-1 w-full bg-green-500 rounded"></div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="minPrice" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Min Price
          </label>
          <input
            type="range"
            id="minPrice"
            min={minPrice}
            max={maxPrice}
            value={currentMin}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="maxPrice" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Max Price
          </label>
          <input
            type="range"
            id="maxPrice"
            min={minPrice}
            max={maxPrice}
            value={currentMax}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';

interface EventSortingProps {
  onSortChange: (option: string) => void;
  currentSort: string;
}

export default function EventSorting({ onSortChange, currentSort }: EventSortingProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'dateAsc', label: 'Date (Oldest First)' },
    { value: 'dateDesc', label: 'Date (Newest First)' },
    { value: 'priceAsc', label: 'Price (Low to High)' },
    { value: 'priceDesc', label: 'Price (High to Low)' },
    { value: 'titleAsc', label: 'Title (A-Z)' },
    { value: 'titleDesc', label: 'Title (Z-A)' }
  ];

  const currentOption = sortOptions.find(option => option.value === currentSort);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-3 bg-black border border-gray-600 rounded-lg text-white hover:border-white transition-all duration-300"
      >
        <span className="text-sm">Sort: {currentOption?.label || 'Date (Newest First)'}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-gray-600 rounded-lg shadow-lg z-50">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                currentSort === option.value
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

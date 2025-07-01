"use client";

import { useState } from 'react';

interface EventSortingProps {
  onSortChange: (option: string) => void;
  currentSort: string;
}

export default function EventSorting({ onSortChange, currentSort }: EventSortingProps) {
  const sortOptions = [
    { value: 'dateAsc', label: 'Date (Oldest First)' },
    { value: 'dateDesc', label: 'Date (Newest First)' },
    { value: 'priceAsc', label: 'Price (Low to High)' },
    { value: 'priceDesc', label: 'Price (High to Low)' },
    { value: 'titleAsc', label: 'Title (A-Z)' },
    { value: 'titleDesc', label: 'Title (Z-A)' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort Events</h3>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`px-3 py-1 text-xs rounded-full ${
              currentSort === option.value
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

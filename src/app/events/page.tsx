"use client";

import { useState, useEffect } from 'react';
import EventFilter from '@/components/EventFilter';
import EventSorting from '@/components/EventSorting';
import SimpleEventCard from '@/components/SimpleEventCard';
import PageHeader from '@/components/PageHeader';
import events from '@/data/events';
import { isUpcomingEvent, isEventToday, isPastEvent } from '@/utils/dateUtils';

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({});  const [dateFilter, setDateFilter] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortOption, setSortOption] = useState('dateDesc'); // Default sort by newest events first
  // Extract unique locations for filtering
  const locations = Array.from(new Set(events.map(event => event.location)));
  
  // Extract unique categories for filtering
  const allCategories: string[] = [];
  events.forEach(event => {
    event.categories?.forEach(category => {
      if (!allCategories.includes(category)) {
        allCategories.push(category);
      }
    });
  });
  
  // Sort categories alphabetically
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
      .filter(([_, isActive]) => isActive)
      .map(([location]) => location);
      
    if (activeLocationFilters.length > 0) {
      result = result.filter(event => 
        activeLocationFilters.includes(event.location)
      );
    }
    
    // Apply date filters
    if (dateFilter !== 'all' && result.length > 0) {
      result = result.filter(event => {
        if (!event.isoDate) return true; // Include events without dates
        
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
        const price = parseFloat(event.tickets.price.replace(/[^0-9.]/g, '') || '0');      return price >= priceRange[0] && price <= priceRange[1];
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
    return (    <main className="page-container">      <PageHeader 
        title="EVENTS" 
        description="La Foresta is an innovative and dynamic event company that is bringing the best underground artists from around the world to music lovers everywhere. Browse our upcoming events and join us for unforgettable experiences."
      />
      
      {/* Events Section */}
      <section className="py-16 bg-dark-bg-1">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with filters */}            <div className="lg:w-1/4">
              <div className="glass-card p-6 mb-6">
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
              </div>
              
              <div className="glass-card p-6 mb-6">
                <EventSorting onSortChange={setSortOption} currentSort={sortOption} />
              </div>
              
              <div className="glass-card p-6">
                <h3 className="font-medium text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Event Statistics
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                    <span className="text-gray-400">Total Events</span>
                    <span className="font-medium text-accent-green">{events.length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                    <span className="text-gray-400">Showing</span>
                    <span className="font-medium text-white">{filteredEvents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Featured Events</span>
                    <span className="font-medium text-accent-green">
                      {events.filter(e => e.featured).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Events Grid */}
            <div className="lg:w-3/4">              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredEvents.map(event => (
                    <SimpleEventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (                <div className="glass-card p-10 text-center">
                  <svg 
                    className="w-16 h-16 mx-auto text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-white">No events found</h3>
                  <p className="mt-2 text-gray-400">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event } from '@/data/events';

interface SavedEventsContextType {
  savedEventIds: string[];
  isEventSaved: (eventId: string) => boolean;
  toggleSavedEvent: (eventId: string) => void;
  getSavedEventCount: () => number;
  isLoaded: boolean;
}

const SavedEventsContext = createContext<SavedEventsContextType | undefined>(undefined);

export function SavedEventsProvider({ children }: { children: ReactNode }) {
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved events from localStorage on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('savedEvents');
    if (storedEvents) {
      try {
        setSavedEventIds(JSON.parse(storedEvents));
      } catch (error) {
        console.error('Error parsing saved events:', error);
        setSavedEventIds([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever savedEventIds changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('savedEvents', JSON.stringify(savedEventIds));
    }
  }, [savedEventIds, isLoaded]);

  // Check if an event is saved
  const isEventSaved = (eventId: string): boolean => {
    return savedEventIds.includes(eventId);
  };

  // Toggle saved status for an event
  const toggleSavedEvent = (eventId: string): void => {
    if (isEventSaved(eventId)) {
      // Remove from saved events
      setSavedEventIds(savedEventIds.filter(id => id !== eventId));
    } else {
      // Add to saved events
      setSavedEventIds([...savedEventIds, eventId]);
    }
  };

  // Get count of saved events
  const getSavedEventCount = (): number => {
    return savedEventIds.length;
  };

  return (
    <SavedEventsContext.Provider
      value={{
        savedEventIds,
        isEventSaved,
        toggleSavedEvent,
        getSavedEventCount,
        isLoaded
      }}
    >
      {children}
    </SavedEventsContext.Provider>
  );
}

export function useSavedEvents() {
  const context = useContext(SavedEventsContext);
  if (context === undefined) {
    throw new Error('useSavedEvents must be used within a SavedEventsProvider');
  }
  return context;
}

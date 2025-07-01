"use client";

import { useState, useEffect } from 'react';

// Define the saved events service
const useSavedEvents = () => {
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

  // Get all saved event IDs
  const getSavedEventIds = (): string[] => {
    return savedEventIds;
  };

  return {
    isEventSaved,
    toggleSavedEvent,
    getSavedEventIds,
    isLoaded
  };
};

export default useSavedEvents;

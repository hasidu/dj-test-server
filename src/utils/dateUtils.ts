/**
 * Date utility functions for event management
 */

import { Event } from '@/data/events';

/**
 * Formats an event's date and time for the "Add to Calendar" functionality
 */
export function formatCalendarTime(event: Event): {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  summary: string;
  description: string;
  location: string;
} {
  // Use the ISO date if available, otherwise parse from the date and time
  let startDate = event.isoDate ? new Date(event.isoDate) : parseEventDateTime(event.date, event.time.split(' - ')[0]);
  
  // For end time, use endDate/endTime if available, otherwise use the end time from the time range
  let endDate: Date;
  if (event.endDate && event.endTime) {
    endDate = parseEventDateTime(event.endDate, event.endTime);
  } else {
    const timeRange = event.time.split(' - ');
    if (timeRange.length > 1) {
      // If it ends after midnight and we don't have an explicit end date, add 1 day
      const startTimeHour = parseInt(timeRange[0].split(':')[0]);
      const endTimeHour = parseInt(timeRange[1].split(':')[0]);
      
      endDate = parseEventDateTime(
        endTimeHour < startTimeHour ? addDaysToDate(event.date, 1) : event.date, 
        timeRange[1]
      );
    } else {
      // Default to 2 hours after start if no end time is provided
      endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    }
  }
  
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    startTime: formatTime(startDate),
    endTime: formatTime(endDate),
    summary: event.title,
    description: `${event.description}\n\nArtists: ${event.artists.join(', ')}`,
    location: event.location
  };
}

/**
 * Parses a date string (e.g., "July 15, 2025") and time string (e.g., "2:00 PM") 
 * into a JavaScript Date object
 */
function parseEventDateTime(dateStr: string, timeStr: string): Date {
  const date = new Date(dateStr);
  
  // Parse time (e.g., "2:00 PM")
  const timeParts = timeStr.match(/(\d+):(\d+)\s*([AP]M)/i);
  if (timeParts) {
    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const isPM = timeParts[3].toUpperCase() === 'PM';
    
    // Convert to 24-hour format
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    
    date.setHours(hours, minutes, 0, 0);
  }
  
  return date;
}

/**
 * Adds days to a date string and returns a new date string
 */
function addDaysToDate(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Formats a Date object to YYYY-MM-DD format for calendar integration
 */
function formatDate(date: Date): string {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
}

/**
 * Formats a Date object to HH:MM:SS format for calendar integration
 */
function formatTime(date: Date): string {
  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}:00`;
}

/**
 * Pads a number with leading zero if needed
 */
function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Formats a date and time range for display
 */
export function formatDateRange(start: Date, end: Date): string {
  const isSameDay = start.toDateString() === end.toDateString();
  
  if (isSameDay) {
    return `${formatDateForDisplay(start)} · ${formatTimeForDisplay(start)} - ${formatTimeForDisplay(end)}`;
  } else {
    return `${formatDateForDisplay(start)} ${formatTimeForDisplay(start)} - ${formatDateForDisplay(end)} ${formatTimeForDisplay(end)}`;
  }
}

/**
 * Formats a date for display
 */
function formatDateForDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric'
  });
}

/**
 * Formats a time for display
 */
function formatTimeForDisplay(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

/**
 * Gets the number of days until an event
 */
export function getDaysUntilEvent(isoDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventDate = new Date(isoDate);
  eventDate.setHours(0, 0, 0, 0);
  
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Checks if an event is upcoming (future date)
 */
export function isUpcomingEvent(isoDate: string): boolean {
  return getDaysUntilEvent(isoDate) > 0;
}

/**
 * Checks if an event is happening today
 */
export function isEventToday(isoDate: string): boolean {
  return getDaysUntilEvent(isoDate) === 0;
}

/**
 * Checks if an event is in the past
 */
export function isPastEvent(isoDate: string): boolean {
  return getDaysUntilEvent(isoDate) < 0;
}

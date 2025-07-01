"use client";

import { useState } from 'react';
import { Event } from '@/data/events';
import { formatCalendarTime } from '@/utils/dateUtils';

interface AddToCalendarProps {
  event: Event;
}

export default function AddToCalendar({ event }: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    startDate,
    endDate,
    startTime,
    endTime,
    summary,
    description,
    location
  } = formatCalendarTime(event);
  
  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${startDate.replace(/-/g, '')}T${startTime.replace(/:/g, '')}/${endDate.replace(/-/g, '')}T${endTime.replace(/:/g, '')}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  
  // Outlook.com Calendar URL
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(summary)}&startdt=${startDate}T${startTime}&enddt=${endDate}T${endTime}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  
  // Yahoo Calendar URL
  const yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(summary)}&st=${startDate.replace(/-/g, '')}T${startTime.replace(/:/g, '')}&et=${endDate.replace(/-/g, '')}T${endTime.replace(/:/g, '')}&desc=${encodeURIComponent(description)}&in_loc=${encodeURIComponent(location)}`;
  
  // Apple Calendar (iCal) URL - actually downloads a .ics file
  const iCalUrl = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate.replace(/-/g, '')}T${startTime.replace(/:/g, '')}
DTEND:${endDate.replace(/-/g, '')}T${endTime.replace(/:/g, '')}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
        aria-label="Add to calendar"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
        </svg>
        Add to Calendar
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 w-64 right-0">
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Add to your calendar</h3>
            
            <a 
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 8.5V5.69c0-1.93-1.57-3.5-3.5-3.5H5.5C3.57 2.19 2 3.76 2 5.69V18.5c0 1.93 1.57 3.5 3.5 3.5H18c1.93 0 3.5-1.57 3.5-3.5v-10zM5.5 4.19h12.5c.83 0 1.5.67 1.5 1.5v.9l-7.74 5.05L4 6.59V5.69c0-.83.67-1.5 1.5-1.5zM18 20H5.5c-.83 0-1.5-.67-1.5-1.5v-8.94l7.01 4.56c.31.2.69.2 1 0l7.49-4.88V18.5c0 .83-.67 1.5-1.5 1.5z"></path>
              </svg>
              Google Calendar
            </a>
            
            <a 
              href={outlookCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              <svg className="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.61 6.34c1.07 0 1.93.86 1.93 1.93 0 1.07-.86 1.93-1.93 1.93-.54 0-1.02-.22-1.38-.57L10 13.13v.74c0 1.85-1.5 3.35-3.35 3.35-1.85 0-3.35-1.5-3.35-3.35s1.5-3.35 3.35-3.35c1.36 0 2.5.81 3.02 1.95l2.19-1.83c-.01-.1-.01-.2-.01-.3 0-1.07.86-1.93 1.93-1.93z"></path>
              </svg>
              Outlook Calendar
            </a>
            
            <a 
              href={yahooCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              <svg className="w-5 h-5 mr-3 text-purple-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.43 18.02h2.11L12 9.65l-3.54 8.37h2.11l1.43-3.93l1.43 3.93zM22 6v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2z"></path>
              </svg>
              Yahoo Calendar
            </a>
            
            <a 
              href={iCalUrl}
              download={`${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              <svg className="w-5 h-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"></path>
                <path d="M7 10h5v5H7z"></path>
              </svg>
              Apple Calendar (iCal)
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

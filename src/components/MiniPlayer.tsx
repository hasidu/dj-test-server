"use client";

import { useState, useEffect } from 'react';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import AudioWave from './AudioWave';
import Link from 'next/link';

export default function MiniPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    progress, 
    duration,
    volume,
    setVolume,
    seekTo
  } = useGlobalAudio();
  
  const [showPlayer, setShowPlayer] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  
  // Format time in mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    setShowPlayer(!!currentTrack);
  }, [currentTrack]);
  
  if (!showPlayer) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a] border-t border-[#222] shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-3 w-1/3">
          {currentTrack?.coverArt && (
            <div className="w-10 h-10 relative overflow-hidden">
              <img 
                src={currentTrack.coverArt} 
                alt={currentTrack.title} 
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <div className="truncate">
            <div className="text-sm font-medium truncate">{currentTrack?.title}</div>
            <div className="text-xs text-gray-400 truncate">{currentTrack?.artist}</div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col items-center justify-center w-1/3">
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-400 hover:text-[#a3ff12] transition-colors"
              aria-label="Previous track"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button 
              onClick={togglePlayPause}
              className="bg-[#151515] hover:bg-[#222] text-[#a3ff12] rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              )}
            </button>
            
            <button 
              className="text-gray-400 hover:text-[#a3ff12] transition-colors"
              aria-label="Next track"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex items-center w-full mt-1 px-2 space-x-2">
            <span className="text-xs text-gray-400 w-8 text-right">{formatTime(progress)}</span>
            
            <div className="relative flex-1 h-1 bg-gray-700 rounded cursor-pointer group">
              <div 
                className="absolute top-0 left-0 h-full bg-[#a3ff12] rounded"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
              <input 
                type="range" 
                min="0" 
                max={duration || 0} 
                value={progress} 
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                step="0.01"
              />
            </div>
            
            <span className="text-xs text-gray-400 w-8">{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Additional Controls */}
        <div className="flex items-center justify-end space-x-4 w-1/3">
          <div className="relative">
            <button 
              className="text-gray-400 hover:text-[#a3ff12] transition-colors"
              onClick={() => setShowVolume(!showVolume)}
              aria-label="Volume control"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {volume === 0 ? (
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                ) : volume < 0.5 ? (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                ) : (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                )}
              </svg>
            </button>
            
            {showVolume && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-24 p-2 bg-[#151515] rounded shadow-lg border border-[#333]">
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume} 
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>
          
          <AudioWave 
            isPlaying={isPlaying} 
            color="#a3ff12" 
            height={20} 
            barCount={10}
          />
          
          <Link href="/recordings" className="text-xs text-[#a3ff12] hover:underline">
            View all tracks
          </Link>
        </div>
      </div>
    </div>
  );
}

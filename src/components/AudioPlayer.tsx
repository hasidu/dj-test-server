"use client";

import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReady?: (duration: number) => void;
  onPositionChange?: (position: number) => void;
  waveColor?: string;
  progressColor?: string;
  height?: number;
  audioElement?: HTMLAudioElement | null;
  showTimeline?: boolean; 
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isPlaying,
  onPlayPause,
  onReady,
  onPositionChange,
  waveColor = 'rgba(255, 255, 255, 0.2)',
  progressColor = '#1DB954',
  height = 40,
  audioElement,
  showTimeline = true
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef(0);
  
  // Initialize player
  useEffect(() => {
    if (!audioElement) return;
    
    const handleDurationChange = () => {
      if (!audioElement) return;
      
      setLoading(false);
      const duration = audioElement.duration;
      setTrackDuration(duration);
      
      if (onReady) {
        onReady(duration);
      }
    };
    
    // Call it immediately if duration is already available
    if (audioElement.duration && audioElement.duration > 0) {
      handleDurationChange();
    }
    
    audioElement.addEventListener('durationchange', handleDurationChange);
    audioElement.addEventListener('loadedmetadata', handleDurationChange);
    
    return () => {
      audioElement.removeEventListener('durationchange', handleDurationChange);
      audioElement.removeEventListener('loadedmetadata', handleDurationChange);
    };
  }, [audioElement, onReady]);
  
  // Sync with external audio element - optimized for performance
  useEffect(() => {
    if (!audioElement) return;
    
    // Use requestAnimationFrame for smoother updates with throttling
    const updatePosition = () => {
      try {
        // Throttle updates to reduce CPU usage (update every ~100ms)
        const now = performance.now();
        if (now - lastUpdateTimeRef.current < 100) {
          animationFrameIdRef.current = requestAnimationFrame(updatePosition);
          return;
        }
        
        lastUpdateTimeRef.current = now;
        const currentTime = audioElement.currentTime;
        setCurrentPosition(currentTime);
        
        // Continue the animation frame loop
        animationFrameIdRef.current = requestAnimationFrame(updatePosition);
      } catch (error) {
        console.error("Error updating position:", error);
      }
    };
    
    // Start animation frame loop
    animationFrameIdRef.current = requestAnimationFrame(updatePosition);
    
    // Listen to seeking events for direct user interaction
    const handleSeek = () => {
      const currentTime = audioElement.currentTime;
      setCurrentPosition(currentTime);
    };
    
    audioElement.addEventListener('seeking', handleSeek);
    audioElement.addEventListener('seeked', handleSeek);
    
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      audioElement.removeEventListener('seeking', handleSeek);
      audioElement.removeEventListener('seeked', handleSeek);
    };
  }, [audioElement]);
    // Format time for display
  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle timeline click for seeking
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioElement || !trackDuration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    
    if (clickPosition < 0 || clickPosition > 1) return;
    
    const newTime = clickPosition * trackDuration;
    
    // Update positions
    audioElement.currentTime = newTime;
    setCurrentPosition(newTime);
    
    if (onPositionChange) {
      onPositionChange(newTime);
    }
  };
  
  // Create simple timeline markers
  const renderTimeMarkers = () => {
    if (!trackDuration) return null;
    
    // Use fewer markers to improve performance
    const markerCount = 6; // Reduced number of markers for better performance
    
    return Array.from({ length: markerCount }).map((_, index) => {
      const position = ((index + 1) / (markerCount + 1)) * 100;
      
      return (
        <div 
          key={index}
          className="absolute bottom-0 will-change-transform"
          style={{ 
            left: `${position}%`, 
            transform: 'translateX(-50%) translateZ(0)'
          }}
        >
          <div className="h-1 w-[1px] bg-gray-500 opacity-50"></div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col">
      {/* Timeline (always visible) - simplified version */}
      {trackDuration > 0 && (
        <div>
          {/* Timeline track */}
          <div 
            ref={timelineRef}
            className="relative w-full h-8 bg-gray-900 bg-opacity-30 rounded-lg overflow-hidden cursor-pointer backdrop-blur-sm"
            onClick={handleTimelineClick}
          >
            {/* Progress bar background */}
            <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
            
            {/* Progress fill */}
            <div 
              className="absolute top-0 left-0 h-full"
              style={{ 
                width: `${(currentPosition / trackDuration) * 100}%`,
                backgroundColor: progressColor
              }}
            ></div>
            
            {/* Position marker */}
            <div 
              className="absolute top-1/2"
              style={{ 
                left: `${(currentPosition / trackDuration) * 100}%`,
                transform: 'translateX(-50%) translateY(-50%)',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: `0 0 5px rgba(29, 185, 84, 0.5)`
              }}
            ></div>
            
            {/* Time markers */}
            {renderTimeMarkers()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;

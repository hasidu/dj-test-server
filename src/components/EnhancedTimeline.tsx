"use client";

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioWaveformProps {
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

const EnhancedTimeline: React.FC<AudioWaveformProps> = ({
  audioUrl,
  isPlaying,
  onPlayPause,
  onReady,
  onPositionChange,
  progressColor = '#1DB954',
  audioElement,
  showTimeline = false
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  
  // Initialize waveform for audio processing only (not visible)
  useEffect(() => {
    if (!waveformRef.current) return;
    
    // Cleanup previous instance
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }
    
    // Create a hidden WaveSurfer instance just for audio processing
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'transparent',
      progressColor: 'transparent',
      height: 0, // Hidden
      cursorWidth: 0,
      // @ts-ignore
      responsive: true,
      fillParent: true,
      backend: 'MediaElement',
      mediaControls: false,
      autoplay: false,
      // Ensure silence
      volume: 0,
    });
    
    wavesurferRef.current = wavesurfer;
    
    // Load audio file silently
    wavesurfer.load(audioUrl);
    
    // Force silence
    wavesurfer.setVolume(0);
    
    // When ready, get duration
    wavesurfer.once('ready', () => {
      const duration = wavesurfer.getDuration();
      setTrackDuration(duration);
      
      if (onReady) {
        onReady(duration);
      }
      
      // Silence the media element
      try {
        // @ts-ignore
        if (wavesurfer.backend && wavesurfer.backend.media) {
          // @ts-ignore
          const mediaElement = wavesurfer.backend.media;
          mediaElement.muted = true;
          mediaElement.volume = 0;
        }
      } catch (error) {
        console.error("Error silencing media element:", error);
      }
    });
    
    // Cleanup
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioUrl, onReady]);
  
  // Sync with external audio element
  useEffect(() => {
    if (!audioElement) return;
    
    const updatePosition = () => {
      setCurrentPosition(audioElement.currentTime);
      
      // Keep wavesurfer in sync for potential seek operations
      if (wavesurferRef.current) {
        const waveCurrentTime = wavesurferRef.current.getCurrentTime() || 0;
        if (Math.abs(audioElement.currentTime - waveCurrentTime) > 0.2) {
          const audioDuration = audioElement.duration || 1;
          const normalizedPosition = audioElement.currentTime / audioDuration;
          if (normalizedPosition >= 0 && normalizedPosition <= 1) {
            wavesurferRef.current.seekTo(normalizedPosition);
          }
        }
      }
    };
    
    audioElement.addEventListener('timeupdate', updatePosition);
    audioElement.addEventListener('seeking', updatePosition);
    audioElement.addEventListener('seeked', updatePosition);
    
    // Initial sync
    updatePosition();
    
    return () => {
      audioElement.removeEventListener('timeupdate', updatePosition);
      audioElement.removeEventListener('seeking', updatePosition);
      audioElement.removeEventListener('seeked', updatePosition);
    };
  }, [audioElement]);
  
  // Format time for display
  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Create timeline markers
  const renderTimeMarkers = () => {
    if (!trackDuration) return null;
    
    const totalDuration = trackDuration;
    // Calculate appropriate interval based on track length
    const intervalSeconds = totalDuration > 600 ? 120 : // 2 mins for long tracks (>10 mins)
                           totalDuration > 300 ? 60 :   // 1 min for medium tracks (>5 mins)
                           totalDuration > 120 ? 30 :   // 30 sec for shorter tracks (>2 mins)
                           15;                          // 15 sec for very short tracks

    const markers = [];
    
    for (let i = 0; i <= totalDuration; i += intervalSeconds) {
      const formattedTime = formatTime(i);
      const position = (i / totalDuration) * 100;
      
      markers.push(
        <div 
          key={i}
          className="absolute bottom-0 transform -translate-x-1/2 text-xs text-gray-300"
          style={{ left: `${position}%` }}
        >
          <div className="h-1.5 w-0.5 bg-gray-600 mx-auto mb-1.5"></div>
          {formattedTime}
        </div>
      );
    }
    
    return markers;
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
    
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(clickPosition);
    }
    
    if (onPositionChange) {
      onPositionChange(newTime);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hidden waveform container for audio processing */}
      <div ref={waveformRef} className="hidden" />
      
      {/* Enhanced timeline */}
      {showTimeline && trackDuration > 0 && (
        <div className="mt-2">
          {/* Current time / Duration display - positioned above timeline */}
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(currentPosition)}</span>
            <span>{formatTime(trackDuration)}</span>
          </div>
          
          {/* Timeline track */}
          <div 
            className="relative w-full h-8 bg-gray-900 bg-opacity-60 rounded-md overflow-hidden cursor-pointer"
            onClick={handleTimelineClick}
          >
            {/* Progress bar background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-40"></div>
            
            {/* Timeline line */}
            <div className="absolute left-0 right-0 h-px bg-gray-700 top-1/2 transform -translate-y-1/2"></div>
            
            {/* Progress fill with gradient */}
            <div 
              className="absolute top-0 left-0 h-full transition-all duration-75 ease-out"
              style={{ 
                width: `${(currentPosition / trackDuration) * 100}%`,
                background: `linear-gradient(to right, ${progressColor}80, ${progressColor})` 
              }}
            ></div>
            
            {/* Position marker */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg"
              style={{ 
                left: `${(currentPosition / trackDuration) * 100}%`,
                transform: 'translateX(-50%) translateY(-50%)',
                boxShadow: `0 0 5px ${progressColor}, 0 0 10px rgba(29, 185, 84, 0.5)`
              }}
            >
              <div className="absolute inset-0.5 rounded-full bg-[#1DB954]"></div>
            </div>
            
            {/* Time markers */}
            {renderTimeMarkers()}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTimeline;

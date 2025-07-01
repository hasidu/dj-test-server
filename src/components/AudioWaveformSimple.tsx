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

const AudioWaveformSimple: React.FC<AudioWaveformProps> = ({
  audioUrl,
  isPlaying,
  onPlayPause,
  onReady,
  onPositionChange,
  waveColor = 'rgba(255, 255, 255, 0.3)',
  progressColor = '#1DB954',
  height = 40,
  audioElement,
  showTimeline = false
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [loading, setLoading] = useState(true);
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  
  // Initialize waveform
  useEffect(() => {
    if (!waveformRef.current) return;
    
    // Cleanup previous instance
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }
    
    // Create a WaveSurfer instance
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: waveColor,
      progressColor: progressColor,
      height: height,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      cursorWidth: 0,
      normalize: true,
      // @ts-ignore - responsive is a valid WaveSurfer option in some versions
      responsive: true,
      fillParent: true,
      backend: 'MediaElement',
      mediaControls: false,
      autoplay: false,
      // Ensure silence
      volume: 0,
    });
    
    wavesurferRef.current = wavesurfer;
    
    // Load audio file for visualization only
    wavesurfer.load(audioUrl);
    
    // Force silence
    wavesurfer.setVolume(0);
    
    // When ready, get duration
    wavesurfer.once('ready', () => {
      setLoading(false);
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
      // Handle seek events
    // @ts-ignore - 'seek' event exists in WaveSurfer
    wavesurfer.on('seek', () => {
      if (!audioElement) return;
      
      try {
        const newTime = wavesurfer.getCurrentTime();
        
        // Update the global audio element position
        if (audioElement && !isNaN(newTime)) {
          audioElement.currentTime = newTime;
          
          if (onPositionChange) {
            onPositionChange(newTime);
          }
        }
      } catch (error) {
        console.error("Error during seek operation:", error);
      }
    });
    
    // Cleanup
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audioUrl, waveColor, progressColor, height, onReady]);
  
  // Sync with external audio element
  useEffect(() => {
    if (!audioElement || !wavesurferRef.current) return;
    
    const updatePosition = () => {
      try {
        if (!wavesurferRef.current) return;
        
        const currentTime = audioElement.currentTime;
        setCurrentPosition(currentTime);
        
        // Update waveform position if difference is significant
        const waveCurrentTime = wavesurferRef.current.getCurrentTime() || 0;
        if (Math.abs(currentTime - waveCurrentTime) > 0.2) {
          const audioDuration = audioElement.duration || 1;
          const normalizedPosition = currentTime / audioDuration;
          if (normalizedPosition >= 0 && normalizedPosition <= 1) {
            wavesurferRef.current.seekTo(normalizedPosition);
          }
        }
      } catch (error) {
        console.error("Error updating position:", error);
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
  
  // Control playback state
  useEffect(() => {
    if (!wavesurferRef.current) return;
    
    try {
      if (isPlaying) {
        wavesurferRef.current.setVolume(0);
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    } catch (error) {
      console.error("Error controlling waveform:", error);
    }
  }, [isPlaying]);
  
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
    
    const totalDuration = trackDuration || 0;
    const intervalSeconds = totalDuration > 300 ? 60 : totalDuration > 120 ? 30 : 15;
    const markers = [];
    
    for (let i = 0; i <= totalDuration; i += intervalSeconds) {
      const formattedTime = formatTime(i);
      const position = (i / totalDuration) * 100;
      
      markers.push(
        <div 
          key={i}
          className="absolute top-full mt-1 transform -translate-x-1/2 text-xs text-white"
          style={{ left: `${position}%` }}
        >
          <div className="h-2 w-0.5 bg-gray-500 mx-auto mb-1"></div>
          {formattedTime}
        </div>
      );
    }
    
    return markers;
  };
  
  // Handle timeline click
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
      {/* Waveform */}
      <div 
        ref={waveformRef}
        className={`w-full h-${height}px ${loading ? 'opacity-50' : 'opacity-100'}`}
      />
      
      {/* Timeline (only when showTimeline is true) */}
      {showTimeline && trackDuration > 0 && (
        <div className="mt-4 relative">
          {/* Timeline track */}
          <div 
            className="relative w-full h-6 bg-gray-800 rounded cursor-pointer"
            onClick={handleTimelineClick}
          >
            {/* Progress track */}
            <div className="absolute top-2 left-0 w-full h-2 bg-gray-700 rounded-full">
              {/* Progress fill */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#1DB954] rounded-full" 
                style={{ width: `${(currentPosition / trackDuration) * 100}%` }}
              />
              
              {/* Position handle */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#1DB954]"
                style={{ 
                  left: `${(currentPosition / trackDuration) * 100}%`,
                  transform: 'translateX(-50%) translateY(-50%)' 
                }}
              />
            </div>
            
            {/* Time markers */}
            {renderTimeMarkers()}
          </div>
          
          {/* Current time / Duration display */}
          <div className="flex justify-between text-xs mt-6 text-gray-400">
            <span>{formatTime(currentPosition)}</span>
            <span>{formatTime(trackDuration)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioWaveformSimple;

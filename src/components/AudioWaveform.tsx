"use client";

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

// WaveSurfer may have changed its plugin structure in version 7.x
// Let's use a dynamic import approach for the Timeline plugin

interface AudioWaveformProps {
  audioUrl: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReady?: (duration: number) => void;
  onPositionChange?: (position: number) => void;
  waveColor?: string;
  progressColor?: string;
  height?: number;
  barWidth?: number;
  barGap?: number;
  audioElement?: HTMLAudioElement | null;
  showTimeline?: boolean; // New prop to toggle timeline visibility
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({
  audioUrl,
  isPlaying,
  onPlayPause,
  onReady,
  onPositionChange,
  waveColor = 'rgba(255, 255, 255, 0.3)',
  progressColor = '#1DB954',
  height = 40,
  barWidth = 2,
  barGap = 1,
  audioElement,
  showTimeline = false // Default to false for backward compatibility
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null); // New ref for timeline container
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [loading, setLoading] = useState(true);
  // Initialize WaveSurfer
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up previous instance
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }    // Create a completely silent audio element
    const silentAudio = document.createElement('audio');
    silentAudio.muted = true;
    silentAudio.volume = 0;
    silentAudio.setAttribute('data-waveform-visual-only', 'true');
    
    // Ensure it can never produce sound
    Object.defineProperty(silentAudio, 'volume', {
      writable: true,
      value: 0
    });
    
    Object.defineProperty(silentAudio, 'muted', {
      writable: true,
      value: true
    });
    
    // Prevent autoplay    silentAudio.autoplay = false;
    
    // Override play method to prevent actual audio playback
    const originalPlay = silentAudio.play;
    silentAudio.play = function() {
      return Promise.resolve();
    };
    
    // Create WaveSurfer instance with this silent audio element
    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: waveColor,
      progressColor: progressColor,
      height: height,
      barWidth: barWidth,
      barGap: barGap,
      barRadius: 2,
      cursorWidth: 0,
      normalize: true,
      // @ts-ignore
      responsive: true,
      fillParent: true,
      // Using MediaElement backend with our silent audio element
      backend: 'MediaElement',
      media: silentAudio,
      mediaControls: false,
      autoplay: false,
      // Ensure no interference with global volume
      volume: 0,      // In WaveSurfer 7.x, we need a different approach for plugins
      plugins: []
    });

    wavesurferRef.current = wavesurfer;

    // Load audio file - for visualization only    wavesurfer.load(audioUrl);
    
    // Hack: Try to disconnect any audio nodes that might have been created
    setTimeout(() => {
      try {
        // @ts-ignore - Access backend audio context if available
        if (wavesurfer.backend && wavesurfer.backend.ac) {
          // @ts-ignore - Try to disconnect all nodes
          const context = wavesurfer.backend.ac;
          
          // If context has a destination, try to disconnect everything from it
          if (context.destination) {
            try {
              // Create a dummy node and connect/disconnect it to force isolation
              const oscillator = context.createOscillator();
              const gainNode = context.createGain();
              gainNode.gain.value = 0; // Ensure silence
              oscillator.connect(gainNode);
              // Don't connect to destination
              oscillator.start();
              oscillator.stop(0.1);
            } catch (err) {
              console.error("Error manipulating audio context:", err);
            }
          }
        }
      } catch (error) {
        console.error("Error accessing audio context:", error);
      }
    }, 500);
          // Force silence the MediaElement completely - CRITICAL FIX
    wavesurfer.once('ready', () => {
      try {
        // @ts-ignore - Access the backend media element and silence it
        if (wavesurfer.backend && wavesurfer.backend.media) {
          // @ts-ignore
          const mediaElement = wavesurfer.backend.media;
          
          // Apply multiple methods to ensure silence
          mediaElement.muted = true;
          mediaElement.volume = 0;
          
          // Prevent the volume from being changed
          Object.defineProperty(mediaElement, 'volume', {
            writable: true,
            value: 0
          });
          
          // Prevent the muted state from being changed
          Object.defineProperty(mediaElement, 'muted', {
            writable: true,
            value: true
          });
          
          // Prevent any automatic playback
          mediaElement.autoplay = false;
          
          // Override the play method
          const originalPlay = mediaElement.play;
          mediaElement.play = function() {
            // Do nothing with audio but allow the promise to resolve
            return Promise.resolve();
          };
          
          // Override the onplay handler
          mediaElement.onplay = (e: Event) => {
            e.preventDefault();
            // Don't actually call pause as it may interfere with visualization
            return false;
          };
          
          // Also set these attributes
          mediaElement.setAttribute('muted', 'muted');
          mediaElement.setAttribute('volume', '0');
        }
        
        // Also set wavesurfer volume to zero
        wavesurfer.setVolume(0);
      } catch (error) {
        console.error("Error disabling WaveSurfer audio:", error);
      }
      
      setLoading(false);
      
      // Get and set the duration for our timeline and pass it to the parent component
      const duration = wavesurfer.getDuration();
      setTrackDuration(duration);
      
      if (onReady) {
        onReady(duration);
      }
    });// Handle seek events from user interaction with waveform
    // @ts-ignore - WaveSurfer types might not include all events
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
        
        // Only call onPlayPause if the audio was already playing
        // to avoid unexpected auto-playing when seeking
        if (isPlaying) {
          onPlayPause();
        }
      } catch (error) {
        console.error("Error during seek operation:", error);
      }
    });
      // Cleanup
    return () => {
      if (wavesurferRef.current) {
        try {
          // Explicitly remove event listeners first
          // @ts-ignore
          wavesurferRef.current.un('seek');
          wavesurferRef.current.destroy();
          wavesurferRef.current = null;
        } catch (error) {
          console.error("Error cleaning up WaveSurfer:", error);
        }
      }
    };
  }, [audioUrl]);
  // Update waveform position based on external audio element's position
  useEffect(() => {
    if (!audioElement || !wavesurferRef.current) return;
    
    const updatePosition = () => {
      try {
        if (!wavesurferRef.current) return;
        
        const waveCurrentTime = wavesurferRef.current.getCurrentTime() || 0;
        const audioDuration = audioElement.duration || 1;
        
        // Only update if the difference is significant to avoid constant updates
        if (Math.abs(audioElement.currentTime - waveCurrentTime) > 0.2) {
          // Use seekTo which takes a normalized position (0-1)
          const normalizedPosition = audioElement.currentTime / audioDuration;
          if (normalizedPosition >= 0 && normalizedPosition <= 1) {
            wavesurferRef.current.seekTo(normalizedPosition);
          }
        }
      } catch (error) {
        console.error("Error updating waveform position:", error);
      }
    };
    
    // Listen to timeupdate event from the global audio element
    audioElement.addEventListener('timeupdate', updatePosition);
    
    // Also listen to seeking and seeked to catch manual changes
    audioElement.addEventListener('seeking', updatePosition);
    audioElement.addEventListener('seeked', updatePosition);
    
    // Initial sync
    updatePosition();
    
    return () => {
      audioElement.removeEventListener('timeupdate', updatePosition);
      audioElement.removeEventListener('seeking', updatePosition);
      audioElement.removeEventListener('seeked', updatePosition);
    };
  }, [audioElement]);  // Control playback state based on isPlaying prop
  useEffect(() => {
    if (!wavesurferRef.current) return;
    
    try {
      // This only controls the visual state, not actual audio playback
      if (isPlaying) {
        // Use custom approach to ensure silence during visual playback
        if (!wavesurferRef.current.isPlaying()) {
          // Ensure wavesurfer is completely muted
          wavesurferRef.current.setVolume(0);
          
          // @ts-ignore - Access backend to ensure silence before playing
          if (wavesurferRef.current.backend && wavesurferRef.current.backend.media) {
            // @ts-ignore
            const mediaElement = wavesurferRef.current.backend.media;
            
            // Ensure it's muted and volume is 0
            mediaElement.muted = true;
            mediaElement.volume = 0;
            
            // Override audio output completely
            Object.defineProperty(mediaElement, 'volume', {
              writable: true,
              value: 0
            });
            
            Object.defineProperty(mediaElement, 'muted', {
              writable: true,
              value: true
            });
            
            // Use a patched play method that doesn't actually play audio
            const originalPlay = mediaElement.play;
            mediaElement.play = function() {
              return Promise.resolve();
            };
          }
          
          // Now it's safe to call play for visualization only
          wavesurferRef.current.play();
        }
      } else {
        if (wavesurferRef.current.isPlaying()) {
          wavesurferRef.current.pause();
        }
      }
    } catch (error) {
      console.error("Error controlling waveform playback state:", error);
    }
  }, [isPlaying]);  // Track local state for timeline rendering
  const [trackDuration, setTrackDuration] = useState(0);
    // Create time markers for our custom timeline
  const renderTimeMarkers = () => {
    if (!trackDuration) return null;
    
    // Calculate number of markers based on track duration
    const totalDuration = trackDuration || 0;
    // Adjust interval based on duration for better spacing
    const intervalSeconds = totalDuration > 600 ? 120 : totalDuration > 300 ? 60 : totalDuration > 120 ? 30 : 15;
    const markers = [];
    
    // Create a marker every intervalSeconds
    for (let i = 0; i <= totalDuration; i += intervalSeconds) {
      const mins = Math.floor(i / 60);
      const secs = Math.floor(i % 60);
      const formattedTime = `${mins}:${secs < 10 ? '0' + secs : secs}`;
      const position = (i / totalDuration) * 100;
      
      markers.push(
        <div 
          key={i}
          className="absolute top-6 transform -translate-x-1/2 text-xs text-white flex flex-col items-center"
          style={{ left: `${position}%` }}
        >
          <div className="h-3 w-1 bg-gray-500 mb-1"></div>
          {formattedTime}
        </div>
      );
    }
    
    return markers;
  };
    // Update trackDuration when onReady is called
  useEffect(() => {
    if (wavesurferRef.current) {
      const duration = wavesurferRef.current.getDuration();
      if (duration && !isNaN(duration)) {
        setTrackDuration(duration);
      }
    }
  }, [wavesurferRef.current?.getDuration()]);
  
  // Force component update when audio playback position changes
  const [currentPosition, setCurrentPosition] = useState(0);
  
  useEffect(() => {
    if (!audioElement || !showTimeline) return;
    
    const updateTimelinePosition = () => {
      setCurrentPosition(audioElement.currentTime);
    };
    
    audioElement.addEventListener('timeupdate', updateTimelinePosition);
    
    return () => {
      audioElement.removeEventListener('timeupdate', updateTimelinePosition);
    };
  }, [audioElement, showTimeline]);
  return (
    <div className="w-full flex flex-col gap-1">
      {/* Waveform container */}
      <div className="relative">
        <div
          ref={containerRef}
          className={`w-full ${loading ? 'opacity-50' : 'opacity-100'}`}
        />
        
        {/* Custom timeline - only rendered if showTimeline is true */}
        {showTimeline && trackDuration > 0 && (
          <div 
            className="relative w-full h-16 mt-2 cursor-pointer bg-black bg-opacity-20 p-2 rounded border border-gray-800"
            onClick={(e) => {
              if (!audioElement || !trackDuration) return;
              
              // Calculate the click position relative to the timeline width
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPosition = (e.clientX - rect.left) / rect.width;
              const newTime = clickPosition * trackDuration;
              
              // Update the audio element position
              audioElement.currentTime = newTime;
              setCurrentPosition(newTime);
              
              // Update wavesurfer position
              if (wavesurferRef.current) {
                wavesurferRef.current.seekTo(clickPosition);
              }
              
              // Notify parent component of position change
              if (onPositionChange) {
                onPositionChange(newTime);
              }
            }}
          >
            {/* Timeline markers */}
            {renderTimeMarkers()}            {/* Timeline line with progress */}
            <div className="absolute top-2 left-0 w-full h-2 bg-gray-700 rounded-full">
              {/* Progress fill */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#1DB954] rounded-full" 
                style={{ width: `${(currentPosition / trackDuration) * 100}%` }}
              ></div>
            </div>            {/* Current position indicator */}
            {audioElement && (
              <div 
                className="absolute top-1 w-px h-4 bg-white"
                style={{ 
                  left: `${(currentPosition / trackDuration) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="absolute top-0 w-3 h-3 rounded-full bg-white border-2 border-[#1DB954] -translate-x-1/2"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioWaveform;

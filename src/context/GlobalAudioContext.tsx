"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverArt?: string;
  duration?: number;
  bpm?: number;
  key?: string;
  genre?: string;
  year?: string;
  collaborators?: string;
}

interface GlobalAudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  audioElement: HTMLAudioElement | null;
}

const GlobalAudioContext = createContext<GlobalAudioContextType | undefined>(undefined);

export function GlobalAudioProvider({ children }: { children: ReactNode }) {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Thorough function to silence all other audio sources
  const silenceAllOtherAudio = (ourAudio: HTMLAudioElement) => {
    try {
      // First identify and disable all audio elements
      const allAudioElements = document.getElementsByTagName('audio');
      for (let i = 0; i < allAudioElements.length; i++) {
        const element = allAudioElements[i];
        if (element !== ourAudio) {
          // Stop playback
          element.pause();
          
          // Reset position
          element.currentTime = 0;
          
          // Ensure it's muted
          element.muted = true;
          element.volume = 0;
          
          // Remove autoplay if present
          element.removeAttribute('autoplay');
          
          // Try to completely override audio capabilities
          try {
            // Override volume property
            Object.defineProperty(element, 'volume', {
              writable: true, 
              value: 0
            });
            
            // Override muted property
            Object.defineProperty(element, 'muted', {
              writable: true,
              value: true
            });
            
            // Override play method
            const originalPlay = element.play;
            element.play = function() {
              element.pause();
              return Promise.resolve();
            };
          } catch (error) {
            console.error("Error disabling audio element:", error);
          }
        }
      }
      
      // Next, look for WaveSurfer instances that might be producing audio
      const wavesurferElements = document.querySelectorAll('[data-waveform-visual-only="true"]');
      wavesurferElements.forEach(element => {
        if (element instanceof HTMLAudioElement) {
          element.muted = true;
          element.volume = 0;
          element.pause();
        }
      });
      
      // Finally make sure our audio element is properly set up
      ourAudio.muted = false;
    } catch (error) {
      console.error("Error silencing other audio sources:", error);
    }
  };  useEffect(() => {
    // Create audio element on client side
    const audio = new Audio();
    
    // Set specific attributes to ensure proper behavior
    audio.setAttribute('data-global-audio', 'true');
    audio.volume = volume;
    
    setAudioElement(audio);

    // Create proper event handler functions that we can reference for cleanup
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    
    // Ensure only this audio plays by silencing others
    const silenceOthers = () => {
      silenceAllOtherAudio(audio);
    };
    
    // Handle volume changes manually to ensure our element is the only one making sound
    const handleVolumeChange = () => {
      if (audio.muted) {
        audio.muted = false; // Ensure our audio is not muted
      }
      silenceOthers(); // Re-silence others each time volume changes
    };

    // Set up event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', silenceOthers);
    audio.addEventListener('playing', silenceOthers);
    audio.addEventListener('volumechange', handleVolumeChange);

    // Initial cleanup to make sure no other audio is playing
    silenceOthers();

    return () => {
      audio.pause();
      audio.src = '';
      
      // Clean up event listeners
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', silenceOthers);
      audio.removeEventListener('playing', silenceOthers);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume;
    }
  }, [volume, audioElement]);  const playTrack = (track: Track) => {
    if (!audioElement) return;

    // Thoroughly silence all other audio sources
    silenceAllOtherAudio(audioElement);

    // If same track, just play/pause
    if (currentTrack && currentTrack.id === track.id) {
      togglePlayPause();
      return;
    }

    // Load and play new track
    try {
      audioElement.src = track.url;
      audioElement.load();
      
      // Make sure our audio element is unmuted and has proper volume
      audioElement.muted = false;
      audioElement.volume = volume;
      
      // Silence others again before playing
      silenceAllOtherAudio(audioElement);
      
      audioElement.play()
        .then(() => {
          setCurrentTrack(track);
          setIsPlaying(true);
          
          // Silence one more time after successful playback
          silenceAllOtherAudio(audioElement);
        })
        .catch(error => {
          console.error("Error playing track:", error);
        });
    } catch (error) {
      console.error("Error loading track:", error);
    }
  };

  const pauseTrack = () => {
    if (!audioElement || !isPlaying) return;
    audioElement.pause();
    setIsPlaying(false);
  };  const togglePlayPause = () => {
    if (!audioElement || !currentTrack) return;

    try {
      // Thoroughly silence all other audio sources
      silenceAllOtherAudio(audioElement);
      
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        // Make sure our audio element is unmuted and has proper volume
        audioElement.muted = false;
        audioElement.volume = volume;
        
        // Double-check silencing before playing
        silenceAllOtherAudio(audioElement);
        
        audioElement.play()
          .then(() => {
            setIsPlaying(true);
            // One more silence after playback starts
            setTimeout(() => silenceAllOtherAudio(audioElement), 50);
          })
          .catch(error => {
            console.error("Error playing track:", error);
            setIsPlaying(false);
          });
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
      setIsPlaying(false);
    }
  };
  const setVolumeLevel = (vol: number) => {
    if (!audioElement) return;
    
    try {
      // Silence others first to prevent any unwanted sound
      silenceAllOtherAudio(audioElement);
      
      // Set the new volume level
      const newVolume = Math.max(0, Math.min(1, vol));
      setVolume(newVolume);
      
      // Make sure our audio element is unmuted
      audioElement.muted = false;
      audioElement.volume = newVolume;
      
      // Double-check silence after volume change
      setTimeout(() => silenceAllOtherAudio(audioElement), 50);
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  };

  const seekTo = (time: number) => {
    if (!audioElement) return;
    audioElement.currentTime = time;
    setProgress(time);
  };

  return (
    <GlobalAudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        duration,
        playTrack,
        pauseTrack,
        togglePlayPause,
        setVolume: setVolumeLevel,
        seekTo,
        audioElement
      }}
    >
      {children}
    </GlobalAudioContext.Provider>
  );
}

export function useGlobalAudio() {
  const context = useContext(GlobalAudioContext);
  if (context === undefined) {
    throw new Error('useGlobalAudio must be used within a GlobalAudioProvider');
  }
  return context;
}

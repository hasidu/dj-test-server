"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';
import MusicVisualizer from './MusicVisualizer';
import { 
  FaPlay, 
  FaPause, 
  FaStepBackward, 
  FaStepForward, 
  FaVolumeUp,
  FaSpotify,
  FaMusic
} from 'react-icons/fa';

interface RecordingsLatestTrackProps {
  tracks: Array<{
    id: string;
    title: string;
    artist: string;
    collaborators?: string;
    coverArt: string;
    audioUrl: string;
    fallbackUrl?: string;
    bpm?: number;
    key?: string;
    genre?: string;
    duration?: number;
    year?: string;
  }>;
}

const RecordingsLatestTracks: React.FC<RecordingsLatestTrackProps> = ({ tracks }) => {
  const [activeTab, setActiveTab] = useState('Latest');
  const [currentTime, setCurrentTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  // Timeline is always visible now
  const showTimeline = true;
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const { 
    currentTrack, 
    isPlaying, 
    playTrack,
    pauseTrack,
    togglePlayPause,
    seekTo,
    volume,
    setVolume,
    audioElement
  } = useGlobalAudio();

  // Format time in MM:SS format
  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const selectTrack = (track: any) => {
    if (currentTrack && track.id === currentTrack.id) {
      togglePlayPause();
    } else {
      playTrack({
        id: track.id,
        title: track.title,
        artist: track.artist,
        url: track.audioUrl || track.fallbackUrl || '',
        coverArt: track.coverArt,
        genre: track.genre,
        year: track.year,
        collaborators: track.collaborators
      });
    }
  };

  const playNextTrack = () => {
    const currentIndex = currentTrack 
      ? tracks.findIndex(t => t.id === currentTrack.id)
      : -1;
    const nextIndex = (currentIndex + 1) % tracks.length;
    
    const track = tracks[nextIndex];
    playTrack({
      id: track.id,
      title: track.title,
      artist: track.artist,
      url: track.audioUrl || track.fallbackUrl || '',
      coverArt: track.coverArt,
      genre: track.genre,
      year: track.year,
      collaborators: track.collaborators
    });
  };
  
  const playPreviousTrack = () => {
    const currentIndex = currentTrack 
      ? tracks.findIndex(t => t.id === currentTrack.id)
      : 0;
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    
    const track = tracks[prevIndex];
    playTrack({
      id: track.id,
      title: track.title,
      artist: track.artist,
      url: track.audioUrl || track.fallbackUrl || '',
      coverArt: track.coverArt,
      genre: track.genre,
      year: track.year,
      collaborators: track.collaborators
    });
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  
  // Handle position change from AudioWaveform component
  const handlePositionChange = (position: number) => {
    if (!audioElement) return;
    
    try {
      // Sync time display
      setCurrentTime(position);
      
      // Update global audio position
      if (Math.abs(audioElement.currentTime - position) > 0.2) {
        audioElement.currentTime = position;
      }
    } catch (error) {
      console.error("Error handling position change:", error);
    }
  };

  // Set track duration when audio is ready
  const handleAudioReady = (duration: number) => {
    setTrackDuration(duration);
  };
  
  // Listen to the global audio element's timeupdate event
  useEffect(() => {
    if (!audioElement) return;
    
    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
    };
    
    // Ensure only one audio source is playing
    const ensureSingleAudioSource = () => {
      // Find any other audio elements in the DOM and mute them
      const allAudioElements = document.getElementsByTagName('audio');
      for (let i = 0; i < allAudioElements.length; i++) {
        const element = allAudioElements[i];
        // If this is not our controlled audio element, mute it
        if (element !== audioElement) {
          element.pause();
          element.muted = true;
          element.volume = 0;
          
          // Try to remove autoplay attribute if present
          element.removeAttribute('autoplay');
          
          // Also try to remove any onplay handlers
          element.onplay = (e) => {
            e.preventDefault();
            element.pause();
            return false;
          };
        }
      }
    };
    
    // Add event listeners
    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('play', ensureSingleAudioSource);
    audioElement.addEventListener('playing', ensureSingleAudioSource);
    
    // Run once to ensure initial state is correct
    ensureSingleAudioSource();
    
    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
      audioElement.removeEventListener('play', ensureSingleAudioSource);
      audioElement.removeEventListener('playing', ensureSingleAudioSource);
    };
  }, [audioElement]);

  return (
    <div className="bg-[#080808] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-white">
          LATEST <span className="text-[#1DB954] ml-2">TRACKS</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Track with Player */}
          <div className="bg-[#0a0a0a] overflow-hidden relative rounded-xl border border-[#222] lg:col-span-2 flex flex-col md:flex-row">
            {/* Left side - Album art section */}            <div className="w-full md:w-1/2 relative bg-gradient-to-br from-[#111] to-[#000] overflow-hidden" style={{ height: "600px" }}>
                {/* Cover Art */}
                <div className="absolute inset-0 opacity-90 transition-all duration-500 hover:scale-105 hover:opacity-100">                  {currentTrack?.coverArt && (
                    <Image 
                      src={currentTrack.coverArt} 
                      alt={currentTrack.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Removed black gradient overlay */}
                </div>                {/* Music Visualizer - optimized bar visualizer */} 
                {currentTrack && (
                  // adjust height based on your design defult was 150px
                  <div className="absolute bottom-0 left-0 right-0 z-10 h-[132px]">
                    <MusicVisualizer 
                      audioElement={audioElement}
                      isPlaying={isPlaying}
                      colorScheme="green"
                      sensitivity={0.8}
                      interactive={false}
                    />
                  </div>
                )}
                
                {/* Play button overlay */}                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button 
                    onClick={togglePlayPause}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isPlaying ? 'bg-black/50' : 'bg-[#1DB954]'}`}
                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isPlaying ? <FaPause size={20} color="white" /> : <FaPlay size={20} color="black" />}
                  </motion.button>
                </div>
            </div>
              {/* Right side - Track Info and Controls */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex flex-col space-y-2 mb-6 text-center">
                  <h3 className="text-2xl font-bold text-white">{currentTrack?.title || "Select a track"}</h3>
                  <p className="text-lg text-gray-400">{currentTrack?.artist || ""}</p>
                  {currentTrack?.collaborators && (
                    <p className="text-gray-500 text-sm">ft. {currentTrack.collaborators}</p>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  {/* Playback controls */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 justify-center mb-4">
                      <motion.button 
                        onClick={playPreviousTrack} 
                        className="text-gray-400 hover:text-white"
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaStepBackward size={16} />
                      </motion.button>
                      <motion.button 
                        onClick={togglePlayPause}
                        className="bg-[#1DB954] w-10 h-10 rounded-full flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {isPlaying ? <FaPause size={16} color="black" /> : <FaPlay size={16} color="black" />}
                      </motion.button>
                      <motion.button 
                        onClick={playNextTrack} 
                        className="text-gray-400 hover:text-white"
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaStepForward size={16} />
                      </motion.button>
                    </div>
                      {/* Timeline */}
                    {currentTrack && (
                      <div className="mb-1 max-w-3xl mx-auto w-full">
                        <AudioPlayer 
                          audioUrl={currentTrack.url}
                          isPlaying={isPlaying}
                          onPlayPause={togglePlayPause}
                          onReady={handleAudioReady}
                          onPositionChange={handlePositionChange}
                          waveColor="rgba(255, 255, 255, 0.2)"
                          progressColor="#1DB954"
                          height={40}
                          audioElement={audioElement}
                          showTimeline={showTimeline}
                        />
                      </div>
                    )}
                    {/* Time display - simplified and centered */}
                    <div className="flex justify-center text-xs text-gray-400 mt-1">
                      <span className="tabular-nums">{formatTime(currentTime)} / {formatTime(trackDuration)}</span>
                    </div>
                  </div>
                    {/* Volume and music links */}
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="flex items-center gap-2 w-24">
                      <FaVolumeUp size={16} className="text-gray-400" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1DB954]"
                      />
                    </div>
                    <div className="flex items-center gap-4 justify-center">
                      <a href="#" title="Listen on Spotify" className="text-gray-400 hover:text-[#1DB954]">
                        <FaSpotify size={20} />
                      </a>
                      <a href="#" title="Listen on Tidal" className="text-gray-400 hover:text-white">
                        <FaMusic size={20} />
                      </a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
          {/* Track list tabs */}
          <div className="bg-[#0a0a0a] rounded-xl border border-[#222] overflow-hidden">
            <div className="p-4 border-b border-[#222] flex gap-4">
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'Latest' ? 'text-white border-b-2 border-[#1DB954]' : 'text-gray-400'}`}
                onClick={() => setActiveTab('Latest')}
              >
                Latest
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'Popular' ? 'text-white border-b-2 border-[#1DB954]' : 'text-gray-400'}`}
                onClick={() => setActiveTab('Popular')}
              >
                Popular
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'Albums' ? 'text-white border-b-2 border-[#1DB954]' : 'text-gray-400'}`}
                onClick={() => setActiveTab('Albums')}
              >
                Albums
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-track-transparent">
              {tracks.map((track, index) => (
                <div 
                  key={track.id}
                  className={`flex items-center p-3 hover:bg-black/30 border-b border-[#222] cursor-pointer ${currentTrack?.id === track.id ? 'bg-black/40' : ''}`}
                  onClick={() => selectTrack(track)}
                >
                  <div className="flex-shrink-0 mr-4 text-gray-500 w-5 text-center">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <FaPlay size={12} className="text-[#1DB954]" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="h-12 w-12 flex-shrink-0 relative mr-3">
                    <Image 
                      src={track.coverArt} 
                      alt={track.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${currentTrack?.id === track.id ? 'text-[#1DB954]' : 'text-white'}`}>
                      {track.title}
                    </div>
                    <div className="text-sm text-gray-400">
                      {track.artist}
                      {track.collaborators && <span className="text-gray-500"> ft. {track.collaborators}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="#" className="opacity-60 hover:opacity-100">
                      <FaSpotify size={16} className="text-[#1DB954]" />
                    </a>
                    <a href="#" className="opacity-60 hover:opacity-100">
                      <FaMusic size={16} className="text-white" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingsLatestTracks;
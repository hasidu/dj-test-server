"use client";

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import MusicVisualizer from './MusicVisualizer';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

interface Track {
  id: string;
  title: string;
  artist: string;
  collaborators?: string;
  coverArt: string;
  audioUrl: string;
  fallbackUrl?: string;
  // Additional DJ-related fields
  bpm?: number;
  key?: string;
  genre?: string;
  duration?: number;
  year?: string;
}

interface LatestTracksProps {
  tracks: Track[];
}

const LatestTracks: React.FC<LatestTracksProps> = ({ tracks }) => {
  const [activeTab, setActiveTab] = useState('Latest');
  const [visualizerType, setVisualizerType] = useState<'waveform' | 'bars' | 'circular' | 'spectrum'>('bars');
  const [colorScheme, setColorScheme] = useState<'green' | 'rainbow' | 'neon' | 'monochrome'>('green');
  const [visualizerSensitivity, setVisualizerSensitivity] = useState<number>(1.0);
  const [interactiveVisualizer, setInteractiveVisualizer] = useState<boolean>(true);
  const [showVisualizerOptions, setShowVisualizerOptions] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(true); // Control visibility of "NOW PLAYING" label
  const [showStats, setShowStats] = useState(false); // To show/hide advanced audio stats
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Use the global audio context
  const { 
    currentTrack, 
    isPlaying, 
    playTrack, 
    pauseTrack, 
    togglePlayPause, 
    progress, 
    duration,
    volume,
    setVolume,
    seekTo,
    audioElement
  } = useGlobalAudio();
    // Format time in MM:SS format
  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  // Play the next track in the list
  const playNextTrack = () => {
    const currentIndex = currentTrack 
      ? tracks.findIndex(t => t.id === currentTrack.id)
      : -1;
    const nextIndex = (currentIndex + 1) % tracks.length;
    
    // Convert our Track format to GlobalAudio Track format
    const track = tracks[nextIndex];
    playTrack({
      id: track.id,
      title: track.title,
      artist: track.artist,
      url: track.audioUrl || track.fallbackUrl || '',
      coverArt: track.coverArt,
      bpm: track.bpm,
      key: track.key,
      genre: track.genre,
      year: track.year,
      collaborators: track.collaborators
    });
    
    // Reset visualizer options when changing tracks
    setShowVisualizerOptions(false);
    setShowStats(false);
  };
    // Play the previous track in the list
  const playPreviousTrack = () => {
    const currentIndex = currentTrack 
      ? tracks.findIndex(t => t.id === currentTrack.id)
      : 0;
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    
    // Convert our Track format to GlobalAudio Track format
    const track = tracks[prevIndex];
    playTrack({
      id: track.id,
      title: track.title,
      artist: track.artist,
      url: track.audioUrl || track.fallbackUrl || '',
      coverArt: track.coverArt,
      bpm: track.bpm,
      key: track.key,
      genre: track.genre,
      year: track.year,
      collaborators: track.collaborators
    });
    
    // Reset visualizer options when changing tracks
    setShowVisualizerOptions(false);
    setShowStats(false);
  };
  // Select a specific track
  const selectTrack = (track: Track) => {
    if (currentTrack && track.id === currentTrack.id) {
      togglePlayPause();
    } else {
      playTrack({
        id: track.id,
        title: track.title,
        artist: track.artist,
        url: track.audioUrl || track.fallbackUrl || '',
        coverArt: track.coverArt,
        bpm: track.bpm,
        key: track.key,
        genre: track.genre,
        year: track.year,
        collaborators: track.collaborators
      });
      
      // Reset UI state when changing tracks
      setShowVisualizerOptions(false);
      setShowStats(false);
    }
  };
  
  // Handle progress bar click to seek
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    
    // Calculate new position and seek to it
    const newTime = clickPosition * duration;
    seekTo(newTime);
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  
  // Toggle volume control visibility
  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
  };
    return (
    <div className="bg-[#080808] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-white">
          LATEST <span className="text-[#a3ff12] ml-2">TRACKS</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">          {/* Featured Track with Player */}
          <div className="bg-[#0a0a0a] overflow-hidden relative rounded-xl border border-[#222] lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Album Art Section */}
              <div className="aspect-square relative bg-gradient-to-br from-[#111] to-[#000] overflow-hidden">
                {/* Cover Art */}
                <div className="absolute inset-0 opacity-90 transition-all duration-500 hover:scale-105 hover:opacity-100">
                  {currentTrack?.coverArt && (
                    <Image 
                      src={currentTrack.coverArt} 
                      alt={currentTrack.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={togglePlayPause}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying ? 'bg-black/30 scale-90' : 'bg-[#a3ff12] scale-100'}`}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="5" width="4" height="14" rx="1" fill={isPlaying ? "#ffffff" : "#000000"}/>
                        <rect x="14" y="5" width="4" height="14" rx="1" fill={isPlaying ? "#ffffff" : "#000000"}/>
                      </svg>
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L20 12L6 20V4Z" fill="#000000"/>
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* La Foresta logo watermark */}
                <div className="absolute top-4 left-4 text-white/30">
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5L5 50l45 45 45-45L50 5z" fill="currentColor" fillOpacity="0.3"/>
                    <path d="M50 20L20 50l30 30 30-30L50 20z" fill="currentColor" fillOpacity="0.5"/>
                  </svg>
                </div>
              </div>
              
              {/* Player Info Section */}
              <div className="bg-[#0a0a0a] relative flex flex-col h-full">
                {/* Main Player UI with Visualizer */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  {/* Track Info */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="h-4 w-1 bg-[#a3ff12] mr-2"></span>
                        <span className="text-[#a3ff12] text-sm font-medium uppercase tracking-wider">
                          Now Playing
                        </span>
                      </div>
                      
                      {/* Visualizer Controls */}
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setShowVisualizerOptions(!showVisualizerOptions)}
                          className="text-white/70 hover:text-[#a3ff12] transition-colors p-1 rounded-full hover:bg-white/5"
                          title="Visualizer Options"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3v18h18"/>
                            <path d="M18 17V9"/>
                            <path d="M13 17V5"/>
                            <path d="M8 17v-3"/>
                          </svg>
                        </button>
                        
                        <button 
                          onClick={() => setShowStats(!showStats)}
                          className="text-white/70 hover:text-[#a3ff12] transition-colors p-1 rounded-full hover:bg-white/5"
                          title="Audio Stats"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                            <path d="M12 12v9"/>
                            <path d="m8 17 4 4 4-4"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-white text-2xl font-bold tracking-tight line-clamp-2 mb-2">
                      {currentTrack?.title || 'Select a track to play'}
                    </h3>
                    
                    <div className="flex items-center text-white/60 text-sm mb-4">
                      <span className="font-medium">{currentTrack?.artist || 'Artist'}</span>
                      {currentTrack?.collaborators && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{currentTrack.collaborators}</span>
                        </>
                      )}
                    </div>
                  </div>
                    {/* Visualizer Options Dropdown */}
                  {showVisualizerOptions && (
                    <div className="mb-4 p-3 bg-black/40 rounded-lg border border-[#333] animate-fadeIn">
                      <div className="mb-3">
                        <h4 className="text-white text-xs uppercase tracking-wider mb-2">Visualizer Style</h4>
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => setVisualizerType('bars')}
                            className={`px-3 py-1 text-xs rounded-full ${visualizerType === 'bars' ? 'bg-[#a3ff12] text-black font-bold' : 'bg-white/10 text-white/70'}`}
                          >
                            Bars
                          </button>
                          <button 
                            onClick={() => setVisualizerType('waveform')}
                            className={`px-3 py-1 text-xs rounded-full ${visualizerType === 'waveform' ? 'bg-[#a3ff12] text-black font-bold' : 'bg-white/10 text-white/70'}`}
                          >
                            Waveform
                          </button>
                          <button 
                            onClick={() => setVisualizerType('circular')}
                            className={`px-3 py-1 text-xs rounded-full ${visualizerType === 'circular' ? 'bg-[#a3ff12] text-black font-bold' : 'bg-white/10 text-white/70'}`}
                          >
                            Circular
                          </button>
                          <button 
                            onClick={() => setVisualizerType('spectrum')}
                            className={`px-3 py-1 text-xs rounded-full ${visualizerType === 'spectrum' ? 'bg-[#a3ff12] text-black font-bold' : 'bg-white/10 text-white/70'}`}
                          >
                            Spectrum
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-white text-xs uppercase tracking-wider mb-2">Color Scheme</h4>
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => setColorScheme('green')}
                            className={`px-3 py-1 text-xs rounded-full ${colorScheme === 'green' ? 'bg-[#a3ff12] text-black font-bold' : 'bg-[#a3ff12]/20 text-[#a3ff12]/90'}`}
                          >
                            Green
                          </button>
                          <button 
                            onClick={() => setColorScheme('rainbow')}
                            className={`px-3 py-1 text-xs rounded-full ${colorScheme === 'rainbow' ? 'bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white font-bold' : 'bg-gradient-to-r from-red-500/30 via-purple-500/30 to-blue-500/30 text-white/70'}`}
                          >
                            Rainbow
                          </button>
                          <button 
                            onClick={() => setColorScheme('neon')}
                            className={`px-3 py-1 text-xs rounded-full ${colorScheme === 'neon' ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold' : 'bg-gradient-to-r from-fuchsia-500/30 to-cyan-500/30 text-white/70'}`}
                          >
                            Neon
                          </button>
                          <button 
                            onClick={() => setColorScheme('monochrome')}
                            className={`px-3 py-1 text-xs rounded-full ${colorScheme === 'monochrome' ? 'bg-gradient-to-r from-white to-gray-500 text-black font-bold' : 'bg-gradient-to-r from-white/30 to-gray-500/30 text-white/70'}`}
                          >
                            Monochrome
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-white text-xs uppercase tracking-wider mb-2">Sensitivity: {visualizerSensitivity.toFixed(1)}x</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-white/50 text-xs">Low</span>
                          <input 
                            type="range" 
                            min="0.5" 
                            max="2" 
                            step="0.1"
                            value={visualizerSensitivity}
                            onChange={(e) => setVisualizerSensitivity(parseFloat(e.target.value))}
                            className="flex-1 accent-[#a3ff12]"
                          />
                          <span className="text-white/50 text-xs">High</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white text-xs uppercase tracking-wider">Interactive Mode</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={interactiveVisualizer}
                              onChange={() => setInteractiveVisualizer(!interactiveVisualizer)}
                              className="sr-only peer" 
                            />
                            <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#a3ff12]"></div>
                          </label>
                        </div>
                        <p className="text-white/50 text-xs">Move your mouse over the visualizer to interact with it</p>
                      </div>
                    </div>
                  )}
                    {/* Audio Stats */}
                  {showStats && (
                    <div className="mb-4 p-3 bg-black/40 rounded-lg border border-[#333] animate-fadeIn">
                      <h4 className="text-white text-xs uppercase tracking-wider mb-2">Audio Stats</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/60">BPM</span>
                          <span className="text-white">{currentTrack?.bpm || '128'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Key</span>
                          <span className="text-white">{currentTrack?.key || 'A min'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Format</span>
                          <span className="text-white">MP3 320kbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Release</span>
                          <span className="text-white">{currentTrack?.year || '2024'}</span>
                        </div>
                      </div>
                    </div>
                  )}                  {/* Visualizer */}
                  <div className="flex-grow mb-4 h-[110px] bg-black/20 rounded-lg overflow-hidden relative border border-[#222]">
                    <div className="absolute inset-0 h-full w-full">
                      <MusicVisualizer 
                        audioElement={audioElement} 
                        isPlaying={isPlaying} 
                        colorScheme={colorScheme}
                        sensitivity={visualizerSensitivity}
                        interactive={interactiveVisualizer}
                      />
                    </div>
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          className="bg-[#a3ff12]/20 hover:bg-[#a3ff12]/40 p-3 rounded-full transition-all duration-300"
                          onClick={togglePlayPause}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 12L8 18V6L18 12Z" fill="#a3ff12"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                    {/* Player Controls */}
                  <div>
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div 
                        ref={progressBarRef}
                        className="h-1.5 bg-[#333] rounded-full cursor-pointer relative overflow-hidden"
                        onClick={handleProgressBarClick}
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-[#a3ff12] to-[#a3ff12]/70 absolute top-0 left-0 rounded-full" 
                          style={{
                            width: duration ? `${(progress / duration) * 100}%` : '0%'
                          }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-white/60 mt-2">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration || 0)}</span>
                      </div>
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        {/* Previous */}
                        <button 
                          className="text-white/70 hover:text-[#a3ff12] transition-colors"
                          onClick={playPreviousTrack}
                          aria-label="Previous track"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 20L9 12L19 4V20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                        
                        {/* Play/Pause (small version) */}
                        <button 
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${isPlaying ? 'border-white/20 text-white' : 'border-[#a3ff12] text-[#a3ff12]'}`}
                          onClick={togglePlayPause}
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="7" y="6" width="3" height="12" rx="1" fill="currentColor"/>
                              <rect x="14" y="6" width="3" height="12" rx="1" fill="currentColor"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 12L8 18V6L18 12Z" fill="currentColor"/>
                            </svg>
                          )}
                        </button>
                        
                        {/* Next */}
                        <button 
                          className="text-white/70 hover:text-[#a3ff12] transition-colors"
                          onClick={playNextTrack}
                          aria-label="Next track"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 4L15 12L5 20V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                      
                      {/* Volume */}
                      <div className="relative">
                        <button 
                          className="text-white/70 hover:text-[#a3ff12] transition-colors"
                          onClick={toggleVolumeControl}
                          aria-label="Volume control"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.07 5.93C20.9447 7.80528 21.9979 10.3447 21.9979 13C21.9979 15.6553 20.9447 18.1947 19.07 20.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        
                        {/* Volume slider that appears when volume button is clicked */}
                        {showVolumeControl && (
                          <div className="absolute bottom-full right-0 mb-2 bg-[#111]/95 p-3 rounded-md w-36 z-50 border border-[#333]">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={volume}
                              onChange={handleVolumeChange}
                              className="w-full accent-[#a3ff12]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Track Actions Bar */}
                <div className="mt-auto px-4 py-3 border-t border-[#222] flex items-center justify-between bg-black/20">
                  <div className="flex space-x-3">
                    <button className="text-white/60 hover:text-[#a3ff12] transition-colors" title="Add to favorites">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                    </button>
                    <button className="text-white/60 hover:text-[#a3ff12] transition-colors" title="Add to playlist">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15V6"/>
                        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                        <path d="M12 12H3"/>
                        <path d="M16 6H3"/>
                        <path d="M12 18H3"/>
                      </svg>
                    </button>
                    <button className="text-white/60 hover:text-[#a3ff12] transition-colors" title="Share">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        <polyline points="16 6 12 2 8 6"/>
                        <line x1="12" y1="2" x2="12" y2="15"/>
                      </svg>
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <a href="#" className="text-white/60 hover:text-[#a3ff12] transition-colors" title="Download">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </a>
                    <a href="#" className="text-white/60 hover:text-[#a3ff12] transition-colors" title="View Artist">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Track list */}
          <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#222] lg:col-span-1">
            <div className="border-b border-[#222]">
              <div className="flex">
                <button 
                  className={`px-4 py-4 text-sm uppercase tracking-wider font-medium ${activeTab === 'Latest' ? 'border-b-2 border-[#a3ff12] text-[#a3ff12]' : 'text-white/60'} transition-colors hover:text-white`}
                  onClick={() => setActiveTab('Latest')}
                >
                  Latest
                </button>
                <button 
                  className={`px-4 py-4 text-sm uppercase tracking-wider font-medium ${activeTab === 'Popular' ? 'border-b-2 border-[#a3ff12] text-[#a3ff12]' : 'text-white/60'} transition-colors hover:text-white`}
                  onClick={() => setActiveTab('Popular')}
                >
                  Popular
                </button>
                <button 
                  className={`px-4 py-4 text-sm uppercase tracking-wider font-medium ${activeTab === 'Albums' ? 'border-b-2 border-[#a3ff12] text-[#a3ff12]' : 'text-white/60'} transition-colors hover:text-white`}
                  onClick={() => setActiveTab('Albums')}
                >
                  Albums
                </button>
              </div>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              {/* Track items */}              {tracks.map((track, index) => (
                <div 
                  key={track.id}
                  className={`flex items-center p-4 hover:bg-black/30 cursor-pointer transition-all duration-200 border-l-2 ${
                    currentTrack?.id === track.id ? 'bg-black/20 border-l-[#a3ff12]' : 'border-l-transparent'
                  }`}
                  onClick={() => selectTrack(track)}
                >
                  {/* Track number or playing indicator */}
                  <div className="w-8 text-center">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <div className="w-5 h-5 mx-auto rounded-full flex items-center justify-center bg-[#a3ff12]/10">
                        <div className="w-2 h-2 bg-[#a3ff12] rounded-full animate-pulse"></div>
                      </div>
                    ) : (
                      <span className="text-white/40 text-sm">{index + 1}</span>
                    )}
                  </div>
                  
                  {/* Track image */}
                  <div className="w-12 h-12 relative flex-shrink-0 mx-3 rounded overflow-hidden">
                    <Image 
                      src={track.coverArt} 
                      alt={track.title} 
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                    
                    {/* Play overlay on hover */}
                    <div className={`absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity ${
                      currentTrack?.id === track.id && isPlaying ? 'opacity-100' : ''
                    }`}>
                      {currentTrack?.id === track.id && isPlaying ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="7" y="6" width="3" height="12" rx="1" fill="white"/>
                          <rect x="14" y="6" width="3" height="12" rx="1" fill="white"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 12L8 18V6L18 12Z" fill="white"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Track info */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-[#a3ff12]' : 'text-white'}`}>
                      {track.title}
                    </h4>
                    <p className="text-white/60 text-sm truncate">
                      {track.artist}{track.collaborators ? `, ${track.collaborators.split(',')[0]}` : ''}
                    </p>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 ml-2">
                    {/* Spotify button */}
                    <button 
                      className="text-[#1DB954] p-1 rounded-full hover:bg-white/10 transition-all" 
                      aria-label="Listen on Spotify"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5917 16.4083C16.3833 16.7167 16.0333 16.825 15.7333 16.6333C13.3667 15.1583 10.375 14.8083 6.83332 15.6333C6.53332 15.7083 6.21665 15.525 6.14165 15.2333C6.06665 14.9333 6.24998 14.6167 6.54998 14.5417C10.4333 13.6417 13.7667 14.0583 16.3667 15.6833C16.6667 15.8 16.7833 16.1917 16.5917 16.4083ZM17.8583 13.6833C17.5917 14.0583 17.15 14.1917 16.775 13.925C14.0583 12.2417 9.93332 11.7083 6.98332 12.725C6.55832 12.8583 6.09998 12.6333 5.96665 12.2167C5.83332 11.7917 6.05832 11.3333 6.47498 11.2C9.88332 10.0417 14.4167 10.625 17.6083 12.6C17.9833 12.8667 18.125 13.3083 17.8583 13.6833ZM17.9917 10.8667C14.7417 9.00833 9.31665 8.83333 6.46665 9.925C5.96665 10.0833 5.43332 9.80833 5.27498 9.30833C5.11665 8.80833 5.39165 8.275 5.89165 8.11667C9.20832 6.86667 15.1333 7.075 18.8667 9.21667C19.3167 9.46667 19.475 10.05 19.225 10.5C18.975 10.9417 18.4417 11.1167 17.9917 10.8667Z"/>
                      </svg>
                    </button>
                    
                    {/* Menu button */}
                    <button 
                      className="text-white/60 p-1 rounded-full hover:text-white hover:bg-white/10 transition-all" 
                      aria-label="More options"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Footer with info */}
              <div className="p-4 border-t border-[#222] text-center">
                <p className="text-white/50 text-xs">
                  New tracks added weekly. <a href="#" className="text-[#a3ff12] hover:underline">Submit your music</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add some custom styles for the scrollbar and animations */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #a3ff12;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Customize range input slider */
        input[type=range] {
          -webkit-appearance: none;
          height: 4px;
          background: #333;
          border-radius: 5px;
          outline: none;
        }
        
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: #a3ff12;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        input[type=range]::-webkit-slider-thumb:hover {
          width: 14px;
          height: 14px;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default LatestTracks;

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { motion } from 'framer-motion';
import MusicVisualizer from './MusicVisualizer';
import AudioPlayer from './AudioPlayer';
import { 
  FaPlay, 
  FaPause, 
  FaStepBackward, 
  FaStepForward, 
  FaVolumeUp,
  FaSpotify,
  FaMusic,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

interface MusicPlayerProps {
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
    duration?: string;
    year?: string;
  }>;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  
  const { 
    currentTrack, 
    isPlaying, 
    playTrack,
    togglePlayPause,
    volume,
    setVolume,
    audioElement
  } = useGlobalAudio();

  // Filter and sort tracks
  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (track.collaborators && track.collaborators.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGenre = selectedGenre === 'All' || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const sortedTracks = [...filteredTracks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'latest':
      default:
        return 0; // Keep original order for latest
    }
  });

  // Get unique genres for filter
  const genres = ['All', ...Array.from(new Set(tracks.map(track => track.genre).filter(Boolean)))];

  // Format time in MM:SS format
  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const playNextTrack = () => {
    const currentIndex = currentTrack 
      ? sortedTracks.findIndex(t => t.id === currentTrack.id)
      : -1;
    const nextIndex = (currentIndex + 1) % sortedTracks.length;
    
    const track = sortedTracks[nextIndex];
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
      ? sortedTracks.findIndex(t => t.id === currentTrack.id)
      : 0;
    const prevIndex = (currentIndex - 1 + sortedTracks.length) % sortedTracks.length;
    
    const track = sortedTracks[prevIndex];
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
  
  // Handle position change from AudioPlayer component
  const handlePositionChange = (position: number) => {
    if (!audioElement) return;
    
    try {
      setCurrentTime(position);
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
  
  // Listen to the global audio element's timeupdate event
  useEffect(() => {
    if (!audioElement) return;
    
    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
    };
    
    audioElement.addEventListener('timeupdate', updateTime);
    
    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
    };
  }, [audioElement]);

  return (
    <div className="bg-black border border-gray-800/30 rounded-2xl overflow-hidden mb-8 shadow-2xl">
      {/* Header */}
      <div className="border-b border-gray-800/30 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-white">
            LATEST <span className="text-green-500">TRACKS</span>
          </h2>
          <div className="text-sm text-gray-400">
            {sortedTracks.length} tracks available
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search tracks, artists, collaborators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/60 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
            />
          </div>
          
          {/* Genre Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
          >
            <option value="latest">Latest First</option>
            <option value="title">Title A-Z</option>
            <option value="artist">Artist A-Z</option>
          </select>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-0" style={{ minHeight: "800px" }}>
        {/* Left Side - Music Player (Takes 3 columns) */}
        <div className="xl:col-span-3 relative bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
          {/* Cover Art Background */}
          <div className="absolute inset-0 transition-all duration-1000">
            {currentTrack?.coverArt && (
              <>
                <Image 
                  src={currentTrack.coverArt} 
                  alt={currentTrack.title}
                  fill
                  className="object-cover transition-transform duration-1000 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20"></div>
              </>
            )}
            {!currentTrack && (
              <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <FaMusic className="text-9xl mx-auto mb-8 opacity-20" />
                  <p className="text-2xl font-light">Select a track to start playing</p>
                </div>
              </div>
            )}
          </div>

          {/* Center Content Area */}
          <div className="absolute inset-0 flex flex-col z-10">
            {/* Top Section - Track Info */}
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="text-center max-w-md">
                {currentTrack && (
                  <>
                    <div className="mb-12">
                      <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                        {currentTrack.title}
                      </h3>
                      <p className="text-xl text-gray-200 mb-2 drop-shadow">
                        {currentTrack.artist}
                      </p>
                      {currentTrack.collaborators && (
                        <p className="text-lg text-gray-300 drop-shadow">
                          ft. {currentTrack.collaborators}
                        </p>
                      )}
                    </div>

                    {/* Main Play Button - Repositioned */}
                    <div className="flex items-center justify-center gap-8 mb-8">
                      <motion.button 
                        onClick={playPreviousTrack}
                        className="p-4 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaStepBackward className="text-2xl" />
                      </motion.button>

                      <motion.button 
                        onClick={togglePlayPause}
                        className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-all shadow-2xl hover:shadow-green-500/25"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPlaying ? (
                          <FaPause className="text-3xl text-black" />
                        ) : (
                          <FaPlay className="text-3xl text-black ml-1" />
                        )}
                      </motion.button>
                      
                      <motion.button 
                        onClick={playNextTrack}
                        className="p-4 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaStepForward className="text-2xl" />
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Section - Timeline & Controls */}
            <div className="bg-gradient-to-t from-black/98 via-black/90 to-transparent px-12 py-8">
              {/* Waveform Timeline */}
              {currentTrack && (
                <div className="mb-6">
                  <AudioPlayer 
                    audioUrl={currentTrack.url}
                    isPlaying={isPlaying}
                    onPlayPause={togglePlayPause}
                    onReady={handleAudioReady}
                    onPositionChange={handlePositionChange}
                    waveColor="rgba(255, 255, 255, 0.15)"
                    progressColor="rgba(34, 197, 94, 1.0)"
                    height={80}
                    audioElement={audioElement}
                    showTimeline={true}
                  />
                </div>
              )}

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                {/* Time Display */}
                {currentTrack && (
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-lg tabular-nums font-medium">{formatTime(currentTime)}</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-lg tabular-nums font-medium">{formatTime(trackDuration)}</span>
                  </div>
                )}

                {/* Volume Control */}
                <div className="flex items-center gap-4">
                  <FaVolumeUp className="text-gray-300 text-xl" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                  />
                </div>
                
                {/* External Links */}
                <div className="flex items-center gap-4">
                  <motion.button 
                    className="p-3 text-gray-400 hover:text-green-400 transition-colors rounded-full hover:bg-green-500/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSpotify className="text-2xl" />
                  </motion.button>
                  <motion.button 
                    className="p-3 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaMusic className="text-2xl" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Track List (Takes 2 columns) */}
        <div className="xl:col-span-2 bg-black/80 border-l border-gray-800/30">
          {/* Track List Header */}
          <div className="border-b border-gray-800/30 px-6 py-6">
            <div className="flex gap-8">
              <button className="text-white border-b-2 border-green-500 pb-3 text-lg font-semibold transition-all">
                Latest
              </button>
              <button className="text-gray-400 hover:text-white pb-3 text-lg font-medium transition-all hover:border-b-2 hover:border-gray-600">
                Popular
              </button>
              <button className="text-gray-400 hover:text-white pb-3 text-lg font-medium transition-all hover:border-b-2 hover:border-gray-600">
                Albums
              </button>
            </div>
          </div>

          {/* Track List */}
          <div className="h-[680px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
            {sortedTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className={`group flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition-all cursor-pointer border-l-4 ${
                  currentTrack?.id === track.id 
                    ? 'bg-green-500/10 border-l-green-500 backdrop-blur-sm' 
                    : 'border-l-transparent hover:border-l-gray-600'
                }`}
                onClick={() => selectTrack(track)}
                whileHover={{ x: 4 }}
              >
                {/* Track Number / Play Icon */}
                <div className="w-10 text-center flex-shrink-0">
                  {currentTrack?.id === track.id && isPlaying ? (
                    <motion.div 
                      className="text-green-500"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                    </motion.div>
                  ) : (
                    <span className={`text-lg font-medium transition-all ${
                      currentTrack?.id === track.id ? 'text-green-500' : 'text-gray-500 group-hover:text-white'
                    }`}>
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Album Art */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 shadow-lg">
                  <Image
                    src={track.coverArt}
                    alt={track.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate text-lg mb-1 transition-all ${
                    currentTrack?.id === track.id ? 'text-green-500' : 'text-white group-hover:text-green-400'
                  }`}>
                    {track.title}
                  </h3>
                  <p className="text-sm text-gray-400 truncate group-hover:text-gray-300 transition-all">
                    {track.artist}
                    {track.collaborators && (
                      <span className="text-gray-500"> ft. {track.collaborators}</span>
                    )}
                  </p>
                  {track.genre && (
                    <p className="text-xs text-gray-500 mt-1">{track.genre} • {track.year}</p>
                  )}
                </div>

                {/* Duration */}
                <div className="text-sm text-gray-400 flex-shrink-0 mr-4">
                  {track.duration}
                </div>

                {/* External Links */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button 
                    className="p-2 text-gray-400 hover:text-green-500 transition-colors rounded-full hover:bg-green-500/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaSpotify className="text-lg" />
                  </motion.button>
                  <motion.button 
                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaMusic className="text-lg" />
                  </motion.button>
                </div>

                {/* Playing Indicator */}
                {currentTrack?.id === track.id && isPlaying && (
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <motion.div 
                      className="flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-green-500 rounded-full"
                          animate={{
                            height: [4, 20, 4],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

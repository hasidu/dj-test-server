"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, 
  FaPause, 
  FaSpotify,
  FaMusic,
  FaSearch,
  FaFilter,
  FaTimes,
  FaSortAmountDown,
  FaSortAmountUp
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
    duration?: string;
    year?: string;
  }>;
}

const RecordingsLatestTracks: React.FC<RecordingsLatestTrackProps> = ({ tracks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [sortBy, setSortBy] = useState('latest'); // latest, title, artist
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [showFilters, setShowFilters] = useState(false);
  
  const { 
    currentTrack, 
    isPlaying, 
    playTrack,
    togglePlayPause
  } = useGlobalAudio();

  // Filter and sort functionality
  const genres = ['All', ...Array.from(new Set(tracks.map(track => track.genre).filter(Boolean)))];
  const years = ['All', ...Array.from(new Set(tracks.map(track => track.year).filter(Boolean))).sort().reverse()];
  
  const filteredAndSortedTracks = tracks
    .filter(track => {
      const searchMatch = searchTerm === '' || 
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (track.collaborators && track.collaborators.toLowerCase().includes(searchTerm.toLowerCase()));
      const genreMatch = selectedGenre === 'All' || track.genre === selectedGenre;
      const yearMatch = selectedYear === 'All' || track.year === selectedYear;
      return searchMatch && genreMatch && yearMatch;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'artist':
          comparison = a.artist.localeCompare(b.artist);
          break;
        case 'year':
          comparison = (parseInt(a.year || '0') || 0) - (parseInt(b.year || '0') || 0);
          break;
        case 'latest':
        default:
          // Assuming tracks are ordered by latest by default
          comparison = tracks.indexOf(a) - tracks.indexOf(b);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSelectedYear('All');
    setSortBy('latest');
    setSortOrder('desc');
  };

  const hasActiveFilters = searchTerm !== '' || selectedGenre !== 'All' || selectedYear !== 'All';

  return (
    <div className="bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Track Catalog</h2>
            <p className="text-gray-400">
              {filteredAndSortedTracks.length} track{filteredAndSortedTracks.length !== 1 ? 's' : ''} available
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="bg-gray-800/60 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50 transition-all"
              >
                <option value="latest-desc">Latest First</option>
                <option value="latest-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="artist-asc">Artist A-Z</option>
                <option value="artist-desc">Artist Z-A</option>
                <option value="year-desc">Year (Newest)</option>
                <option value="year-asc">Year (Oldest)</option>
              </select>
            </div>
            
            {/* Filter Toggle */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-white/10 border-white/30 text-white' 
                  : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFilter className="text-sm" />
              <span className="text-sm font-medium">
                {hasActiveFilters ? 'Filters Active' : 'Filter'}
              </span>
              {hasActiveFilters && (
                <span className="ml-1 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {[searchTerm !== '', selectedGenre !== 'All', selectedYear !== 'All'].filter(Boolean).length}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search tracks, artists, collaborators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-all duration-300"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-gray-800 overflow-hidden"
          >
            <div className="p-6 bg-gray-900/30">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50 transition-all"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre} className="bg-gray-900">
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50 transition-all"
                  >
                    {years.map(year => (
                      <option key={year} value={year} className="bg-gray-900">
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  {hasActiveFilters && (
                    <motion.button
                      onClick={clearFilters}
                      className="w-full bg-gray-700/60 hover:bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white transition-all duration-200 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaTimes className="text-sm" />
                      Clear All Filters
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Track List */}
      <div className="max-h-[600px] overflow-y-auto">
        {filteredAndSortedTracks.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-2">
              <FaMusic className="text-4xl mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">No tracks found</h3>
            <p className="text-gray-500 mb-4">
              {hasActiveFilters 
                ? 'Try adjusting your filters or search terms.' 
                : 'No tracks are available in this catalog.'
              }
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-white hover:text-gray-300 underline transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <AnimatePresence mode="wait">
              {filteredAndSortedTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className={`group flex items-center gap-4 p-4 hover:bg-gray-800/30 transition-all duration-200 cursor-pointer border-l-2 ${
                    currentTrack?.id === track.id 
                      ? 'bg-gray-800/40 border-l-white' 
                      : 'border-l-transparent hover:border-l-gray-600'
                  }`}
                  onClick={() => selectTrack(track)}
                >
                  {/* Play Button & Index */}
                  <div className="flex-shrink-0 w-12 flex items-center justify-center">
                    <div className="relative">
                      <span className={`text-sm font-medium transition-opacity ${
                        currentTrack?.id === track.id || 'group-hover:opacity-0'
                      } ${currentTrack?.id === track.id ? 'text-white' : 'text-gray-500'}`}>
                        {index + 1}
                      </span>
                      <motion.button
                        className={`absolute inset-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          currentTrack?.id === track.id 
                            ? 'opacity-100 bg-white text-black' 
                            : 'opacity-0 group-hover:opacity-100 bg-white/90 text-black hover:bg-white'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectTrack(track);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentTrack?.id === track.id && isPlaying ? (
                          <FaPause className="text-xs" />
                        ) : (
                          <FaPlay className="text-xs ml-0.5" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Album Art */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                    <Image
                      src={track.coverArt}
                      alt={track.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate mb-1 ${
                      currentTrack?.id === track.id ? 'text-white' : 'text-gray-100 group-hover:text-white'
                    }`}>
                      {track.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {track.artist}
                      {track.collaborators && (
                        <span className="text-gray-500"> feat. {track.collaborators}</span>
                      )}
                    </p>
                  </div>

                  {/* Track Details */}
                  <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">
                    {track.genre && (
                      <span className="bg-gray-800/60 px-2 py-1 rounded-md">{track.genre}</span>
                    )}
                    {track.year && <span>{track.year}</span>}
                    {track.duration && <span>{track.duration}</span>}
                  </div>

                  {/* External Links */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                      title="Listen on Spotify"
                    >
                      <FaSpotify className="text-sm" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="More platforms"
                    >
                      <FaMusic className="text-sm" />
                    </button>
                  </div>

                  {/* Playing Indicator */}
                  {currentTrack?.id === track.id && isPlaying && (
                    <div className="flex-shrink-0 w-4">
                      <motion.div
                        className="flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordingsLatestTracks;
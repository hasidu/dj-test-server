"use client";

import Image from 'next/image';
import { useState } from 'react';

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

interface TrackListProps {
  tracks: Track[];
  activeTrack: Track;
  isPlaying: boolean;
  onSelectTrack: (track: Track) => void;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  activeTrack,
  isPlaying,
  onSelectTrack
}) => {
  const [viewMode, setViewMode] = useState<'standard' | 'detailed'>('standard');
  const [sortBy, setSortBy] = useState<'default' | 'artist' | 'title' | 'bpm'>('default');
  const [filter, setFilter] = useState('');
  
  // Sort tracks based on selected criteria
  const sortedTracks = [...tracks].sort((a, b) => {
    if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'bpm') {
      const aBpm = a.bpm || 0;
      const bBpm = b.bpm || 0;
      return aBpm - bBpm;
    }
    return 0; // Default order
  });
  
  // Filter tracks by title or artist
  const filteredTracks = filter
    ? sortedTracks.filter(track => 
        track.title.toLowerCase().includes(filter.toLowerCase()) ||
        track.artist.toLowerCase().includes(filter.toLowerCase())
      )
    : sortedTracks;
  
  return (
    <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#222]">
      {/* Header with filter and view controls */}
      <div className="border-b border-[#222] p-3">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Filter tracks..."
              className="w-full bg-black/40 border border-[#333] rounded px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#a3ff12]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              className="bg-black/40 border border-[#333] rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#a3ff12]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="default">Sort by: Default</option>
              <option value="artist">Sort by: Artist</option>
              <option value="title">Sort by: Title</option>
              <option value="bpm">Sort by: BPM</option>
            </select>
            
            <button 
              className={`p-1 rounded ${viewMode === 'standard' ? 'bg-[#a3ff12]/20 text-[#a3ff12]' : 'bg-transparent text-white/60'}`}
              onClick={() => setViewMode('standard')}
              title="Standard view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
            
            <button 
              className={`p-1 rounded ${viewMode === 'detailed' ? 'bg-[#a3ff12]/20 text-[#a3ff12]' : 'bg-transparent text-white/60'}`}
              onClick={() => setViewMode('detailed')}
              title="Detailed view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Track list */}
      <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
        {viewMode === 'standard' ? (
          // Standard view
          <>
            {filteredTracks.map((track, index) => (
              <div 
                key={track.id}
                className={`flex items-center p-4 hover:bg-black/30 cursor-pointer transition-all duration-200 border-l-2 ${
                  activeTrack.id === track.id ? 'bg-black/20 border-l-[#a3ff12]' : 'border-l-transparent'
                }`}
                onClick={() => onSelectTrack(track)}
              >
                {/* Track number or playing indicator */}
                <div className="w-8 text-center">
                  {activeTrack.id === track.id && isPlaying ? (
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
                    activeTrack.id === track.id && isPlaying ? 'opacity-100' : ''
                  }`}>
                    {activeTrack.id === track.id && isPlaying ? (
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
                  <h4 className={`font-medium truncate ${activeTrack.id === track.id ? 'text-[#a3ff12]' : 'text-white'}`}>
                    {track.title}
                  </h4>
                  <p className="text-white/60 text-sm truncate">
                    {track.artist}{track.collaborators ? `, ${track.collaborators.split(',')[0]}` : ''}
                  </p>
                </div>
                
                {/* BPM / Key (if available) */}
                {(track.bpm || track.key) && (
                  <div className="hidden sm:flex space-x-3 mr-4">
                    {track.bpm && (
                      <div className="flex flex-col items-center">
                        <span className="text-white/40 text-xs">BPM</span>
                        <span className="text-white/80 text-sm">{track.bpm}</span>
                      </div>
                    )}
                    {track.key && (
                      <div className="flex flex-col items-center">
                        <span className="text-white/40 text-xs">KEY</span>
                        <span className="text-white/80 text-sm">{track.key}</span>
                      </div>
                    )}
                  </div>
                )}
                
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
          </>
        ) : (
          // Detailed view - showing more DJ-relevant information
          <div className="p-2">
            <table className="w-full text-white/90 text-sm">
              <thead className="text-xs uppercase tracking-wider text-white/50 border-b border-[#333]">
                <tr>
                  <th className="py-3 px-2 text-left">#</th>
                  <th className="py-3 px-2 text-left">Track</th>
                  <th className="py-3 px-2 text-left">Artist</th>
                  <th className="py-3 px-2 text-center hidden sm:table-cell">BPM</th>
                  <th className="py-3 px-2 text-center hidden sm:table-cell">Key</th>
                  <th className="py-3 px-2 text-center hidden md:table-cell">Genre</th>
                  <th className="py-3 px-2 text-center hidden lg:table-cell">Year</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTracks.map((track, index) => (
                  <tr 
                    key={track.id} 
                    className={`border-b border-[#222] hover:bg-black/30 cursor-pointer ${
                      activeTrack.id === track.id ? 'bg-black/20' : ''
                    }`}
                    onClick={() => onSelectTrack(track)}
                  >
                    <td className="py-3 px-2">
                      {activeTrack.id === track.id && isPlaying ? (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#a3ff12]/10">
                          <div className="w-2 h-2 bg-[#a3ff12] rounded-full animate-pulse"></div>
                        </div>
                      ) : (
                        <span className="text-white/40">{index + 1}</span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 relative flex-shrink-0 mr-2 rounded overflow-hidden">
                          <Image 
                            src={track.coverArt} 
                            alt={track.title} 
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <span className={activeTrack.id === track.id ? 'text-[#a3ff12]' : ''}>{track.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">{track.artist}</td>
                    <td className="py-3 px-2 text-center hidden sm:table-cell">{track.bpm || '—'}</td>
                    <td className="py-3 px-2 text-center hidden sm:table-cell">{track.key || '—'}</td>
                    <td className="py-3 px-2 text-center hidden md:table-cell">{track.genre || 'Electronic'}</td>
                    <td className="py-3 px-2 text-center hidden lg:table-cell">{track.year || '2024'}</td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-white/60 hover:text-[#a3ff12] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"/>
                            <path d="M17 8l-5-5-5 5"/>
                            <path d="M12 3v12"/>
                          </svg>
                        </button>
                        <button className="text-white/60 hover:text-[#a3ff12] transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Footer with info */}
      <div className="p-4 border-t border-[#222] flex justify-between items-center">
        <p className="text-white/50 text-xs">
          {filteredTracks.length} tracks • {sortBy !== 'default' ? `Sorted by ${sortBy}` : 'Default order'}
        </p>
        <a href="#" className="text-[#a3ff12] text-xs hover:underline">Submit your music</a>
      </div>
    </div>
  );
};

export default TrackList;

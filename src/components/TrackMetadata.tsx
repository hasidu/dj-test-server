"use client";

import { useState } from 'react';

interface TrackMetadataProps {
  title: string;
  artist: string;
  collaborators?: string;
  releaseDate?: string;
  genre?: string;
  label?: string;
  bpm?: number;
  key?: string;
  duration: number;
}

const TrackMetadata: React.FC<TrackMetadataProps> = ({
  title,
  artist,
  collaborators,
  releaseDate = "2024",
  genre = "Electronic",
  label = "La Foresta",
  bpm = 128,
  key = "A min",
  duration
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'lyrics'>('info');
  
  // Format duration in minutes:seconds
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-black/30 rounded-lg border border-[#333] p-4 text-white text-sm">
      {/* Tabs */}
      <div className="flex border-b border-[#444] mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'info' ? 'text-[#a3ff12] border-b-2 border-[#a3ff12]' : 'text-white/70'}`}
          onClick={() => setActiveTab('info')}
        >
          Track Info
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'lyrics' ? 'text-[#a3ff12] border-b-2 border-[#a3ff12]' : 'text-white/70'}`}
          onClick={() => setActiveTab('lyrics')}
        >
          Lyrics
        </button>
      </div>
      
      {/* Info Tab Content */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-white/50 text-xs">Artist</p>
              <p>{artist}</p>
            </div>
            {collaborators && (
              <div>
                <p className="text-white/50 text-xs">Featuring</p>
                <p>{collaborators}</p>
              </div>
            )}
            <div>
              <p className="text-white/50 text-xs">Release Date</p>
              <p>{releaseDate}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Genre</p>
              <p>{genre}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Label</p>
              <p>{label}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Duration</p>
              <p>{formatDuration(duration)}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">BPM</p>
              <p>{bpm}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Key</p>
              <p>{key}</p>
            </div>
          </div>
          
          {/* Technical Details */}
          <div className="mt-4 pt-4 border-t border-[#444]">
            <h4 className="font-medium mb-2">Technical Details</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-white/50 text-xs">Format</p>
                <p>MP3</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">Bitrate</p>
                <p>320 kbps</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">Mastered by</p>
                <p>Echo Studios</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">Mix Engineer</p>
                <p>Alex Green</p>
              </div>
            </div>
          </div>
          
          {/* Download Links */}
          <div className="mt-4 pt-4 border-t border-[#444]">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Buy/Download</h4>
              <div className="flex space-x-2">
                <a 
                  href="#" 
                  className="text-xs px-3 py-1 bg-[#1DB954] text-white rounded-full hover:bg-opacity-80 transition-colors"
                  title="Listen on Spotify"
                >
                  Spotify
                </a>
                <a 
                  href="#" 
                  className="text-xs px-3 py-1 bg-[#FF5500] text-white rounded-full hover:bg-opacity-80 transition-colors"
                  title="Listen on SoundCloud"
                >
                  SoundCloud
                </a>
                <a 
                  href="#" 
                  className="text-xs px-3 py-1 bg-[#1DAEFF] text-white rounded-full hover:bg-opacity-80 transition-colors"
                  title="Buy on Beatport"
                >
                  Beatport
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Lyrics Tab Content */}
      {activeTab === 'lyrics' && (
        <div className="text-white/80 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-center text-white/50 italic">
            {title} by {artist}
            {collaborators && ` ft. ${collaborators}`}
          </p>
          
          <div className="space-y-4">
            <p>
              The lyrics for this track haven't been added yet.
            </p>
            <p className="text-white/50 text-center italic text-sm">
              This is an instrumental track or lyrics are not available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackMetadata;

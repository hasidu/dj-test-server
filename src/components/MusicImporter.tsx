"use client";

import { useState, useEffect } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  audioUrl: string;
  bpm?: number;
  key?: string;
  genre?: string;
  duration?: number;
}

interface Service {
  id: string;
  name: string;
  enabled: boolean;
  icon: string;
  description: string;
}

const MusicImporter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Track[]>([]);
  const [error, setError] = useState('');
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [activeService, setActiveService] = useState<string>('soundcloud');
  const [previewTrack, setPreviewTrack] = useState<Track | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  
  // Services available for import
  const services: Service[] = [
    { 
      id: 'soundcloud', 
      name: 'SoundCloud', 
      enabled: true,
      icon: "M14 11.5a1 1 0 0 0-1-1c-.5 0-1 .5-1 1v4.5c0 .5.5 1 1 1s1-.5 1-1v-4.5zm3 0a1 1 0 0 0-1-1c-.5 0-1 .5-1 1v4.5c0 .5.5 1 1 1s1-.5 1-1v-4.5zm3 0a1 1 0 0 0-1-1c-.5 0-1 .5-1 1v4.5c0 .5.5 1 1 1s1-.5 1-1v-4.5zm0-8.5c-6 0-10 4-10 4-2.5-1.5-5-2-5-2v11c1 0 2 .5 3 1 .5-1.5 2.5-3 5.5-3 3.5 0 6.5 2 6.5 5.5v1h2c4.5 0 8-3.5 8-8s-3.5-8-8-8c-.5 0-1.5 0-2 .5z",
      description: "Import tracks from your SoundCloud account or search by URL."
    },
    { 
      id: 'spotify', 
      name: 'Spotify', 
      enabled: false,
      icon: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
      description: "Connect your Spotify account to import your playlists and liked tracks."
    },
    { 
      id: 'youtube', 
      name: 'YouTube Music', 
      enabled: false,
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
      description: "Import tracks from YouTube Music playlists or by video URL."
    },
    { 
      id: 'beatport', 
      name: 'Beatport', 
      enabled: false,
      icon: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm4-9h-3V8h-2v3H8v2h3v3h2v-3h3v-2z",
      description: "Import your Beatport purchases and cart items directly to your library."
    },
    { 
      id: 'bandcamp', 
      name: 'Bandcamp', 
      enabled: false,
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.83l3.76 3.83 4.24-9-10.44 1.07 2.44 4.1z",
      description: "Import tracks from your Bandcamp collection or artist pages."
    },
    { 
      id: 'local', 
      name: 'Local Files', 
      enabled: true,
      icon: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",
      description: "Scan your computer for music files to import into your library."
    }
  ];

  useEffect(() => {
    // Initialize audio element for preview
    const audio = new Audio();
    setPreviewAudio(audio);
    
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResults([]);
    
    try {
      // Normally, you would call your API here
      // For demo purposes, we'll generate mock results
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Generate mock results based on the query
      const mockResults: Track[] = [];
      
      for (let i = 1; i <= 8; i++) {
        mockResults.push({
          id: `track-${i}-${Date.now()}`,
          title: `${query.charAt(0).toUpperCase() + query.slice(1)} Track ${i}`,
          artist: `DJ ${['Echo', 'Beats', 'Techno', 'Vinyl', 'House'][Math.floor(Math.random() * 5)]}`,
          coverArt: `/images/event${(i % 6) + 1}.jpg`,
          audioUrl: i <= 2 ? '/audio/m1.mp3' : `https://assets.mixkit.co/music/preview/mixkit-${Math.floor(Math.random() * 1000)}.mp3`,
          bpm: 120 + Math.floor(Math.random() * 30),
          key: ['A min', 'C maj', 'G min', 'D maj', 'F# min'][Math.floor(Math.random() * 5)],
          genre: ['House', 'Techno', 'Progressive', 'Deep House', 'Ambient'][Math.floor(Math.random() * 5)]
        });
      }
      
      setResults(mockResults);
      
      if (mockResults.length === 0) {
        setError('No tracks found. Try a different search.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search for music. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTrackSelection = (track: Track) => {
    if (selectedTracks.some(t => t.id === track.id)) {
      setSelectedTracks(selectedTracks.filter(t => t.id !== track.id));
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedTracks.length === results.length) {
      setSelectedTracks([]);
    } else {
      setSelectedTracks([...results]);
    }
  };

  const previewTrackAudio = (track: Track) => {
    if (!previewAudio) return;
    
    // If clicking on the same track that's currently playing
    if (previewTrack && previewTrack.id === track.id) {
      if (isPreviewPlaying) {
        previewAudio.pause();
        setIsPreviewPlaying(false);
      } else {
        previewAudio.play();
        setIsPreviewPlaying(true);
      }
      return;
    }
    
    // New track selected
    previewAudio.pause();
    previewAudio.src = track.audioUrl;
    previewAudio.oncanplay = () => {
      previewAudio.play();
      setIsPreviewPlaying(true);
    };
    
    previewAudio.onended = () => {
      setIsPreviewPlaying(false);
    };
    
    setPreviewTrack(track);
  };

  const stopPreview = () => {
    if (previewAudio) {
      previewAudio.pause();
      setIsPreviewPlaying(false);
      setPreviewTrack(null);
    }
  };

  const handleImport = () => {
    if (selectedTracks.length === 0) {
      setError('Please select at least one track to import');
      return;
    }
    
    // In a real app, you would send these tracks to your backend to save them
    alert(`Imported ${selectedTracks.length} tracks successfully!`);
    console.log('Imported tracks:', selectedTracks);
    
    // Clean up
    stopPreview();
    setSelectedTracks([]);
    setResults([]);
    setQuery('');
  };
  
  const setService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service && service.enabled) {
      setActiveService(serviceId);
      setResults([]);
      setSelectedTracks([]);
      stopPreview();
    }
  };

  return (
    <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#222]">
      <h3 className="text-2xl font-bold text-white mb-6">Import Music from Services</h3>
      
      {/* Services tabs */}
      <div className="flex mb-6 overflow-x-auto no-scrollbar">
        {services.map(service => (
          <button
            key={service.id}
            onClick={() => setService(service.id)}
            disabled={!service.enabled}
            className={`flex items-center whitespace-nowrap px-4 py-2 mr-2 rounded-full transition-all ${
              activeService === service.id 
                ? 'bg-[#a3ff12] text-black font-medium' 
                : service.enabled 
                  ? 'bg-[#111] text-white hover:bg-[#222]' 
                  : 'bg-[#111]/50 text-white/30 cursor-not-allowed'
            }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" className="mr-2" fill="currentColor">
              <path d={service.icon} />
            </svg>
            {service.name}
            {!service.enabled && <span className="ml-1 text-xs">(Soon)</span>}
          </button>
        ))}
      </div>
      
      {/* Service description */}
      <div className="mb-6 p-3 bg-black/40 border border-[#333] rounded-lg text-white/70 text-sm">
        {services.find(s => s.id === activeService)?.description}
        {!services.find(s => s.id === activeService)?.enabled && 
          <span className="block mt-1 text-[#a3ff12]">This service will be available soon. Try SoundCloud or Local Files instead.</span>
        }
      </div>
      
      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={activeService === 'soundcloud' 
            ? "Enter artist, track name or SoundCloud URL..." 
            : activeService === 'spotify'
              ? "Enter artist, track name or Spotify URL..."
              : "Search for tracks..."}
          className="flex-1 bg-[#111] border border-[#333] rounded p-2 text-white"
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-[#a3ff12] text-black font-bold rounded hover:bg-[#8bde00] transition-colors flex items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            <>Search</>
          )}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/30 text-red-200 rounded">
          {error}
        </div>
      )}
      
      {/* Now playing preview */}
      {previewTrack && (
        <div className="mt-4 p-3 bg-[#111] border border-[#333] rounded-lg flex items-center">
          <div className="w-12 h-12 relative flex-shrink-0 mr-3">
            <img 
              src={previewTrack.coverArt} 
              alt={previewTrack.title}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <button 
                onClick={() => previewTrackAudio(previewTrack)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#a3ff12]"
              >
                {isPreviewPlaying ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium truncate">
              <span className="text-[#a3ff12] mr-1">Preview:</span> 
              {previewTrack.title}
            </p>
            <p className="text-white/60 text-sm truncate">{previewTrack.artist}</p>
          </div>
          
          <button 
            onClick={stopPreview}
            className="ml-2 text-white/60 hover:text-white p-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl text-white">Search Results ({results.length})</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1 rounded text-sm font-medium bg-[#111] text-white/70 hover:bg-[#222] hover:text-white transition-all"
              >
                {selectedTracks.length === results.length ? 'Deselect All' : 'Select All'}
              </button>
              <button
                onClick={handleImport}
                disabled={selectedTracks.length === 0}
                className={`px-4 py-1 rounded text-sm font-bold ${
                  selectedTracks.length > 0 
                    ? 'bg-[#a3ff12] text-black hover:bg-[#8bde00]' 
                    : 'bg-[#222] text-white/50 cursor-not-allowed'
                } transition-all`}
              >
                Import Selected ({selectedTracks.length})
              </button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {results.map(track => {
              const isSelected = selectedTracks.some(t => t.id === track.id);
              const isPlaying = previewTrack?.id === track.id && isPreviewPlaying;
              
              return (
                <div 
                  key={track.id}
                  className={`flex items-center p-3 rounded cursor-pointer transition-all ${
                    isSelected ? 'bg-[#1a1a1a] border border-[#a3ff12]' : 'bg-[#111] border border-[#333] hover:border-white/30'
                  } ${isPlaying ? 'bg-[#1a1a1a]' : ''}`}
                >
                  <div className="w-6 mr-3 flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleTrackSelection(track)}
                      className="w-4 h-4 accent-[#a3ff12]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  <div 
                    className="w-10 h-10 bg-[#222] rounded mr-3 flex-shrink-0 overflow-hidden relative"
                    onClick={() => previewTrackAudio(track)}
                  >
                    {track.coverArt && (
                      <img 
                        src={track.coverArt}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Play/pause overlay */}
                    <div className={`absolute inset-0 bg-black/60 flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-0 hover:opacity-100'} transition-opacity`}>
                      {isPlaying ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="min-w-0 flex-1" onClick={() => toggleTrackSelection(track)}>
                    <p className="text-white font-medium truncate">{track.title}</p>
                    <p className="text-white/60 text-sm truncate">{track.artist}</p>
                  </div>
                  
                  <div className="ml-2 flex-shrink-0 flex items-center gap-3">
                    {track.bpm && (
                      <span className="text-white/50 text-xs bg-white/5 px-2 py-0.5 rounded">
                        {track.bpm} BPM
                      </span>
                    )}
                    <button 
                      className="text-[#a3ff12] hover:underline text-sm"
                      onClick={() => previewTrackAudio(track)}
                    >
                      {isPlaying ? 'Pause' : 'Preview'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-[#222]">
        <h4 className="text-xl text-white mb-3">Available Services</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {services.map(service => (
            <div 
              key={service.id}
              className={`p-3 rounded-lg border ${
                service.enabled 
                  ? activeService === service.id
                    ? 'border-[#a3ff12] bg-[#a3ff12]/10'
                    : 'border-[#333] bg-[#111]/80 hover:border-[#a3ff12]/50 cursor-pointer'
                  : 'border-[#333] bg-[#111]/50 opacity-60'
              }`}
              onClick={() => service.enabled && setService(service.id)}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={service.enabled ? "#a3ff12" : "#666"} strokeWidth="2">
                    <path d={service.icon} />
                  </svg>
                </div>
                <span className={`text-sm font-medium ${service.enabled ? 'text-white' : 'text-white/50'}`}>
                  {service.name}
                </span>
                {!service.enabled && (
                  <span className="ml-auto text-xs text-white/50">Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-white/50 mt-4">
          Note: API integration requires developer accounts and API keys from these services.
        </p>
      </div>
      
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
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MusicImporter;

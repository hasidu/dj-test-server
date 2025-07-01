"use client";

import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import RecordingsLatestTracks from '@/components/RecordingsLatestTracks';

export default function RecordingsPage() {
  
  // Sample track data with audio URLs - would come from a CMS or API in a real app  
  const latestTracks = [
    {
      id: 'track1',
      title: 'Gracias Papá - KYOTTO Remix',
      artist: 'ECHO DAFT',
      collaborators: 'Jayy Vibes, Kyotto',
      coverArt: '/images/event1.jpg',
      // Local audio file path - replace with your own .mp3 files
      audioUrl: '/audio/m1.mp3',
      // Fallback to streaming URL if local file isn't available yet
      fallbackUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/461985132',
      genre: 'Deep House',
      year: '2024'
    },
    {
      id: 'track2',
      title: 'Lazerbeam',
      artist: 'Kyotto',
      collaborators: 'ECHO DAFT',
      coverArt: '/images/event2.jpg',
      audioUrl: '/audio/lazerbeam.mp3',
      fallbackUrl: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3',
      genre: 'Tech House',
      year: '2023'
    },
    {
      id: 'track3',
      title: 'Mental - Matthew Sona Remix',
      artist: 'ECHO DAFT',
      collaborators: 'Matthew Sona',
      coverArt: '/images/event3.jpg',
      audioUrl: '/audio/mental-matthew-sona-remix.mp3',
      fallbackUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3',
      genre: 'Progressive House',
      year: '2024'
    },    {
      id: 'track4',
      title: 'Years of Ascent',
      artist: 'ECHO DAFT',
      collaborators: 'Keben van Reeken',
      coverArt: '/images/event4.jpg',
      audioUrl: '/audio/years-of-ascent.mp3',
      fallbackUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
      genre: 'Ambient',
      year: '2023'
    },
    {
      id: 'track5',
      title: 'Rewire - Echo Daft Remix',
      artist: 'Rocksa',
      collaborators: 'Randle, ECHO DAFT',
      coverArt: '/images/event5.jpg',
      audioUrl: '/audio/rewire-echo-daft-remix.mp3',
      fallbackUrl: 'https://assets.mixkit.co/music/preview/mixkit-house-your-mind-118.mp3',
      genre: 'House',
      year: '2024'
    },
    {
      id: 'track6',
      title: 'Confidential Cadence',
      artist: 'ECHO DAFT',
      collaborators: 'David Padnet',
      coverArt: '/images/event6.jpg',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hazy-after-hours-132.mp3',
      genre: 'Techno',
      year: '2023'
    },
    {
      id: 'track7',
      title: 'Mental',
      artist: 'ECHO DAFT',
      coverArt: '/images/event4.jpg',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3',
      genre: 'Deep House',
      year: '2023'
    },
    {
      id: 'track8',
      title: 'Dark Market',
      artist: 'ECHO DAFT',
      collaborators: 'Jayy Vibes',
      coverArt: '/images/event3.jpg',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-infected-vibes-157.mp3',
      bpm: 140,
      key: 'F# min',
      genre: 'Techno',
      year: '2024'
    },
  ];

  // Sample recordings - would come from a CMS or API in a real app
  const upcomingReleases = [
    {
      id: 'rec1',
      title: 'Jungle Rhythms EP',
      artist: 'DJ Malika',
      date: 'July 15, 2025',
      coverArt: '/images/event1.jpg',
      tracks: ['Deep Forest', 'Midnight Canopy', 'Dawn Chorus', 'Ancient Trees']
    },
    {
      id: 'rec2',
      title: 'Techno Visions',
      artist: 'Ricardo Torres',
      date: 'August 1, 2025',
      coverArt: '/images/event3.jpg',
      tracks: ['Machine Language', 'Detroit Memories', 'Industrial Complex', 'Futurist']
    },
    {
      id: 'rec3',
      title: 'Ambient Worlds',
      artist: 'Soundscape Collective',
      date: 'August 20, 2025',
      coverArt: '/images/event5.jpg',
      tracks: ['Floating', 'Ocean Floor', 'Cloud City', 'Mountain Dreams']
    }
  ];  return (
    <main className="pt-0">
      <PageHeader 
        title="RECORDINGS" 
        description="Explore our music catalog featuring releases and live sets from our events and artists."
      />      {/* Latest Tracks Music Player */}
      <RecordingsLatestTracks tracks={latestTracks} />
      {/* DJ Toolbox section removed temporarily */}
      
      {/* Coming Soon with Album Previews */}
      <section className="py-20 dark-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold mb-6 text-white inline-flex items-center">
                <span className="text-[#a3ff12] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                  </svg>
                </span>
                Upcoming Releases
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-4">
                We're currently curating our recordings collection. Check out our upcoming releases below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingReleases.map((release) => (
                <div key={release.id} className="glass-card overflow-hidden group transition-all duration-300 hover:border-[#a3ff12] hover:border-opacity-50">
                  <div className="relative aspect-square">
                    <Image
                      src={release.coverArt}
                      alt={release.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[#a3ff12] mb-1 font-bold">{release.artist}</p>
                      <h3 className="text-2xl font-bold text-white mb-1">{release.title}</h3>
                      <p className="text-gray-300 text-sm">{release.date}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Tracklist</h4>
                    <ul className="space-y-2">
                      {release.tracks.map((track, index) => (
                        <li key={index} className="flex items-center text-gray-300 hover:text-[#a3ff12] transition-colors">
                          <span className="w-6 text-center text-sm text-gray-500">{index + 1}</span>
                          <span className="ml-2">{track}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="mt-6 w-full py-3 border border-[#a3ff12] text-[#a3ff12] uppercase tracking-wider text-sm font-bold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all">
                      Pre-Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 p-8 bg-[#0a0a0a] border border-[#222]">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-white mb-4">Submit Your Music</h3>
                  <p className="text-gray-300 mb-6">
                    Are you an electronic music producer? We're always looking for fresh talent to feature
                    on our label. Submit your demo for consideration.
                  </p>
                  <button className="btn-primary">
                    Submit Demo
                  </button>
                </div>
                <div className="md:w-1/2 md:border-l md:border-[#222] md:pl-10">
                  <h3 className="text-2xl font-bold text-white mb-4">Distribution Partners</h3>
                  <p className="text-gray-300 mb-6">
                    Our music will be available on all major streaming platforms.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div className="w-12 h-12 bg-white bg-opacity-10 flex items-center justify-center">
                      <span className="text-2xl">🎵</span>
                    </div>
                    <div className="w-12 h-12 bg-white bg-opacity-10 flex items-center justify-center">
                      <span className="text-2xl">🎧</span>
                    </div>
                    <div className="w-12 h-12 bg-white bg-opacity-10 flex items-center justify-center">
                      <span className="text-2xl">📀</span>
                    </div>
                    <div className="w-12 h-12 bg-white bg-opacity-10 flex items-center justify-center">
                      <span className="text-2xl">🎶</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';
import MusicPlayer from '@/components/MusicPlayer';
import RecordingsLatestTracks from '@/components/RecordingsLatestTracks';

export default function RecordingsPage() {
  // Sample track data with audio URLs
  const latestTracks = [
    {
      id: 'track1',
      title: 'Gracias Papá - KYOTTO Remix',
      artist: 'ECHO DAFT',
      collaborators: 'Jayy Vibes, Kyotto',
      coverArt: '/images/event1.jpg',
      audioUrl: '/audio/m1.mp3',
      fallbackUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/461985132',
      genre: 'Deep House',
      year: '2024',
      duration: '5:23',
      bpm: 122,
      key: 'G minor'
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
      year: '2023',
      duration: '6:41',
      bpm: 126,
      key: 'A minor'
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
      year: '2024',
      duration: '7:15',
      bpm: 128,
      key: 'F# minor'
    },
    {
      id: 'track4',
      title: 'Years of Ascent',
      artist: 'ECHO DAFT',
      collaborators: 'Keben van Reeken',
      coverArt: '/images/event4.jpg',
      audioUrl: '/audio/years-of-ascent.mp3',
      fallbackUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
      genre: 'Ambient',
      year: '2023',
      duration: '8:32',
      bpm: 95,
      key: 'C major'
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
      year: '2024',
      duration: '4:58',
      bpm: 124,
      key: 'D minor'
    },
    {
      id: 'track6',
      title: 'Confidential Cadence',
      artist: 'ECHO DAFT',
      collaborators: 'David Padnet',
      coverArt: '/images/event6.jpg',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hazy-after-hours-132.mp3',
      genre: 'Techno',
      year: '2023',
      duration: '6:29',
      bpm: 132,
      key: 'E minor'
    },
    {
      id: 'track7',
      title: 'Mental',
      artist: 'ECHO DAFT',
      coverArt: '/images/event4.jpg',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3',
      genre: 'Deep House',
      year: '2023',
      duration: '5:47',
      bpm: 120,
      key: 'A# minor'
    },
    {
      id: 'track8',
      title: 'Dark Market',
      artist: 'ECHO DAFT',
      collaborators: 'Jayy Vibes',
      coverArt: '/images/event3.jpg',
      audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-infected-vibes-157.mp3',
      bpm: 140,
      key: 'F# minor',
      genre: 'Techno',
      year: '2024',
      duration: '7:03'
    },
  ];

  // Sample upcoming releases
  const upcomingReleases = [
    {
      id: 'rec1',
      title: 'Jungle Rhythms EP',
      artist: 'DJ Malika',
      date: 'July 15, 2025',
      coverArt: '/images/event1.jpg',
      tracks: ['Deep Forest', 'Midnight Canopy', 'Dawn Chorus', 'Ancient Trees'],
      genre: 'Deep House',
      label: 'La Foresta Records'
    },
    {
      id: 'rec2',
      title: 'Techno Visions',
      artist: 'Ricardo Torres',
      date: 'August 1, 2025',
      coverArt: '/images/event3.jpg',
      tracks: ['Machine Language', 'Detroit Memories', 'Industrial Complex', 'Futurist'],
      genre: 'Techno',
      label: 'La Foresta Records'
    },
    {
      id: 'rec3',
      title: 'Ambient Worlds',
      artist: 'Soundscape Collective',
      date: 'August 20, 2025',
      coverArt: '/images/event5.jpg',
      tracks: ['Floating', 'Ocean Floor', 'Cloud City', 'Mountain Dreams'],
      genre: 'Ambient',
      label: 'La Foresta Records'
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Animated Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGridBackground />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">RECORDINGS</span>
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-white mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Explore our curated collection of electronic music releases, featuring original tracks, remixes, and exclusive collaborations from our label artists
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Music Player Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Music Player</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience our tracks with our professional-grade music player featuring interactive waveforms and immersive visuals
              </p>
            </div>
            
            {/* Music Player Component */}
            <MusicPlayer tracks={latestTracks} />
          </motion.div>
        </div>
      </section>

      {/* Upcoming Releases */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/10 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Upcoming Releases
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Get ready for the next wave of electronic music from our talented artists
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingReleases.map((release, index) => (
                <motion.div 
                  key={release.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={release.coverArt}
                      alt={release.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-xs font-semibold mb-2">
                        {release.genre}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-1">{release.title}</h3>
                      <p className="text-gray-300 text-sm mb-1">{release.artist}</p>
                      <p className="text-gray-400 text-xs">{release.date}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Tracklist</h4>
                      <ul className="space-y-2">
                        {release.tracks.map((track, trackIndex) => (
                          <li key={trackIndex} className="flex items-center text-gray-300 hover:text-white transition-colors">
                            <span className="w-6 text-center text-sm text-gray-500">{trackIndex + 1}</span>
                            <span className="ml-2 text-sm">{track}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-xs text-gray-400 mb-3">{release.label}</p>
                      <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 font-medium">
                        Pre-Save Release
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artist Submission & Distribution Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Submit Music */}
                <div>
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Submit Your Music</h3>
                    <p className="text-gray-300 mb-6">
                      Are you an electronic music producer? We're always looking for fresh talent to feature
                      on our label. Submit your demo for consideration and join our growing family of artists.
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-gray-400">
                      <svg className="w-4 h-4 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Professional feedback within 2 weeks
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg className="w-4 h-4 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Global distribution support
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg className="w-4 h-4 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Marketing and promotional support
                    </div>
                  </div>
                  
                  <motion.button 
                    className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Demo
                  </motion.button>
                </div>

                {/* Distribution Partners */}
                <div>
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Global Distribution</h3>
                    <p className="text-gray-300 mb-6">
                      Our music is available on all major streaming platforms worldwide, ensuring maximum reach for our artists.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { name: 'Spotify', icon: '🎵' },
                      { name: 'Apple Music', icon: '🎧' },
                      { name: 'Beatport', icon: '📀' },
                      { name: 'SoundCloud', icon: '🎶' },
                      { name: 'Bandcamp', icon: '💿' },
                      { name: 'YouTube Music', icon: '📺' },
                      { name: 'Amazon Music', icon: '📱' },
                      { name: 'Tidal', icon: '🌊' }
                    ].map((platform, index) => (
                      <motion.div 
                        key={platform.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="aspect-square bg-gray-800/50 rounded-xl flex flex-col items-center justify-center p-3 hover:bg-gray-700/50 transition-colors group"
                      >
                        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{platform.icon}</span>
                        <span className="text-xs text-gray-400 text-center">{platform.name}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-800/30 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Release Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">150+</div>
                        <div className="text-xs text-gray-400">Platforms</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">50M+</div>
                        <div className="text-xs text-gray-400">Monthly Streams</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

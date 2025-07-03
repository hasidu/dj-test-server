"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function InterviewsPage() {
  const interviewsList = [
    {
      id: 'aaron-suiss',
      name: 'AARON SUISS',
      location: 'USA',
      image: '/images/team-member1.jpg',
      date: 'June 12, 2025',
      excerpt: 'Aaron shares his journey from small-town clubs to international stages, and his unique approach to blending house and techno.',
      duration: '45 min',
      genre: 'House/Techno',
      highlights: ['First international gig', 'Creative process', 'Future projects']
    },
    {
      id: 'dj-ruby',
      name: 'DJ RUBY',
      location: 'Malta',
      image: '/images/team-member2.jpg',
      date: 'June 5, 2025',
      excerpt: 'Ruby discusses her technical approach to DJing and how her sound has evolved throughout her career in the Mediterranean scene.',
      duration: '38 min',
      genre: 'Progressive House',
      highlights: ['Technical skills', 'Mediterranean influence', 'Production tips']
    },
    {
      id: 'marco-silva',
      name: 'MARCO SILVA',
      location: 'Portugal',
      image: '/images/team-member3.jpg',
      date: 'May 28, 2025',
      excerpt: 'Marco opens up about his transition from classical music to electronic, and his philosophy on creating emotional connections through sound.',
      duration: '52 min',
      genre: 'Melodic Techno',
      highlights: ['Classical background', 'Emotional storytelling', 'Live performance']
    },
    {
      id: 'nina-kross',
      name: 'NINA KROSS',
      location: 'Germany',
      image: '/images/team-member4.jpg',
      date: 'May 15, 2025',
      excerpt: 'Nina discusses the Berlin underground scene, her label management experience, and breaking barriers as a female artist.',
      duration: '41 min',
      genre: 'Industrial Techno',
      highlights: ['Berlin scene', 'Label management', 'Female empowerment']
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
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-white">INTERVIEWS</span>
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
              Behind the beats: Exclusive conversations with top DJs
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              LA FORESTA brings you up close and personal with the masters of the turntables. 
              Get insights and inspirations from the biggest names in the music industry.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Interviews Grid Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-white">Featured</span>
              <span className="text-gray-500 ml-2">Conversations</span>
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {interviewsList.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500">
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={interview.image}
                      alt={interview.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Duration Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm text-white">
                        {interview.duration}
                      </span>
                    </div>
                    
                    {/* Genre Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/20">
                        {interview.genre}
                      </span>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                      >
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{interview.name}</h3>
                      <span className="text-gray-400 text-sm">{interview.location}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{interview.date}</p>
                    <p className="text-gray-300 leading-relaxed mb-6">{interview.excerpt}</p>
                    
                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Key Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {interview.highlights.map((highlight, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300 border border-gray-700"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Link 
                        href={`/interviews/${interview.id}`}
                        className="flex-1 text-center py-3 px-6 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-300"
                      >
                        READ FULL INTERVIEW
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 border border-gray-600 rounded-xl hover:border-white transition-colors duration-300"
                      >
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Never Miss An Interview
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get notified when we publish new exclusive conversations with your favorite artists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-white focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

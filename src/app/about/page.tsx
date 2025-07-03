"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Rivera",
      position: "Founder & Creative Director",
      image: "/images/team-member1.jpg",
      bio: "With over 15 years in the electronic music scene, Alex founded La Foresta to bridge underground artists with passionate audiences.",
      social: {
        instagram: "https://instagram.com/alexrivera",
        twitter: "https://twitter.com/alexrivera",
        linkedin: "https://linkedin.com/in/alexrivera"
      }
    },
    {
      name: "Maya Chen",
      position: "Head of Artist Relations",
      image: "/images/team-member2.jpg",
      bio: "Maya's extensive network and keen ear for talent have brought some of the most exciting underground artists to our stages.",
      social: {
        instagram: "https://instagram.com/mayachen",
        twitter: "https://twitter.com/mayachen",
        linkedin: "https://linkedin.com/in/mayachen"
      }
    },
    {
      name: "Jordan Blake",
      position: "Technical Director",
      image: "/images/team-member3.jpg",
      bio: "Jordan ensures every La Foresta event delivers pristine sound quality and stunning visual experiences that complement the music.",
      social: {
        instagram: "https://instagram.com/jordanblake",
        twitter: "https://twitter.com/jordanblake",
        linkedin: "https://linkedin.com/in/jordanblake"
      }
    },
    {
      name: "Sam Torres",
      position: "Community Manager",
      image: "/images/team-member4.jpg",
      bio: "Sam builds and nurtures our community, ensuring every attendee feels welcomed and connected to the La Foresta family.",
      social: {
        instagram: "https://instagram.com/samtorres",
        twitter: "https://twitter.com/samtorres",
        linkedin: "https://linkedin.com/in/samtorres"
      }
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
              <span className="text-white">ABOUT</span>
              {/* <span className="block text-gray-500">US</span> */}
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The passionate team behind unforgettable electronic music experiences
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">
                <span className="text-white">Our</span>
                <span className="text-gray-500 ml-2">Story</span>
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  La Foresta was born in 2020 from a shared passion for underground electronic music and a desire to create 
                  exceptional experiences that bring people together. What started as small gatherings among friends has grown 
                  into one of the most respected event companies in the industry.
                </p>
                <p>
                  We believe that music has the power to connect people across boundaries and create lasting memories. 
                  Our events are designed to be more than just concerts – they're immersive experiences that engage all the senses.
                </p>
                <p>
                  From intimate club nights to sprawling outdoor festivals, each La Foresta event is crafted with careful attention 
                  to detail, from the lineup to the venue, sound system, lighting, and overall atmosphere.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image 
                  src="/images/about-image.jpg" 
                  alt="La Foresta team" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image 
                  src="/images/about-image2.jpg" 
                  alt="La Foresta event" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl font-bold mb-8">
                <span className="text-white">Our</span>
                <span className="text-gray-500 ml-2">Mission</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                At La Foresta, our mission is to create meaningful connections through music by showcasing the best underground 
                artists from around the world to passionate music lovers.
              </p>
              
              <div className="space-y-4">
                {[
                  "Support emerging and established artists who push boundaries in electronic music",
                  "Create safe, inclusive spaces where people from all backgrounds can connect",
                  "Curate unique experiences that leave lasting impressions",
                  "Prioritize quality in every aspect of our events",
                  "Foster a community of music lovers who share our passion"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Team Section */}
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
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-white">Meet Our</span>
              <span className="text-gray-500 ml-2">Team</span>
            </h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The passionate individuals who make the magic happen behind the scenes at La Foresta
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500">
                  {/* Image Section */}
                  <div className="relative h-80 overflow-hidden">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Social Links Overlay */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </motion.a>
                      <motion.a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </motion.a>
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-6">{member.position}</p>
                    <div className="w-12 h-1 bg-white mb-6"></div>
                    <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

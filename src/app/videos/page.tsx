import Image from 'next/image';

export const metadata = {
  title: 'Videos | La Foresta Events',
  description: 'Watch performances, interviews, and behind-the-scenes content from La Foresta events',
};

export default function VideosPage() {
  // Sample video previews - would come from a CMS or API in a real app
  const upcomingVideos = [
    {
      id: 'vid1',
      title: 'DJ Malika at La Foresta Underground',
      date: 'Coming July 2025',
      thumbnail: '/images/event1.jpg',
      duration: '17:42'
    },
    {
      id: 'vid2',
      title: 'Behind the Scenes: Forest Stage Setup',
      date: 'Coming July 2025',
      thumbnail: '/images/event2.jpg',
      duration: '08:15'
    },
    {
      id: 'vid3',
      title: 'Interview with Ricardo Torres',
      date: 'Coming August 2025',
      thumbnail: '/images/event4.jpg',
      duration: '22:30'
    },
    {
      id: 'vid4',
      title: 'La Foresta Summer Festival Highlights',
      date: 'Coming August 2025',
      thumbnail: '/images/event5.jpg',
      duration: '15:20'
    }
  ];

  return (
    <main className="pt-20">
      {/* Videos Header */}
      <div className="relative bg-black text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: 'url("/images/event2.jpg")',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-start mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white uppercase tracking-wider">
              VIDEOS
            </h1>
            <div className="w-20 h-1 bg-[#a3ff12] mb-6"></div>
            <p className="text-gray-300 max-w-2xl">
              Explore our video collection featuring performances, interviews, and 
              behind-the-scenes footage from La Foresta events.
            </p>
          </div>
        </div>
      </div>
      
      {/* Coming Soon - Stylized with Video Previews */}
      <section className="py-20 dark-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-6 text-white inline-flex items-center">
                <span className="text-[#a3ff12] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </span>
                Coming Soon
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We're currently editing and preparing our video content. Our first videos will be released in July 2025,
                featuring exclusive footage from our events, artist interviews, and behind-the-scenes content.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingVideos.map((video) => (
                <div key={video.id} className="glass-card overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#a3ff12] text-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 px-2 py-1 text-white text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                    <p className="text-[#a3ff12] text-sm">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 glass-card p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Request Specific Content</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Is there a specific event or artist you'd like to see featured in our videos?
                Let us know and we'll consider your request for our upcoming releases.
              </p>
              <div className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow p-3 bg-[#0f0f0f] border border-[#222] text-white focus:border-[#a3ff12] focus:outline-none"
                />
                <button className="btn-primary whitespace-nowrap">
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

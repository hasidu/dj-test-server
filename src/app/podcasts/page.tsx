export const metadata = {
  title: 'Podcasts | La Foresta Events',
  description: 'Listen to our curated podcasts featuring the best in electronic music',
};

export default function PodcastsPage() {
  // Sample podcast episodes - would come from a CMS or API in a real app
  const upcomingPodcasts = [
    {
      id: 'pod1',
      title: 'Deep House Sessions Vol. 1',
      artist: 'DJ Malika',
      date: 'Coming July 2025',
      description: 'A journey through atmospheric deep house sounds'
    },
    {
      id: 'pod2',
      title: 'Techno Underground Mix',
      artist: 'Ricardo Torres',
      date: 'Coming July 2025',
      description: 'Hard-hitting techno from Berlin to Detroit'
    },
    {
      id: 'pod3',
      title: 'Ambient Explorations',
      artist: 'Soundscape Collective',
      date: 'Coming August 2025',
      description: 'Meditative ambient and electronic textures'
    }
  ];

  return (
    <main className="pt-20">
      {/* Podcasts Header */}
      <div className="relative bg-black text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: 'url("/images/event3.jpg")',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-start mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white uppercase tracking-wider">
              PODCASTS
            </h1>
            <div className="w-20 h-1 bg-[#a3ff12] mb-6"></div>
            <p className="text-gray-300 max-w-2xl">
              Tune in to our curated podcast series featuring exclusive mixes and sets from 
              the most talented electronic music artists around the world.
            </p>
          </div>
        </div>
      </div>
      
      {/* Coming Soon - Stylized */}
      <section className="py-20 dark-section">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
              <span className="text-[#a3ff12] mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
              </span>
              Coming Soon
            </h2>
            <p className="text-gray-300 mb-10">
              We're currently preparing our podcast series with incredible electronic music content. 
              Our first episodes will drop in July 2025, featuring exclusive sets and interviews from top underground artists.
            </p>
            
            <div className="space-y-6 mt-10">
              {upcomingPodcasts.map((podcast) => (
                <div key={podcast.id} className="border border-[#1a1a1a] bg-[#0a0a0a] p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-14 h-14 bg-[#a3ff12] text-black flex items-center justify-center flex-shrink-0 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white">{podcast.title}</h3>
                    <p className="text-[#a3ff12] mb-1">{podcast.artist}</p>
                    <p className="text-gray-400 text-sm mb-2">{podcast.date}</p>
                    <p className="text-gray-300">{podcast.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-6 border border-[#a3ff12] border-opacity-30 bg-black bg-opacity-50">
              <h3 className="text-xl font-bold text-white mb-4">Get Notified</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter and be the first to know when new podcast episodes drop.
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow p-3 bg-[#0f0f0f] border border-[#222] text-white focus:border-[#a3ff12] focus:outline-none"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

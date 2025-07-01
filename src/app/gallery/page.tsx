import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Gallery | La Foresta Events',
  description: 'Photo gallery of our past events and unforgettable moments',
};

export default function GalleryPage() {
  // Sample gallery items - in a real app, this might come from a CMS or database
  const galleryItems = [
    {
      id: 'gallery1',
      image: '/images/event1.jpg',
      title: 'SPECTRUM DJ RUBY BACK TO PARADISE',
      location: 'COLOMBO',
      date: '04 FEB 2025'
    },
    {
      id: 'gallery2',
      image: '/images/event2.jpg',
      title: 'SPECTRUM DJ RUBY',
      location: 'COLOMBO',
      date: '21 JAN 2025'
    },
    {
      id: 'gallery3',
      image: '/images/event3.jpg',
      title: 'SOULFUL ARTIST LABEL SHOWCASE',
      location: 'COLOMBO',
      date: '15 DEC 2024'
    },
    {
      id: 'gallery4',
      image: '/images/event4.jpg',
      title: 'SPECTRUM DJ INNA CATHERINES',
      location: 'COLOMBO',
      date: '05 NOV 2024'
    },
    {
      id: 'gallery5',
      image: '/images/event5.jpg',
      title: 'UNDERGROUND SESSIONS VOL.3',
      location: 'COLOMBO',
      date: '20 OCT 2024'
    },
    {
      id: 'gallery6',
      image: '/images/event6.jpg',
      title: 'FORESTA AMBIENT NIGHT',
      location: 'COLOMBO',
      date: '12 SEP 2024'
    },
    {
      id: 'gallery7',
      image: '/images/event1.jpg',
      title: 'TECHNO TUESDAY',
      location: 'COLOMBO',
      date: '30 AUG 2024'
    },
    {
      id: 'gallery8',
      image: '/images/event2.jpg',
      title: 'SUMMER CLOSING PARTY',
      location: 'COLOMBO',
      date: '15 AUG 2024'
    }
  ];  return (
    <main className="bg-black min-h-screen pt-0">      <PageHeader 
        title="GALLERY" 
        description="Take a look at moments from our past events. The energy, the people, the music - all captured to relive the experience."
      />
      
      {/* Filter Bar */}
      <div className="sticky top-0 bg-black bg-opacity-90 backdrop-blur-md z-30 py-4 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-800">
              <button className="text-[#a3ff12] border-b-2 border-[#a3ff12] py-1 px-2 whitespace-nowrap">All Photos</button>
              <button className="text-gray-400 hover:text-white py-1 px-2 whitespace-nowrap">2025</button>
              <button className="text-gray-400 hover:text-white py-1 px-2 whitespace-nowrap">2024</button>
              <button className="text-gray-400 hover:text-white py-1 px-2 whitespace-nowrap">Spectrum</button>
              <button className="text-gray-400 hover:text-white py-1 px-2 whitespace-nowrap">Label Showcase</button>
            </div>
            
            <div className="mt-2 sm:mt-0">
              <select className="bg-[#0a0a0a] text-gray-300 border border-gray-800 py-1 px-3 rounded focus:outline-none focus:ring-1 focus:ring-[#a3ff12]">
                <option>Latest</option>
                <option>Oldest</option>
                <option>Popular</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="group relative overflow-hidden">
                <div className="aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-black bg-opacity-50 p-2 rounded-full">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div>
                    <p className="text-xs text-[#a3ff12]">{item.location} • {item.date}</p>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="bg-transparent border border-[#a3ff12] text-[#a3ff12] px-8 py-3 hover:bg-[#a3ff12] hover:text-black transition-colors uppercase tracking-wider">
              Load More
            </button>
          </div>
        </div>
      </section>
      
      {/* Newsletter/Contact Section */}
      <section className="py-16 bg-[#191900] relative">
        <div className="absolute right-0 bottom-0 w-1/3 h-full z-0">
          <Image 
            src="/images/about-image2.jpg" 
            alt="Leafy Background" 
            fill 
            className="object-cover object-left"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-white mb-2">
              We welcome all interested souls<br />
              <span className="text-gray-400 font-normal">to get in touch with us.</span>
            </h2>
            
            <div className="mt-6">
              <Link 
                href="/contact" 
                className="inline-block border border-white text-white px-8 py-2 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link href="mailto:laforesta.official@gmail.com" className="text-gray-400 text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                laforesta.official@gmail.com
              </Link>
            </div>
            
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-500 hover:text-[#a3ff12] transition-colors text-xs uppercase">Home</Link>
              <Link href="/events" className="text-gray-500 hover:text-[#a3ff12] transition-colors text-xs uppercase">Events</Link>
              <Link href="/about" className="text-gray-500 hover:text-[#a3ff12] transition-colors text-xs uppercase">About</Link>
              <Link href="/interviews" className="text-gray-500 hover:text-[#a3ff12] transition-colors text-xs uppercase">Interviews</Link>
              <Link href="/videos" className="text-gray-500 hover:text-[#a3ff12] transition-colors text-xs uppercase">Videos</Link>
              <Link href="/recordings" className="text-gray-500 hover:text-[#a3ff12] transition-colors text-xs uppercase">Recordings</Link>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Image 
                src="/images/logo.png" 
                alt="La Foresta Logo" 
                width={40} 
                height={40} 
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener" className="text-gray-500 hover:text-[#a3ff12]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener" className="text-gray-500 hover:text-[#a3ff12]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.157 1.2A4.92 4.92 0 0016.327 2a4.935 4.935 0 00-4.93 4.93c0 .39.033.765.114 1.124A13.98 13.98 0 011.64 3.16a4.822 4.822 0 00-.665 2.473c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
              </svg>
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener" className="text-gray-500 hover:text-[#a3ff12]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
          </div>
          
          <div className="text-center mt-8 text-gray-600 text-xs">
            <p>© LA FORESTA {new Date().getFullYear()}</p>
            <p className="mt-1">DESIGN BY <span className="text-gray-500">PIXEL DESIGNS</span> DEVELOPED BY <span className="text-gray-500">IMFL</span></p>
          </div>
        </div>
      </footer>
    </main>
  );
}

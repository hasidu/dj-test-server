import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'News | La Foresta Events',
  description: 'Latest news, announcements and updates from La Foresta',
};

export default function NewsPage() {
  // Sample news items - in a real app, this would come from a CMS or database
  const newsItems = [
    {
      id: 'news1',
      title: 'LA FORESTA Announces New Resident DJs for Summer 2025',
      date: 'June 10, 2025',
      excerpt: "We're thrilled to welcome three new resident DJs to our summer lineup. Each brings a unique style that perfectly complements our musical vision.",
      image: '/images/event5.jpg',
      category: 'Announcements'
    },
    {
      id: 'news2',
      title: 'New Venue Announced for Our Signature Underground Series',
      date: 'June 5, 2025',
      excerpt: "After months of searching, we've found the perfect new home for our Underground Series events. The location will be revealed two days before each event.",
      image: '/images/event6.jpg',
      category: 'Events'
    },
    {
      id: 'news3',
      title: 'LA FORESTA Podcast Launches Next Month',
      date: 'May 28, 2025',
      excerpt: 'Our new monthly podcast will feature exclusive mixes from our resident DJs and special guests from around the globe.',
      image: '/images/event1.jpg',
      category: 'Media'
    },
    {
      id: 'news4',
      title: 'Summer Festival Lineup Revealed',
      date: 'May 15, 2025',
      excerpt: 'Our biggest event of the year is coming this summer with a stellar lineup of international talent across three stages.',
      image: '/images/event2.jpg',
      category: 'Events'
    },    {
      id: 'news5',
      title: 'LA FORESTA Expands to New Cities in 2025',
      date: 'May 3, 2025',
      excerpt: 'After our success in Colombo, we\'re excited to announce expansion plans to three new cities across Southeast Asia.',
      image: '/images/event3.jpg',
      category: 'Announcements'
    },
    {
      id: 'news6',
      title: 'Exclusive Merchandise Collection Drops This Week',
      date: 'April 28, 2025',
      excerpt: 'Our limited edition merchandise featuring designs by local artists will be available online and at our next event.',
      image: '/images/event4.jpg',
      category: 'Merchandise'
    }
  ];
  
  // Get categories for filter
  const categories = Array.from(new Set(newsItems.map(item => item.category)));
  return (
    <main className="pt-0">      <PageHeader 
        title="NEWS" 
        description="Stay updated with the latest announcements, event details, and happenings from La Foresta Events."
      />
      
      {/* Filter Bar */}
      <div className="bg-[#0a0a0a] border-y border-[#222] sticky top-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center py-4 gap-3">
            <span className="text-gray-400 text-sm mr-2">Filter by:</span>
            <button className="px-4 py-1.5 text-sm bg-[#a3ff12] text-black font-medium rounded-sm">
              All
            </button>
            {categories.map((category) => (
              <button 
                key={category}
                className="px-4 py-1.5 text-sm bg-[#161616] text-white hover:bg-[#202020] rounded-sm transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured News */}
      <section className="py-12 bg-[#080808]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative aspect-[16/9] lg:aspect-auto">
              <Image
                src={newsItems[0].image}
                alt={newsItems[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className="inline-block px-3 py-1 bg-[#a3ff12] text-black text-xs font-bold mb-3">
                  {newsItems[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {newsItems[0].title}
                </h2>
                <p className="text-gray-300 mb-4 max-w-xl">
                  {newsItems[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm">{newsItems[0].date}</p>
                  <Link 
                    href={`/news/${newsItems[0].id}`} 
                    className="text-[#a3ff12] hover:underline inline-flex items-center group"
                  >
                    READ MORE
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {newsItems.slice(1, 5).map((item) => (
                <div key={item.id} className="glass-card overflow-hidden flex flex-col group">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="inline-block px-2 py-1 bg-[#a3ff12] text-black text-xs font-bold">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a3ff12] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                    <Link 
                      href={`/news/${item.id}`} 
                      className="mt-auto text-[#a3ff12] text-sm hover:underline inline-flex items-center group"
                    >
                      READ MORE
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* News Grid */}
      <section className="py-16 dark-section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <span className="w-10 h-1 bg-[#a3ff12] mr-4"></span>
            Latest News
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <div key={item.id} className="bg-[#0a0a0a] border border-[#222] overflow-hidden group hover:border-[#a3ff12] transition-colors">
                <div className="relative aspect-video">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 bg-[#a3ff12] text-black text-xs font-bold">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#a3ff12] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">{item.date}</p>
                  <p className="text-gray-300 mb-6">{item.excerpt}</p>
                  <Link 
                    href={`/news/${item.id}`} 
                    className="text-[#a3ff12] hover:underline inline-flex items-center group"
                  >
                    READ MORE
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-1">
              <button className="w-10 h-10 flex items-center justify-center bg-[#a3ff12] text-black font-bold">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-[#161616] text-white hover:bg-[#222]">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-[#161616] text-white hover:bg-[#222]">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-[#161616] text-white hover:bg-[#222]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#222]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Stay Up To Date
                </h2>
                <p className="text-gray-300 mb-6">
                  Subscribe to our newsletter and be the first to get the latest news, 
                  event announcements, and exclusive content.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
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
              <div className="md:w-1/3 flex justify-center">
                <div className="w-20 h-20 bg-[#a3ff12] rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>      </section>
    </main>
  );
}

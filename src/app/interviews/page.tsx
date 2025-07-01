import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Interviews | La Foresta Events',
  description: 'Exclusive interviews with top DJs and artists from around the world',
};

export default function InterviewsPage() {
  const interviewsList = [
    {
      id: 'aaron-suiss',
      name: 'AARON SUISS',
      location: 'USA',
      image: '/images/team-member1.jpg',
      date: 'June 12, 2025',
      excerpt: 'Aaron shares his journey from small-town clubs to international stages, and his unique approach to blending house and techno.'
    },
    {
      id: 'dj-ruby',
      name: 'DJ RUBY',
      location: 'Malta',
      image: '/images/team-member2.jpg',
      date: 'June 5, 2025',
      excerpt: 'Ruby discusses her technical approach to DJing and how her sound has evolved throughout her career in the Mediterranean scene.'
    }
  ];  return (
    <main className="bg-black min-h-screen pt-0">      <PageHeader 
        title="INTERVIEWS" 
        description="Exclusive conversations with the artists and minds behind the music. Get to know the creative forces shaping our events."
      />
      
      {/* Hero Section with Background - matching the reference image */}
      <div className="relative w-full h-screen bg-black">
        <div className="absolute inset-0 z-0 opacity-60">
          <Image 
            src="/images/event3.jpg" 
            alt="Interview Background" 
            fill 
            className="object-cover" 
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-80 z-10"></div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-accent-green block">LA FORESTA</span> 
            <span className="text-white">INTERVIEWS</span>
          </h1>
          
          <div className="max-w-3xl mx-auto mt-8 mb-12">
            <p className="text-white text-lg mb-2">Behind the beats: Exclusive interviews with top DJs.</p>
            <p className="text-gray-400">
              LA FORESTA brings you up close and personal with the masters of the turntables. 
              Check out our interview page for insights and inspirations from the biggest names in the music industry.
            </p>
          </div>
        </div>
      </div>
        {/* Interviews Section - Matching the reference image */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {interviewsList.map((interview) => (
              <div key={interview.id} className="flex flex-col items-center text-center">
                <div className="relative w-64 h-64 mb-8 rounded-full overflow-hidden border-4 border-accent-green glow">
                  <Image
                    src={interview.image}
                    alt={interview.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{interview.name}</h2>
                <p className="text-accent-green mb-4">{interview.location}</p>
                <p className="text-gray-300 mb-6 max-w-md">{interview.excerpt}</p>
                <Link 
                  href={`/interviews/${interview.id}`} 
                  className="mt-4 inline-block text-accent-green border border-accent-green px-4 py-2 hover:bg-accent-green hover:text-black transition duration-300 uppercase text-sm tracking-wider"
                >
                  VIEW MORE
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Newsletter/Contact Section - Matching reference image */}
      <section className="py-16 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/3 h-full z-0">
          <Image 
            src="/images/about-image2.jpg" 
            alt="Leafy Background" 
            fill 
            className="object-cover object-left"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              We welcome all interested souls<br />
              <span className="text-accent-green">to get in touch with us.</span>
            </h2>
            
            <div className="mt-6">
              <Link 
                href="/contact" 
                className="inline-block border border-accent-green text-accent-green px-8 py-3 uppercase tracking-wider text-sm hover:bg-accent-green hover:text-black transition duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
        {/* Footer - Matching reference image */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link href="mailto:laforesta.official@gmail.com" className="text-gray-400 text-sm flex items-center hover:text-accent-green transition-colors">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                laforesta.official@gmail.com
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
              <Link href="/" className="text-gray-500 hover:text-accent-green transition-colors text-xs uppercase">Home</Link>
              <Link href="/events" className="text-gray-500 hover:text-accent-green transition-colors text-xs uppercase">Events</Link>
              <Link href="/about" className="text-gray-500 hover:text-accent-green transition-colors text-xs uppercase">About</Link>
              <Link href="/interviews" className="text-gray-500 hover:text-accent-green transition-colors text-xs uppercase">Interviews</Link>
              <Link href="/videos" className="text-gray-500 hover:text-accent-green transition-colors text-xs uppercase">Videos</Link>
              <Link href="/recordings" className="text-gray-500 hover:text-accent-green transition-colors text-xs uppercase">Recordings</Link>
            </div>
            
            <div>
              <Image 
                src="/images/logo.png" 
                alt="La Foresta Logo" 
                width={60} 
                height={60}
                className="h-auto" 
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener" className="text-gray-500 hover:text-accent-green transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener" className="text-gray-500 hover:text-accent-green transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.157 1.2A4.92 4.92 0 0016.327 2a4.935 4.935 0 00-4.93 4.93c0 .39.033.765.114 1.124A13.98 13.98 0 011.64 3.16a4.822 4.822 0 00-.665 2.473c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
              </svg>
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener" className="text-gray-500 hover:text-accent-green transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

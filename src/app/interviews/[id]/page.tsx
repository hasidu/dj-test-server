import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function InterviewPage({ params }: { params: { id: string } }) {
  // Mock data for interviews - in a production app, this would come from a database or CMS
  const interviews = {
    'aaron-suiss': {
      name: 'AARON SUISS',
      location: 'USA',
      image: '/images/team-member1.jpg',
      date: 'June 12, 2025',
      fullInterview: [
        {
          question: "How did you first get into electronic music?",
          answer: "I grew up in a musical household – my dad was always playing classic rock and my mom loved disco. When I was about 15, my older cousin took me to my first warehouse party in Brooklyn. That night changed everything for me. The energy, the community, the way the music moved people – I was hooked instantly."
        },
        {
          question: "Your sound has evolved a lot over the years. How would you describe your current style?",
          answer: "I'd say it's a fusion of deep melodic techno with progressive house elements. I love building atmospheric layers that create an emotional journey, but I always keep a solid, driving rhythm as the foundation. Lately, I've been incorporating more organic samples too – field recordings from my travels, found sounds that have interesting textures. I'm always looking for that perfect balance between the dance floor energy and a more introspective listening experience."
        },
        {
          question: "What's your production setup like?",
          answer: "I keep it pretty minimal actually, which sometimes surprises people. I have a small home studio with a few key analog pieces – a Moog Sub 37 that I absolutely love, a Dave Smith Prophet, and some vintage drum machines. But honestly, a lot of my work happens in the box. I'm a big believer that limitations foster creativity, so I try not to get too caught up in having every piece of gear. It's more about really knowing your tools inside and out."
        },
        {
          question: "You've played all over the world. Any favorite venues or crowds?",
          answer: "That's always such a tough question! Berlin will always have a special place in my heart – the crowd there is so educated about the music and they're there for the full journey, not just big drops or popular tracks. But I also love playing in South America, especially Argentina. The energy there is unmatched; people are so passionate. I played a sunrise set in Buenos Aires last year that was pure magic – one of those moments where everything just clicked perfectly."
        },
        {
          question: "What's next for you?",
          answer: "I've got a new EP coming out next month on Innervisions, which I'm really excited about. It's a bit of a departure for me, more dreamy and ambient-influenced than my usual stuff. And I'm working on a live audio-visual show that will debut at the end of the year – something more immersive that tells a story beyond just the music. I want to create experiences that stay with people long after the night ends."
        }
      ]
    },
    'dj-ruby': {
      name: 'DJ RUBY',
      location: 'Malta',
      image: '/images/team-member2.jpg',
      date: 'June 5, 2025',
      fullInterview: [
        {
          question: "You've been a defining voice in the Mediterranean scene for years. How did that journey begin?",
          answer: "It wasn't exactly a straight path! I actually studied classical piano for 12 years, and I think that musical foundation has been crucial to everything I do now. I started DJing at university parties just for fun, but I was always the one curating playlists for friends anyway. Malta has this interesting position between European and North African influences, and I try to represent that cultural fusion in my sound."
        },
        {
          question: "Your technical approach to mixing is quite distinctive. Can you tell us about your process?",
          answer: "I'm very focused on harmonic mixing – making sure tracks flow together not just rhythmically but tonally. I spend hours analyzing and preparing my music, tagging everything meticulously. During sets, I love to create these long, blended transitions where three tracks might be playing simultaneously, each contributing different elements. It creates this textured sound that's greater than the sum of its parts. But I'm not a purist – sometimes the magic happens in those unplanned moments too."
        },
        {
          question: "How has the scene in Malta evolved over the years?",
          answer: "It's been incredible to witness. When I started, we had maybe two proper clubs and a handful of DJs pushing underground sounds. Now we have international festivals, a strong local artist community, and tourists coming specifically for the music. I helped start a collective to nurture local talent, and seeing those artists now playing around Europe is so rewarding. The challenge is maintaining that authentic island identity while connecting to global trends."
        },
        {
          question: "Your productions often feature collaborations with traditional Mediterranean musicians. What draws you to that fusion?",
          answer: "I'm passionate about preserving cultural heritage while pushing it forward. There are these incredible instrumental traditions that younger generations might not connect with in their original form, but when you contextualize those sounds in electronic music, something magical happens. I worked with a 70-year-old oud player last year who had never heard techno before our session, and by the end, he was suggesting rhythmic patterns that were completely innovative. Those cross-generational, cross-cultural exchanges are what keep music evolving."
        },
        {
          question: "What can we expect from your upcoming releases?",
          answer: "I've just finished a full-length album that I've been working on for nearly two years. It's my most personal work yet, exploring themes of identity and belonging. Each track represents a different port city around the Mediterranean, blending electronic elements with location recordings and local musicians from each place. The album tells the story of historical migration patterns and how culture moves across water. It's accompanied by a documentary film too, which will be out this fall."
        }
      ]
    }
  };

  const interview = interviews[params.id as keyof typeof interviews];
  
  if (!interview) {
    notFound();
  }
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh]">
        <div className="absolute inset-0">
          <Image 
            src={interview.image} 
            alt={interview.name} 
            fill 
            className="object-cover" 
          />          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 p-8 md:p-16 z-10">
          <Link href="/interviews" className="text-accent-green mb-6 flex items-center hover:underline group">
            <svg className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Interviews
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white">{interview.name}</h1>
          <p className="text-accent-green text-xl mt-3">{interview.location}</p>
          <p className="text-gray-400 mt-2">{interview.date}</p>
        </div>
      </div>
        {/* Interview Content */}
      <section className="py-16 bg-black relative overflow-hidden">
        <div className="dot-pattern absolute inset-0 opacity-5"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="space-y-12">
            {interview.fullInterview.map((segment, index) => (
              <div key={index} className="glass-card p-8 border-l-2 border-accent-green hover-card">
                <h2 className="text-white text-xl font-bold mb-4 flex items-start">
                  <span className="text-accent-green mr-3 text-lg opacity-80">Q:</span>
                  {segment.question}
                </h2>
                <div className="pl-6 border-l border-gray-800">
                  <p className="text-gray-300 leading-relaxed">{segment.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              href="/interviews" 
              className="btn-modern group inline-flex items-center px-8 py-3"
            >
              <span>View All Interviews</span>
              <svg className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
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

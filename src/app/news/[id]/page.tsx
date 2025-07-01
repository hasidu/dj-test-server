import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// This would come from a CMS or database in a real app
const newsArticles = [
  {
    id: 'news1',
    title: 'LA FORESTA Announces New Resident DJs for Summer 2025',
    date: 'June 10, 2025',
    author: 'Maria Rodriguez',
    category: 'Announcements',
    image: '/images/event5.jpg',
    content: `
      <p>
        La Foresta is thrilled to announce the addition of three new resident DJs to our summer 2025 lineup. Each artist brings a unique style and perspective that perfectly aligns with our musical vision and community focus.
      </p>
      
      <p>
        After careful consideration and several memorable guest performances, we've invited Kaira Sen, Marco Delgado, and The Lunar Collective to join our resident family. These artists have consistently demonstrated not just extraordinary technical skill, but also the ability to connect deeply with our audience and embody the La Foresta ethos of musical exploration and community building.
      </p>
      
      <h2>Meet Our New Residents</h2>
      
      <p>
        <strong>Kaira Sen</strong> has made waves across Southeast Asia with her genre-defying sets that blend elements of deep house, breaks, and electronica with regional influences. Originally from Mumbai and now based in Colombo, Kaira brings a fresh perspective that bridges cultural divides through music. Her monthly residency will begin in July with a special showcase event.
      </p>
      
      <p>
        <strong>Marco Delgado</strong>, a veteran of Barcelona's underground scene, has been a frequent guest at our events over the past year. His masterful minimal techno sets have become highlights for our more dedicated audience, often stretching into the early morning hours. Marco will be hosting a bi-monthly residency focused on deeper, more experimental sounds.
      </p>
      
      <p>
        <strong>The Lunar Collective</strong> represents something entirely new for La Foresta - a rotating group of three DJs and producers who will collaborate on special concept nights that blend electronic music with live instrumentation and visual arts. Their quarterly residency will debut with an immersive audio-visual experience in August.
      </p>
      
      <h2>What This Means For Our Community</h2>
      
      <p>
        These new residencies reflect our commitment to musical diversity and our desire to provide our community with consistent, high-quality experiences while still evolving our sound. Each resident will not only perform regularly but will also be involved in workshops, production sessions, and community outreach activities.
      </p>
      
      <p>
        "We believe that building long-term relationships with artists is essential for creating a vibrant scene," explains La Foresta founder Amal Perera. "These residencies allow both the artists and our audience to develop deeper connections and more meaningful musical journeys."
      </p>
      
      <p>
        The full summer schedule featuring our new residents alongside established La Foresta favorites and international guests will be announced next week. Sign up for our newsletter to be the first to know about ticket releases and special events.
      </p>
    `
  },
  {
    id: 'news2',
    title: 'New Venue Announced for Our Signature Underground Series',
    date: 'June 5, 2025',
    author: 'David Chen',
    category: 'Events',
    image: '/images/event6.jpg',
    content: `
      <p>
        After months of searching and careful negotiation, La Foresta is excited to announce a new home for our signature Underground Series events. The location, which will be revealed to ticket holders just 48 hours before each event, represents a significant evolution for our most adventurous musical programming.
      </p>
      
      <p>
        Our Underground Series has always been about creating unique experiences in unexpected spaces - from abandoned factories to rooftop gardens. This new semi-permanent location allows us to take this concept to the next level with enhanced sound, lighting, and spatial design while maintaining the sense of discovery and exclusivity that has made these events special.
      </p>
      
      <h2>A Space Transformed</h2>
      
      <p>
        While we can't reveal too many details yet, we can share that the venue is a repurposed industrial space with multiple rooms, outdoor areas, and unique architectural features that will be incorporated into our design. We've partnered with acoustic specialists to ensure optimal sound quality throughout the venue, addressing a key piece of feedback from previous events.
      </p>
      
      <p>
        "This space gives us a blank canvas to create something truly special," explains La Foresta's creative director, Nia Wong. "We're investing in permanent infrastructure improvements while designing flexible elements that can transform the space for each event. The result will be a venue that feels both familiar and constantly surprising."
      </p>
      
      <h2>Enhanced Experience</h2>
      
      <p>
        The new venue will feature several improvements based on community feedback:
      </p>
      
      <ul>
        <li>Multiple sound systems tailored to different musical styles</li>
        <li>Expanded chill-out areas with comfortable seating</li>
        <li>Improved bar service with shorter wait times</li>
        <li>Enhanced ventilation and climate control</li>
        <li>Better accessibility features</li>
        <li>Dedicated art installation spaces</li>
      </ul>
      
      <p>
        Each Underground Series event will continue to feature carefully curated lineups exploring specific sounds and concepts, with both established artists and emerging talents. The series will maintain its limited capacity to preserve the intimate atmosphere that has become its signature.
      </p>
      
      <h2>Upcoming Events</h2>
      
      <p>
        The first event at our new location will take place on July 15, 2025, featuring a special b2b set from two internationally acclaimed DJs (announcement coming soon) alongside La Foresta residents. Tickets will be released on June 20th with a special pre-sale for our mailing list subscribers.
      </p>
      
      <p>
        As always, the exact location will be shared only with ticket holders 48 hours before the event. Transportation options from central meeting points will be available.
      </p>
      
      <p>
        Stay tuned for more announcements and make sure to follow us on social media for the latest updates.
      </p>
    `
  }
];

export default function NewsItemPage({ params }: { params: { id: string } }) {
  // Find the article with the matching ID
  const article = newsArticles.find(item => item.id === params.id);
  
  // If no matching article is found, return a 404
  if (!article) {
    notFound();
  }
  
  return (
    <main className="pt-20">
      {/* News Item Header */}
      <div className="relative bg-black text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: `url("${article.image}")`,
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/news" className="text-[#a3ff12] flex items-center mb-8 hover:underline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </Link>
          
          <span className="inline-block px-3 py-1 bg-[#a3ff12] text-black text-xs font-bold mb-4">
            {article.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {article.title}
          </h1>
          
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <span>{article.date}</span>
            <span className="mx-2">•</span>
            <span>By {article.author}</span>
          </div>
        </div>
      </div>
      
      {/* News Item Content */}
      <section className="py-20 dark-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-video mb-8 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Social Share */}
            <div className="mt-12 pt-8 border-t border-[#222]">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <h3 className="text-lg font-bold text-white mb-4 sm:mb-0">Share this article</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1da1f2] flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0a66c2] flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.7 3H4.3C3.582 3 3 3.582 3 4.3v15.4c0 .718.582 1.3 1.3 1.3h15.4c.718 0 1.3-.582 1.3-1.3V4.3c0-.718-.582-1.3-1.3-1.3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M21.11 2.89A12.91 12.91 0 0012 0 12.91 12.91 0 002.89 2.89 12.91 12.91 0 000 12c0 2.25.58 4.48 1.69 6.43L0 24l5.57-1.69A12.91 12.91 0 0012 24c2.97 0 5.83-.99 8.11-2.89A12.91 12.91 0 0024 12c0-2.97-.99-5.83-2.89-8.11zm-9.11 19.6a10.95 10.95 0 01-5.49-1.48l-.4-.24-4.13 1.08 1.08-4.12-.25-.4A10.95 10.95 0 011.5 12c0-6.07 4.93-11 11-11s11 4.93 11 11-4.93 11-11 11zm6.21-8.21c-.33-.17-1.96-.97-2.26-1.08-.3-.11-.52-.17-.74.17-.22.33-.84 1.08-1.03 1.3-.19.22-.39.25-.72.08-.33-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.01-1.89-2.35-.2-.33-.02-.51.15-.67.15-.15.33-.39.5-.58.17-.19.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.74-1.78-1.01-2.44-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.58.08-.88.42-.3.33-1.14 1.12-1.14 2.73 0 1.61 1.17 3.16 1.34 3.38.17.22 2.28 3.66 5.64 5 .79.34 1.41.54 1.89.69.8.25 1.52.21 2.09.13.64-.1 1.96-.8 2.24-1.58.28-.78.28-1.45.2-1.58-.08-.14-.3-.22-.64-.39z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Related Articles */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#a3ff12] mr-3"></span>
                Related Articles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsArticles.filter(item => item.id !== article.id).slice(0, 2).map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="group">
                    <div className="glass-card overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <span className="inline-block px-2 py-1 bg-[#a3ff12] text-black text-xs font-bold mb-2">
                          {item.category}
                        </span>
                        <h4 className="text-lg font-bold text-white group-hover:text-[#a3ff12] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-2">{item.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

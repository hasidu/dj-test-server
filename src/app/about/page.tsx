import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'About Us | La Foresta Events',
  description: 'Learn more about La Foresta Events and our mission to bring the best underground artists to music lovers',
};

export default function AboutPage() {  
  return (
    <main className="page-container">      <PageHeader 
        title="ABOUT" 
        description="Get to know the team behind La Foresta Events and our mission to create unforgettable musical experiences."
      />
        {/* Main Content */}
      <section className="py-16 bg-dark-bg-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold mb-4 text-white flex items-center">
                <span className="text-accent-green mr-2">01.</span> Our Story
              </h2>
              <div className="accent-line"></div>
              <p className="text-gray-300 mb-4">
                La Foresta was born in 2020 from a shared passion for underground electronic music and a desire to create 
                exceptional experiences that bring people together. What started as small gatherings among friends has grown 
                into one of the most respected event companies in the industry.
              </p>              <p className="text-gray-300 mb-4">
                We believe that music has the power to connect people across boundaries and create lasting memories. 
                Our events are designed to be more than just concerts – they&apos;re immersive experiences that engage all the senses.
              </p>
              <p className="text-gray-300">
                From intimate club nights to sprawling outdoor festivals, each La Foresta event is crafted with careful attention 
                to detail, from the lineup to the venue, sound system, lighting, and overall atmosphere.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden glow-border shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image 
                src="/images/about-image.jpg" 
                alt="La Foresta team" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-lg overflow-hidden glow-border shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image 
                src="/images/about-image2.jpg" 
                alt="La Foresta event" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div className="order-1 lg:order-2 glass-card p-8">
              <h2 className="text-3xl font-bold mb-4 text-white flex items-center">
                <span className="text-accent-green mr-2">02.</span> Our Mission
              </h2>
              <div className="accent-line"></div>
              <p className="text-gray-300 mb-4">
                At La Foresta, our mission is to create meaningful connections through music by showcasing the best underground 
                artists from around the world to passionate music lovers.
              </p>
              <p className="text-gray-300 mb-4">
                We strive to:
              </p>
              <ul className="space-y-3 text-gray-300 mb-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Support emerging and established artists who push boundaries in electronic music
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Create safe, inclusive spaces where people from all backgrounds can connect
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Curate unique experiences that leave lasting impressions
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Prioritize quality in every aspect of our events, from sound to visuals to venue selection
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent-green mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Foster a community of music lovers who share our passion for underground electronic music
                </li>
              </ul>
              <p className="text-gray-300">
                As we continue to grow, we remain committed to these core values that have defined La Foresta from the beginning.
              </p>
            </div>
          </div>
        </div>
      </section>
        {/* Team Section */}
      <section className="py-16 dark-section-enhanced relative overflow-hidden">
        <div className="dot-pattern absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">Meet Our</span>
              <span className="gradient-text glow-text ml-2">Team</span>
            </h2>
            <div className="neon-divider mx-auto my-4 w-24"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The passionate individuals who make the magic happen behind the scenes at La Foresta
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="modern-card hover-card text-center">
                <div className="relative h-80 overflow-hidden">
                  <Image 
                    src={`/images/team-member${item}.jpg`} 
                    alt={`Team member ${item}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="font-bold text-xl mb-1 text-white">Team Member {item}</h3>
                  <p className="text-accent-green mb-4 text-sm uppercase tracking-wider">Position Title</p>
                  <div className="w-12 h-1 bg-accent-green mx-auto mb-4"></div>
                  <p className="text-gray-300 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor justo eu nisi molestie.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

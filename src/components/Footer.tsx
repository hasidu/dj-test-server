import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">      <div className="container mx-auto px-4">
        {/* Contact Section */}
        <div className="bg-[#526505] p-12 mb-16 rounded-sm flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
          <div className="z-10 max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">We welcome all intrested souls<br />to get in touch with us.</h3>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center border border-black text-black px-10 py-3 font-medium mt-4 hover:bg-black hover:text-[#a3ff12] transition-colors"
            >
              Contact
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
          
          {/* Leaf/Natural Element Image on Right */}
          <div className="hidden lg:block absolute top-0 right-0 h-full w-1/3">
            <Image 
              src="/images/about-image2.jpg"
              alt="Leaf" 
              width={500} 
              height={400}
              className="object-cover h-full"
            />
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Image 
                src="/images/logo.png" 
                alt="La Foresta Logo" 
                width={40} 
                height={40} 
                className="mr-2" 
              />
              <h3 className="text-xl font-bold">
                <span className="text-[#a3ff12]">LA</span> FORESTA
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              We create, you celebrate. Join us for unforgettable musical experiences.
            </p>
            <a 
              href="mailto:info@laforesta.com" 
              className="text-[#a3ff12] hover:underline inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              info@laforesta.com
            </a>
          </div>
            <div>
            <h3 className="text-xl font-bold mb-6 uppercase">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-[#a3ff12] transition-colors">Home</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-[#a3ff12] transition-colors">Events</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#a3ff12] transition-colors">About</Link></li>
              <li><Link href="/interviews" className="text-gray-400 hover:text-[#a3ff12] transition-colors">Interviews</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-[#a3ff12] transition-colors">Gallery</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-[#a3ff12] transition-colors">News</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 uppercase">Events</h3>
            <ul className="space-y-4">
              <li><Link href="/events" className="text-gray-400 hover:text-[#a3ff12] transition-colors">Upcoming Events</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-[#a3ff12] transition-colors">Previous Events</Link></li>
              <li><Link href="/recordings" className="text-gray-400 hover:text-[#a3ff12] transition-colors">Recordings</Link></li>
              <li><Link href="/videos" className="text-gray-400 hover:text-[#a3ff12] transition-colors">Videos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 uppercase">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-[#121212] hover:bg-[#a3ff12] hover:text-black p-3 rounded-sm transition-all" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#121212] hover:bg-[#a3ff12] hover:text-black p-3 rounded-sm transition-all" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-[#121212] hover:bg-[#a3ff12] hover:text-black p-3 rounded-sm transition-all" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.157 1.2A4.92 4.92 0 0016.327 2a4.935 4.935 0 00-4.93 4.93c0 .39.033.765.114 1.124A13.98 13.98 0 011.64 3.16a4.822 4.822 0 00-.665 2.473c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="bg-[#121212] hover:bg-[#a3ff12] hover:text-black p-3 rounded-sm transition-all" aria-label="SoundCloud">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.055-.045-.1-.085-.1m-.899.828c-.05 0-.091.042-.1.1L0 14.48l.175 1.327c.009.063.05.101.1.101.049 0 .09-.038.099-.101L.557 14.48l-.181-1.327c-.009-.058-.05-.1-.1-.1m1.83-.46c-.057 0-.105.04-.11.098l-.21 2.154.21 2.105c.005.058.053.098.11.098.059 0 .106-.04.11-.098l.235-2.105-.235-2.154c-.004-.058-.051-.098-.11-.098m.992-.06c-.057 0-.105.04-.11.098l-.199 2.215.199 2.143c.005.058.053.098.11.098.057 0 .105-.04.11-.098l.222-2.143-.222-2.215c-.005-.058-.053-.098-.11-.098m1.014-.028c-.07 0-.129.043-.136.1l-.176 2.241.176 2.215c.007.062.066.105.136.105.07 0 .13-.043.136-.105l.2-2.215-.2-2.24c-.006-.058-.067-.1-.136-.1zm1.003-.063c-.08 0-.145.05-.15.12l-.157 2.284.156 2.24c.006.07.07.12.15.12.08 0 .145-.05.15-.12l.178-2.24-.17-2.284c-.006-.07-.07-.12-.15-.12m1.757-.095c-.118 0-.212.087-.217.194l-.114 2.307.114 2.24c.005.108.099.194.217.194.117 0 .213-.086.217-.194l.129-2.24-.129-2.307c-.004-.107-.1-.194-.217-.194M9.87 12.412c-.07 0-.132.052-.137.129l-.137 2.307.137 2.26c.005.076.067.129.137.129.072 0 .132-.053.136-.129l.156-2.26-.156-2.307c-.004-.077-.064-.129-.136-.129m.986-.029c-.08 0-.147.058-.15.135l-.126 2.33.126 2.261c.003.077.07.135.15.135.08 0 .147-.058.15-.135l.142-2.261-.142-2.33c-.003-.077-.07-.135-.15-.135zm1.004-.08c-.09 0-.164.063-.166.143l-.116 2.4.116 2.24c.002.08.076.144.166.144.09 0 .165-.063.166-.143l.132-2.24-.132-2.4c-.001-.086-.078-.147-.166-.146zm1.19-.058c-.101 0-.182.07-.184.16l-.105 2.44.105 2.23c.002.09.083.159.184.159.101 0 .18-.07.183-.159l.118-2.23-.118-2.44c-.003-.09-.082-.16-.183-.16m1-.29c-.104 0-.187.074-.188.165l-.093 2.724.093 2.219c0 .09.084.165.188.165.103 0 .186-.074.188-.165l.105-2.219-.105-2.724c-.002-.091-.085-.165-.188-.165m1.003 2.666l-.081-2.613c-.002-.103-.094-.183-.197-.183-.103 0-.188.08-.189.184l-.071 2.613.071 2.195c.001.103.086.184.189.184.103 0 .195-.081.197-.184l.081-2.195zm.372-2.434l-.089-1.31c-.003-.131-.119-.228-.25-.228s-.247.097-.25.228l-.082 1.31-.081 2.437.081 2.323c.003.13.119.227.25.227s.247-.097.25-.227l.089-2.323-.089-2.437zm1.003-1.24c-.139 0-.257.108-.258.246l-.056 2.344-.056 2.414.056 2.39c.001.137.119.245.258.245.139 0 .256-.108.257-.246l.064-2.389-.064-2.414-.064-2.344c0-.138-.118-.246-.257-.246zm1.638-.015c-.149 0-.27.115-.271.261l-.047 5.074.047 2.203c.001.146.122.26.271.26.148 0 .27-.114.27-.26l.052-2.203-.052-5.074c0-.146-.121-.261-.27-.261m.7.063c-.157 0-.285.12-.286.27l-.04 5.003.04 2.2c.001.149.129.269.286.269.157 0 .285-.12.286-.268l.041-2.201-.041-5.004c-.001-.149-.129-.269-.286-.269"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LA FORESTA. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-500 hover:text-[#a3ff12] text-sm">Terms & Conditions</Link>
            <Link href="/privacy" className="text-gray-500 hover:text-[#a3ff12] text-sm">Privacy Policy</Link>
            <Link href="/contact" className="text-gray-500 hover:text-[#a3ff12] text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import StaticWavyBackground from '@/components/StaticWavyBackground';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <StaticWavyBackground className="absolute inset-0" />
      
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-2">
          4<span className="text-[#a3ff12]">0</span>4
        </h1>
        
        <div className="w-24 h-1 bg-[#a3ff12] mx-auto my-8"></div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Track Not Found
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The beat you're looking for seems to have dropped off our playlist. Let's get you back to the main stage.
        </p>
        
        <Link 
          href="/" 
          className="inline-block bg-transparent border-2 border-[#a3ff12] text-[#a3ff12] hover:bg-[#a3ff12] hover:text-black transition-colors duration-300 font-medium py-2 px-6 uppercase tracking-wider"
        >
          Back to Main Stage
        </Link>
        
        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-1 h-16 bg-gray-700 animate-pulse"></div>
          <div className="w-1 h-24 bg-[#a3ff12] animate-pulse delay-75"></div>
          <div className="w-1 h-10 bg-gray-700 animate-pulse delay-150"></div>
          <div className="w-1 h-20 bg-[#a3ff12] animate-pulse delay-200"></div>
          <div className="w-1 h-16 bg-gray-700 animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
}

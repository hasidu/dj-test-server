import PageHeader from '@/components/PageHeader';
import AudioUploader from '@/components/AudioUploader';
import MusicImporter from '@/components/MusicImporter';
import DJToolbox from '@/components/DJToolbox';

export const metadata = {
  title: 'Admin | La Foresta Events',
  description: 'Admin area for La Foresta Events',
};

export default function AdminPage() {
  return (
    <main className="pt-0">
      <PageHeader 
        title="ADMIN" 
        description="Manage content for La Foresta Events website"
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Music Management</h2>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <a 
                  href="/recordings" 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  View Recordings
                </a>
                <button 
                  className="px-4 py-2 bg-[#a3ff12] text-black font-medium rounded-lg hover:bg-[#8bde00] transition-colors"
                >
                  New Track
                </button>
              </div>
            </div>
            
            <div className="mb-8 p-6 bg-[#111] border border-[#333] rounded-xl">
              <div className="flex items-center mb-4">
                <div className="h-8 w-1 bg-[#a3ff12] mr-3"></div>
                <h3 className="text-xl font-bold text-white">Music Dashboard</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 border border-[#333] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white/80 text-sm font-medium">Total Tracks</h4>
                    <span className="text-[#a3ff12]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v12l8-8-8-8z"/>
                        <path d="M4 12h8"/>
                        <path d="M4 19h16"/>
                      </svg>
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white">8</p>
                  <p className="text-white/50 text-sm mt-2">Last upload: 2 days ago</p>
                </div>
                
                <div className="bg-black/30 border border-[#333] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white/80 text-sm font-medium">Storage Used</h4>
                    <span className="text-[#a3ff12]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                        <line x1="6" y1="6" x2="6.01" y2="6"/>
                        <line x1="6" y1="18" x2="6.01" y2="18"/>
                      </svg>
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white">45 MB</p>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
                    <div className="h-full bg-[#a3ff12] rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <p className="text-white/50 text-sm mt-2">15% of allocated space (300 MB)</p>
                </div>
                
                <div className="bg-black/30 border border-[#333] p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white/80 text-sm font-medium">API Status</h4>
                    <span className="text-[#a3ff12]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <p className="text-white font-medium">Operational</p>
                  </div>
                  <p className="text-white/50 text-sm mt-2">All music services connected</p>
                </div>
              </div>
            </div>
            
            <div className="grid gap-8">
              <AudioUploader />
              
              <MusicImporter />
              
              <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#222]">
                <h3 className="text-2xl font-bold text-white mb-6">DJ Tools Preview</h3>
                <p className="text-white/70 mb-6">
                  This is a preview of the DJ toolbox that can be embedded in the music player for advanced users.
                  Test these controls to see how they could enhance the music experience on your site.
                </p>
                
                <DJToolbox isPlaying={true} />
              </div>
            
              <div className="p-6 bg-[#0a0a0a] rounded-xl border border-[#222]">
                <h3 className="text-2xl font-bold text-white mb-6">Music Management Options</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Local Files
                      </h4>
                      <p className="text-white/70 mb-4">
                        You can add your own MP3 files to the <code className="bg-[#111] px-2 py-1 rounded text-[#a3ff12]">/public/audio</code> folder, 
                        then update the track list in <code className="bg-[#111] px-2 py-1 rounded text-[#a3ff12]">recordings/page.tsx</code>.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-xl text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <circle cx="12" cy="12" r="10"/>
                          <circle cx="12" cy="12" r="4"/>
                        </svg>
                        External Services
                      </h4>
                      <p className="text-white/70 mb-4">
                        To use external music streaming services, you can update the track URLs in 
                        <code className="bg-[#111] px-2 py-1 rounded text-[#a3ff12] mx-1">recordings/page.tsx</code>
                        to point to your music hosted on SoundCloud, Spotify, or other platforms that provide direct MP3 links.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
                        </svg>
                        Building a Full Library
                      </h4>
                      <p className="text-white/70">
                        For a production site with many tracks, consider:
                      </p>
                      <ul className="list-disc pl-5 text-white/70 mt-2 space-y-1">
                        <li>Setting up a database to store track information</li>
                        <li>Using cloud storage like AWS S3 for audio files</li>
                        <li>Creating an API to fetch tracks dynamically</li>
                        <li>Implementing user authentication for the admin area</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xl text-white mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M9 18V5l12-2v13"/>
                          <circle cx="6" cy="18" r="3"/>
                          <circle cx="18" cy="16" r="3"/>
                        </svg>
                        Visualizer Settings
                      </h4>
                      <p className="text-white/70 mb-3">
                        Customize the audio visualizer appearance:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs bg-[#a3ff12] text-black rounded-full">Bars</span>
                        <span className="px-3 py-1 text-xs bg-white/10 text-white/70 rounded-full">Waveform</span>
                        <span className="px-3 py-1 text-xs bg-white/10 text-white/70 rounded-full">Circular</span>
                        <span className="px-3 py-1 text-xs bg-white/10 text-white/70 rounded-full">Spectrum</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

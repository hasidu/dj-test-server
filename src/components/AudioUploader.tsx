"use client";

import { useState } from 'react';

interface UploadedTrack {
  id: string;
  title: string;
  artist: string;
  file: File;
  coverArtFile?: File;
  coverArtPreview?: string;
}

const AudioUploader: React.FC = () => {
  const [tracks, setTracks] = useState<UploadedTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Partial<UploadedTrack>>({
    id: '',
    title: '',
    artist: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTrack(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'image') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (type === 'audio') {
        setCurrentTrack(prev => ({ ...prev, file }));
      } else if (type === 'image') {
        // Create preview for cover art
        const reader = new FileReader();
        reader.onloadend = () => {
          setCurrentTrack(prev => ({ 
            ...prev, 
            coverArtFile: file,
            coverArtPreview: reader.result as string 
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!currentTrack.title || !currentTrack.artist || !currentTrack.file) {
      setMessage('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');
    
    // In a real app, you would upload the file to your backend/storage here
    // For this example, we'll just pretend to upload and show the track in our local state
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTrack: UploadedTrack = {
        id: Date.now().toString(),
        title: currentTrack.title!,
        artist: currentTrack.artist!,
        file: currentTrack.file!,
        coverArtFile: currentTrack.coverArtFile,
        coverArtPreview: currentTrack.coverArtPreview
      };
      
      setTracks(prev => [...prev, newTrack]);
      
      // Reset form
      setCurrentTrack({
        id: '',
        title: '',
        artist: '',
      });
      
      setMessage('Track uploaded successfully!');
      
      // In a real app with backend:
      /*
      // Create form data to send to backend
      const formData = new FormData();
      formData.append('title', currentTrack.title!);
      formData.append('artist', currentTrack.artist!);
      formData.append('audioFile', currentTrack.file!);
      if (currentTrack.coverArtFile) {
        formData.append('coverArt', currentTrack.coverArtFile);
      }
      
      // Send to backend API
      const response = await fetch('/api/upload-audio', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      setMessage('Track uploaded successfully!');
      */
      
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Error uploading track. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#222]">
      <h3 className="text-2xl font-bold text-white mb-6">Upload Music</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">
            Track Title <span className="text-[#a3ff12]">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={currentTrack.title}
            onChange={handleInputChange}
            className="w-full bg-[#111] border border-[#333] rounded p-2 text-white"
            placeholder="Enter track title"
            required
          />
        </div>
        
        <div>
          <label className="block text-white mb-2">
            Artist <span className="text-[#a3ff12]">*</span>
          </label>
          <input
            type="text"
            name="artist"
            value={currentTrack.artist}
            onChange={handleInputChange}
            className="w-full bg-[#111] border border-[#333] rounded p-2 text-white"
            placeholder="Enter artist name"
            required
          />
        </div>
        
        <div>
          <label className="block text-white mb-2">
            Audio File (MP3, WAV) <span className="text-[#a3ff12]">*</span>
          </label>
          <input
            type="file"
            accept="audio/mp3,audio/wav,audio/mpeg"
            onChange={(e) => handleFileChange(e, 'audio')}
            className="w-full bg-[#111] border border-[#333] rounded p-2 text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-white mb-2">
            Cover Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'image')}
            className="w-full bg-[#111] border border-[#333] rounded p-2 text-white"
          />
          
          {currentTrack.coverArtPreview && (
            <div className="mt-2">
              <p className="text-white mb-1">Preview:</p>
              <img 
                src={currentTrack.coverArtPreview} 
                alt="Cover preview" 
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded bg-[#a3ff12] text-black font-bold transition-all ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#8bde00]'
            }`}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Track'}
          </button>
        </div>
      </form>
      
      {message && (
        <div className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-900/30 text-red-200' : 'bg-green-900/30 text-green-200'}`}>
          {message}
        </div>
      )}
      
      {tracks.length > 0 && (
        <div className="mt-8">
          <h4 className="text-xl text-white mb-4">Uploaded Tracks</h4>
          <div className="space-y-2">
            {tracks.map(track => (
              <div key={track.id} className="flex items-center p-3 bg-[#111] rounded border border-[#333]">
                {track.coverArtPreview ? (
                  <img 
                    src={track.coverArtPreview} 
                    alt={track.title} 
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#222] rounded mr-3 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18V5l12-2v13" stroke="#a3ff12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="6" cy="18" r="3" stroke="#a3ff12" strokeWidth="2"/>
                      <circle cx="18" cy="16" r="3" stroke="#a3ff12" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{track.title}</p>
                  <p className="text-white/60 text-sm">{track.artist}</p>
                </div>
                <div className="ml-auto text-sm text-white/40">
                  Local file
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-white/50 mt-4">
            Note: In this demo, files are stored only in browser memory and will be lost on page refresh.
            In a production environment, files would be uploaded to your server or cloud storage.
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;

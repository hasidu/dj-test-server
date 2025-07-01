// Example API route for fetching music from SoundCloud (you would need to register for a SoundCloud API key)
// This is just a template example

import { NextResponse } from 'next/server';

// This would be stored in an environment variable in a real app
const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID || 'YOUR_SOUNDCLOUD_CLIENT_ID';

export async function GET(request: Request) {
  try {
    // Get query params
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || 'electronic'; 
    const limit = searchParams.get('limit') || '10';
    
    // In a real app you would fetch from SoundCloud API
    // For now, we'll return mock data since we don't have actual credentials
    
    // Generate mock tracks based on the search query
    const mockTracks = generateMockTracks(query, parseInt(limit));
    
    return NextResponse.json({ tracks: mockTracks });
  } catch (error) {
    console.error('Error fetching music:', error);
    return NextResponse.json(
      { error: 'Failed to fetch music' },
      { status: 500 }
    );
  }
}

// This is just an example implementation with better mock data
export async function POST(request: Request) {
  try {
    // Parse the search query from the request
    const body = await request.json();
    const { query, service } = body;
    
    // Generate mock tracks based on the search query
    const mockTracks = generateMockTracks(query, 8, service);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return NextResponse.json({ tracks: mockTracks });
  } catch (error) {
    console.error('Error searching music:', error);
    return NextResponse.json(
      { error: 'Failed to search music' },
      { status: 500 }
    );
  }
}

// Helper function to generate mock tracks based on search query
function generateMockTracks(query: string, limit: number = 8, service: string = 'soundcloud') {
  const genres = ['Deep House', 'Tech House', 'Progressive', 'Techno', 'Ambient', 'Melodic Techno', 'Minimal'];
  const eventImages = Array.from({ length: 6 }, (_, i) => `/images/event${i + 1}.jpg`);
  const artists = ['ECHO DAFT', 'Kyotto', 'Rocksa', 'Matthew Sona', 'DJ Malika', 'Soundscape Collective', 'Ricardo Torres'];
  const keys = ['A min', 'C maj', 'F# min', 'G maj', 'D min', 'E maj', 'B min'];
  const years = ['2023', '2024', '2022', '2024', '2023'];
  
  const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);
  
  return Array.from({ length: limit }, (_, i) => {
    const id = `${service}-${Date.now()}-${i}`;
    const bpm = 120 + Math.floor(Math.random() * 30);
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const key = keys[Math.floor(Math.random() * keys.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    const duration = (Math.floor(Math.random() * 4) + 3) * 60 + Math.floor(Math.random() * 59); // 3-7 minutes
    
    // Make the search query part of the track title
    let title = '';
    if (query) {
      // If the query might be a genre, artist, or descriptive term
      if (Math.random() > 0.5) {
        title = `${capitalizedQuery} ${['Vibes', 'Journey', 'Experience', 'Dreams', 'Night', 'Groove'][Math.floor(Math.random() * 6)]}`;
      } else {
        title = `${['The', 'A', 'My', 'Your', 'Our'][Math.floor(Math.random() * 5)]} ${capitalizedQuery} ${['Session', 'Track', 'Mix', 'Edit', 'Remix'][Math.floor(Math.random() * 5)]}`;
      }
    } else {
      title = `${['Summer', 'Winter', 'Spring', 'Autumn', 'Night', 'Day'][Math.floor(Math.random() * 6)]} ${['Vibes', 'Journey', 'Experience', 'Dreams', 'Night', 'Groove'][Math.floor(Math.random() * 6)]}`;
    }
    
    // Sometimes add a remix or collab info
    if (Math.random() > 0.6) {
      const remixer = artists[Math.floor(Math.random() * artists.length)];
      title += ` (${remixer} ${['Remix', 'Edit', 'Rework', 'Version'][Math.floor(Math.random() * 4)]})`;
    }
    
    // Get an artist that isn't in the title to avoid duplicate names
    let artist = artists[Math.floor(Math.random() * artists.length)];
    if (title.includes(artist)) {
      artist = artists[(artists.indexOf(artist) + 1) % artists.length];
    }
    
    // Generate demo stream URL - in production this would come from an actual streaming service
    const streamUrl = i < 1 
      ? '/audio/m1.mp3' 
      : `https://assets.mixkit.co/music/preview/mixkit-${Math.floor(Math.random() * 1000)}.mp3`;
    
    return {
      id,
      title,
      artist,
      coverArt: eventImages[i % eventImages.length],
      audioUrl: streamUrl,
      bpm,
      key,
      genre,
      duration,
      year
    };
  });
}

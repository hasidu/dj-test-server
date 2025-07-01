export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  endDate?: string;
  endTime?: string;
  location: string;
  description: string;
  image: string;
  artists: string[];
  tickets?: {
    price: string;
    link: string;
  };
  featured?: boolean;
  categories?: string[];
  isoDate?: string; // ISO format date for filtering
}

const events: Event[] = [
  {
    id: "summer-fest-2025",
    title: "Summer Festival 2025",
    date: "July 15, 2025",
    time: "2:00 PM - 11:00 PM",
    endDate: "July 15, 2025",
    endTime: "11:00 PM",
    location: "Central Park, New York",
    description: "Join us for the biggest underground electronic music festival of the summer. Featuring top DJs and artists from around the world, immersive art installations, and unforgettable experiences.",
    image: "/images/event1.jpg",
    artists: ["DJ Harmony", "Echo Collective", "Pulse Wave", "Rhythm Section"],
    tickets: {
      price: "$59.99",
      link: "/tickets/summer-fest-2025"
    },
    featured: true,
    categories: ["Festival", "Electronic", "Summer"],
    isoDate: "2025-07-15T14:00:00"
  },  {
    id: "techno-night",
    title: "Techno Night Vol. 5",
    date: "August 3, 2025",
    time: "10:00 PM - 4:00 AM",
    endDate: "August 4, 2025",
    endTime: "4:00 AM",
    location: "The Underground Club, Berlin",
    description: "Experience a night of cutting-edge techno music with some of the genre's most innovative artists. Dark rooms, powerful sound systems, and pure electronic energy.",
    image: "/images/event2.jpg",
    artists: ["Mindscape", "Neural Pulse", "Dark Matter", "Binary Fusion"],
    tickets: {
      price: "$29.99",
      link: "/tickets/techno-night"
    },
    categories: ["Club Night", "Techno", "Underground"],
    isoDate: "2025-08-03T22:00:00"
  },
  {
    id: "beach-vibes",
    title: "Beach Vibes Festival",
    date: "August 20, 2025",
    time: "12:00 PM - 10:00 PM",
    endDate: "August 20, 2025",
    endTime: "10:00 PM",
    location: "Miami Beach, Florida",
    description: "Dance with your feet in the sand at our annual beach party. Tropical house, sunset DJ sets, and ocean views create the perfect summer atmosphere.",
    image: "/images/event3.jpg",
    artists: ["Ocean Waves", "Sunset Collective", "Tropical Flow", "Sandy Beats"],
    tickets: {
      price: "$45.00",
      link: "/tickets/beach-vibes"
    },
    featured: true,
    categories: ["Festival", "House", "Beach", "Summer"],
    isoDate: "2025-08-20T12:00:00"
  },  {
    id: "warehouse-rave",
    title: "Warehouse Rave 2025",
    date: "September 5, 2025",
    time: "11:00 PM - 6:00 AM",
    endDate: "September 6, 2025",
    endTime: "6:00 AM",
    location: "Industrial District, Detroit",
    description: "The raw energy of classic rave culture meets modern production in this all-night warehouse event. Featuring hard-hitting beats and immersive light shows.",
    image: "/images/event4.jpg",
    artists: ["Bass Reactor", "Strobe Light", "Warehouse Collective", "Night Vision"],
    tickets: {
      price: "$35.00",
      link: "/tickets/warehouse-rave"
    },
    categories: ["Rave", "Warehouse", "Electronic", "Techno"],
    isoDate: "2025-09-05T23:00:00"
  },
  {
    id: "ambient-journey",
    title: "Ambient Journey",
    date: "September 15, 2025",
    time: "8:00 PM - 2:00 AM",
    endDate: "September 16, 2025",
    endTime: "2:00 AM",
    location: "Botanical Gardens, London",
    description: "A meditative musical experience in a beautiful natural setting. Let ambient soundscapes and downtempo beats transport you to another dimension.",
    image: "/images/event5.jpg",
    artists: ["Floating Point", "Dreamscape", "Ethereal", "Cloud Path"],
    tickets: {
      price: "$40.00",
      link: "/tickets/ambient-journey"
    },
    categories: ["Ambient", "Downtempo", "Experimental"],
    isoDate: "2025-09-15T20:00:00"
  },
  {
    id: "underground-sessions",
    title: "Underground Sessions",
    date: "October 10, 2025",
    time: "9:00 PM - 3:00 AM",
    endDate: "October 11, 2025",
    endTime: "3:00 AM",
    location: "Secret Venue, Tokyo",
    description: "Our recurring underground electronic night featuring the best local talent and international guests. Location revealed 24 hours before the event.",
    image: "/images/event6.jpg",
    artists: ["Hidden Signal", "Shadow System", "Deep Current", "Neon Tokyo"],
    tickets: {
      price: "$25.00",
      link: "/tickets/underground-sessions"
    },
    featured: true,
    categories: ["Underground", "Electronic", "Secret Location"],
    isoDate: "2025-10-10T21:00:00"
  }];

export default events;

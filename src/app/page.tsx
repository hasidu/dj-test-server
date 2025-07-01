"use client";

import HeroNew from '@/components/HeroNew';
import AboutSection from '@/components/AboutSection';
import NewsletterNew from '@/components/NewsletterNew';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import GalleryTeaserSection from '@/components/GalleryTeaserSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StatsSection from '@/components/StatsSection';

export default function Home() {
  return (
    <main>
      {/* Black */}
      <HeroNew />
      
      {/* Black */}
      <AboutSection />
      
      {/* Black */}
      <UpcomingEventsSection />
      
      {/* Black */}
      <GalleryTeaserSection />
      
      {/* Black */}
      <StatsSection />
      
      {/* Black */}
      <TestimonialsSection />
      
      {/* Black */}
      <NewsletterNew />
    </main>
  );
}

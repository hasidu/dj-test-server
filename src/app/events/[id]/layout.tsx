import { Metadata } from 'next';
import events from '@/data/events';

interface EventLayoutProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EventLayoutProps): Promise<Metadata> {
  // Make sure params is properly awaited if it's a promise
  const { id } = params;
  const event = events.find(event => event.id === id);
  
  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found',
    };
  }
  
  return {
    title: `${event.title} | La Foresta Events`,
    description: event.description,
  };
}

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | La Foresta Events',
  description: 'Browse upcoming electronic music events from La Foresta',
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

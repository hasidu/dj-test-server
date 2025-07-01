import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Events | La Foresta Events',
  description: 'View your saved events from La Foresta',
};

export default function SavedEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

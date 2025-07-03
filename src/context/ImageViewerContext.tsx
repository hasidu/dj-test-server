"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ImageViewerContextType {
  isImageViewerOpen: boolean;
  setImageViewerOpen: (open: boolean) => void;
}

const ImageViewerContext = createContext<ImageViewerContextType | undefined>(undefined);

export function ImageViewerProvider({ children }: { children: ReactNode }) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const setImageViewerOpen = (open: boolean) => {
    setIsImageViewerOpen(open);
  };

  return (
    <ImageViewerContext.Provider value={{ isImageViewerOpen, setImageViewerOpen }}>
      {children}
    </ImageViewerContext.Provider>
  );
}

export function useImageViewer() {
  const context = useContext(ImageViewerContext);
  if (context === undefined) {
    throw new Error('useImageViewer must be used within an ImageViewerProvider');
  }
  return context;
}

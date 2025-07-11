import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/FooterNew";
import { SavedEventsProvider } from "@/context/SavedEventsContext";
import { GlobalAudioProvider } from "@/context/GlobalAudioContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { ImageViewerProvider } from "@/context/ImageViewerContext";
import NavbarNew from "@/components/NavbarNew";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Foresta | Electronic Music & DJ Events",
  description: "Modern DJ Events Platform - Underground electronic music, mixes, podcasts and DJ performances. We Create, You Celebrate.",
  keywords: "DJ, electronic music, techno, house, events, live sets, music recordings, podcasts, interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationProvider>
            <SavedEventsProvider>
              <GlobalAudioProvider>
                <ImageViewerProvider>
                  <NavbarNew />
                  <main className="page-wrapper min-h-screen bg-background text-foreground transition-colors duration-500">
                    {children}
                  </main>
                  <Footer />
                </ImageViewerProvider>
              </GlobalAudioProvider>
            </SavedEventsProvider>
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

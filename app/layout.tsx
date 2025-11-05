import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'Amarjyoti Patra | Full-Stack Experience Architect',
  description: 'Game-inspired portfolio with AI-personalized imagery, immersive 3D scenes, and real-time analytics.',
  keywords: ['Software Engineer', 'Portfolio', 'Full Stack', 'Next.js', 'Three.js', 'React'],
  openGraph: {
    title: 'Amarjyoti Patra | Full-Stack Experience Architect',
    description: 'Explore a game UI inspired developer portfolio with adaptive music, AI imagery, and real-time insights.',
    images: ['/images/profile-hero.jpg']
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <Script src="https://trackme.dev/tracker.js" strategy="afterInteractive" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

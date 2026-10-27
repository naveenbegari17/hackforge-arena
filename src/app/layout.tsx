import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Shell } from '@/components/navigation/Shell';

export const metadata: Metadata = {
  title: 'HACKFORGE ARENA — AI Hackathon Preparation & Competition Simulator',
  description: 'Train Like a Beginner. Compete Like a Champion. The comprehensive training ground for college hackathons, SIH, and global developer challenges.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090D16] text-slate-100 antialiased min-h-screen">
        <AppProvider>
          <Shell>{children}</Shell>
        </AppProvider>
      </body>
    </html>
  );
}

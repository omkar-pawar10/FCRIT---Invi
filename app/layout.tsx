import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import DashboardLayout from '../components/common/DashboardLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nivesa | Multi-Broker True Exposure & Asset Intelligence',
  description:
    'A consent-based wealth platform providing retail investors with one unified look-through across brokers and depositories, overlap concentration analysis, and multilingual education on REITs, InvITs, bonds and gold.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#0a0a0c] text-white selection:bg-cyan-500 selection:text-black font-sans">
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c]" />}>
          <DashboardLayout>{children}</DashboardLayout>
        </Suspense>
      </body>
    </html>
  );
}

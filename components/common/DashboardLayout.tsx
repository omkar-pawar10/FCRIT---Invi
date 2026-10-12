'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { PersistentFooter } from './DisclaimerBanner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#0a0a0c] text-white overflow-x-hidden">
      {/* Desktop Fixed Left Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 animate-fade-in">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area (Scrolling Canvas) */}
      <div className="flex-1 min-w-0 flex flex-col relative">
        {/* Subtle Ambient Glow Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-600/5 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-gradient-to-br from-purple-600/5 to-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

        {/* Minimalist Top Bar */}
        <TopBar onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Main Canvas Scroll Area */}
        <main className="flex-1 w-full px-4 sm:px-8 py-6 relative z-10 flex flex-col">
          {children}
        </main>

        {/* Persistent Compliance Footer */}
        <PersistentFooter />
      </div>
    </div>
  );
}

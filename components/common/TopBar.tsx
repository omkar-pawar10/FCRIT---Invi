'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Shield,
  Menu,
  Moon,
  Sun,
  Sparkles,
  Command,
  X,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface TopBarProps {
  onToggleMobileMenu?: () => void;
}

export default function TopBar({ onToggleMobileMenu }: TopBarProps) {
  const searchQuery = useGameStore((state) => state.searchQuery);
  const setSearchQuery = useGameStore((state) => state.setSearchQuery);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Toggle & Pill Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-full bg-[#131316] border border-white/5 text-zinc-400 hover:text-white"
          aria-label="Toggle Mobile Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Pill-Shaped Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search securities, mutual funds, ISINs..."
            className="w-full bg-[#131316] border border-white/5 hover:border-white/10 focus:border-cyan-500/40 rounded-full pl-9 pr-14 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition shadow-inner"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-500">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Status Pill & Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* SEBI Guardrail Status Pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>SEBI-Aligned Guardrails</span>
        </div>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="p-2 rounded-full bg-[#131316] border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition"
          title={isDarkMode ? 'Dark Mode Active' : 'Light Accent Mode Active'}
          aria-label="Toggle Theme Mode"
        >
          {isDarkMode ? (
            <Moon className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          )}
        </button>

        {/* Notifications Icon Button with Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="p-2 rounded-full bg-[#131316] border border-white/5 text-zinc-400 hover:text-white relative transition"
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#16161a] border border-white/10 rounded-2xl p-4 shadow-2xl space-y-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Portfolio Alerts
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-zinc-500 hover:text-white text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#131316] border border-white/5">
                  <span className="text-amber-400 font-semibold block text-[11px]">
                    Look-Through Overlap Alert
                  </span>
                  <p className="text-zinc-400 text-[11px] mt-0.5 leading-snug">
                    HDFC Bank concentration exceeded 15% combined weight across demat and 3 mutual funds.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#131316] border border-white/5">
                  <span className="text-cyan-400 font-semibold block text-[11px]">
                    Multi-Asset Gap Detected
                  </span>
                  <p className="text-zinc-400 text-[11px] mt-0.5 leading-snug">
                    0% allocation in REITs & InvITs. Review institutional primers in Academy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function SoundToggle({ className = '' }: { className?: string }) {
  const isSoundMuted = useGameStore((state) => state.isSoundMuted);
  const toggleSound = useGameStore((state) => state.toggleSound);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-200 text-xs font-semibold select-none ${
        isSoundMuted
          ? 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500'
          : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
      } ${className}`}
      aria-label={isSoundMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
      title={isSoundMuted ? 'Sound FX Muted (Click to turn ON)' : 'Sound FX Active (Click to mute)'}
    >
      {isSoundMuted ? (
        <VolumeX className="w-4 h-4 text-slate-400" />
      ) : (
        <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
      )}
      <span className="hidden sm:inline">{isSoundMuted ? 'Muted' : 'Sound ON'}</span>
    </button>
  );
}

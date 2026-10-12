'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Check } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import Mascot from './Mascot';

export default function LevelUpModal() {
  const levelUpNotice = useGameStore((state) => state.levelUpNotice);
  const clearNotice = useGameStore((state) => state.clearLevelUpModal);

  useEffect(() => {
    if (levelUpNotice) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#f59e0b', '#10b981', '#ec4899'],
        });
      } catch {
        // Fallback gracefully if canvas context not ready
      }
    }
  }, [levelUpNotice]);

  if (!levelUpNotice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950/80 border-2 border-cyan-400/80 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(6,182,212,0.35)]">
        {/* Glow halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <Mascot size={90} mood="cheering" />
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            Level Up Celebration!
          </div>
        </div>

        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-emerald-400 mt-3">
          Level {levelUpNotice.newLevel} Unlocked!
        </h3>
        <p className="text-lg font-bold text-slate-200 mt-1">
          {levelUpNotice.levelTitle}
        </p>

        <p className="text-xs text-slate-400 mt-2 px-4 leading-relaxed">
          Your financial literacy and exposure analysis skills are growing. Keep exploring hidden clones and mastering asset classes!
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={clearNotice}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-95 transition"
          >
            <Check className="w-4 h-4" />
            Continue Learning Quest
          </button>
        </div>
      </div>
    </div>
  );
}

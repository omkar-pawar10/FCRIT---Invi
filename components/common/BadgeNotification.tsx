'use client';

import React, { useEffect } from 'react';
import { Award, X, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export default function BadgeNotification() {
  const newBadge = useGameStore((state) => state.newBadgeUnlocked);
  const clearBadge = useGameStore((state) => state.clearBadgeToast);

  useEffect(() => {
    if (newBadge) {
      const timer = setTimeout(() => {
        clearBadge();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newBadge, clearBadge]);

  if (!newBadge) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-bounce sm:animate-none">
      <div className="bg-gradient-to-r from-amber-950/90 via-slate-900/95 to-slate-950 border-2 border-amber-400/80 rounded-2xl p-4 shadow-[0_10px_30px_rgba(245,158,11,0.3)] backdrop-blur-md flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0 shadow-inner">
          <Award className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="flex-1 pr-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Badge Unlocked!
          </div>
          <h4 className="text-sm font-extrabold text-white mt-0.5">{newBadge.title}</h4>
          <p className="text-xs text-slate-300 mt-1 leading-snug">{newBadge.description}</p>
          <div className="mt-2 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <span>+{newBadge.xpValue} XP Earned</span>
          </div>
        </div>
        <button
          onClick={clearBadge}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          aria-label="Dismiss badge notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

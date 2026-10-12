'use client';

import React from 'react';
import { ShieldAlert, BookOpen } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { GUARDRAIL_DISCLAIMERS } from '../../lib/guardrails';

export function EducationalBadge({ className = '' }: { className?: string }) {
  const language = useGameStore((state) => state.language);
  const text = GUARDRAIL_DISCLAIMERS[language].banner;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide shadow-sm backdrop-blur-sm ${className}`}
      role="status"
    >
      <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <span className="truncate">{text}</span>
    </div>
  );
}

export function PersistentFooter() {
  const language = useGameStore((state) => state.language);
  const disclaimerText = GUARDRAIL_DISCLAIMERS[language].footer;

  return (
    <footer className="w-full mt-auto border-t border-white/5 bg-[#070709]/80 backdrop-blur-md py-4 px-6 text-center z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div className="flex items-center gap-2 text-zinc-400 font-semibold shrink-0">
          <ShieldAlert className="w-4 h-4 shrink-0 text-cyan-400" />
          <span className="text-zinc-300">SEBI-Aligned Guardrails</span>
        </div>
        <p className="text-left md:text-center text-[11px] leading-relaxed text-zinc-500 max-w-4xl">
          {disclaimerText}
        </p>
        <div className="text-[10px] text-zinc-600 shrink-0 font-mono">
          Phase 1 Prototype • Client-Side Sandbox
        </div>
      </div>
    </footer>
  );
}

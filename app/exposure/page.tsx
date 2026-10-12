'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  X,
  Sparkles,
} from 'lucide-react';
import { apiGateway } from '../../lib/api';
import { ExposureAnalysis, HiddenClone } from '../../lib/types';
import CloneRadar from '../../components/worlds/CloneRadar';
import GapLockZone from '../../components/worlds/GapLockZone';
import { useGameStore } from '../../store/useGameStore';

export default function ExposurePage() {
  const [exposure, setExposure] = useState<ExposureAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCloneModal, setSelectedCloneModal] = useState<HiddenClone | null>(null);

  const activePersonaId = useGameStore((state) => state.activePersonaId);

  useEffect(() => {
    let isMounted = true;
    apiGateway.getExposure().then((data) => {
      if (isMounted) {
        setExposure(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [activePersonaId]);

  if (loading || !exposure) {
    return (
      <div className="w-full max-w-7xl mx-auto py-20 text-center">
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-zinc-400 font-mono">Computing look-through underlying exposure matrix...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Top Banner with Ambient Glow */}
      <div className="relative rounded-2xl bg-[#131316] border border-white/5 p-6 sm:p-7 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                Risk & Overlap Diagnostics
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400 font-mono">
                Direct Demat & Mutual Fund Look-Through
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              True Look-Through Exposure Matrix
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Eliminates the illusion of diversification by decomposing active mutual fund holdings into individual stocks and measuring consolidated concentration.
            </p>
          </div>

          <Link
            href="/language-lab"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-white/[0.04] text-cyan-300 hover:text-white border border-white/10 hover:border-white/20 font-bold text-xs transition shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Ask Assistant About Overlaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Exposure Health Diagnostic HUD */}
      <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm relative overflow-hidden">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 font-mono font-black text-2xl shrink-0">
            {exposure.diversificationScoreEducational}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Diversification & Exposure Health Index
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">(0 - 100 scale)</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-lg leading-relaxed">
              Consolidated metric incorporating single-stock concentration penalties and multi-asset gaps. A score below 70 indicates substantial duplication across active funds.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 shrink-0 sm:border-l sm:border-white/5 sm:pl-6">
          <div>
            <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
              Hidden Overlaps
            </span>
            <p className="text-xl font-extrabold font-mono text-purple-300 mt-0.5">
              {exposure.hiddenClones.length} Securities
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
              Asset Class Gaps
            </span>
            <p className="text-xl font-extrabold font-mono text-rose-400 mt-0.5">
              {exposure.gaps.length} Unallocated
            </p>
          </div>
        </div>
      </div>

      {/* Part 1: Hidden Clones (Overlap Analysis) */}
      <div>
        <CloneRadar
          clones={exposure.hiddenClones}
          onSelectClone={(c) => setSelectedCloneModal(c)}
        />
      </div>

      {/* Part 2: Missing Asset Classes (Gap Diagnostic) */}
      <div className="pt-2">
        <GapLockZone gaps={exposure.gaps} />
      </div>

      {/* Modal on Clone inspection */}
      {selectedCloneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#131316] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-white/5">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedCloneModal.name}
                </h3>
                <p className="text-xs font-mono text-purple-400 mt-0.5">
                  ISIN: {selectedCloneModal.isin} • Sector: {selectedCloneModal.sector}
                </p>
              </div>
              <button
                onClick={() => setSelectedCloneModal(null)}
                className="text-zinc-500 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[#0a0a0c]/80 border border-white/5 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">Total Consolidated Exposure:</span>
                <span className="font-bold text-amber-400">
                  ₹{selectedCloneModal.totalCombinedValue.toLocaleString('en-IN')} (
                  {selectedCloneModal.portfolioPercentage}% of Net Worth)
                </span>
              </div>
              {selectedCloneModal.directExposure && (
                <div className="flex justify-between text-cyan-300">
                  <span>Direct Demat ({selectedCloneModal.directExposure.broker}):</span>
                  <span>₹{selectedCloneModal.directExposure.value.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-purple-300">
                <span>Via {selectedCloneModal.indirectExposure.length} Mutual Funds:</span>
                <span>
                  ₹
                  {selectedCloneModal.indirectExposure
                    .reduce((a, b) => a + b.effectiveValue, 0)
                    .toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2 font-mono">
                Underlying Fund Breakdown:
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {selectedCloneModal.indirectExposure.map((f, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-[#0a0a0c]/60 border border-white/5"
                  >
                    <span className="text-zinc-300 truncate max-w-[240px]">{f.fundName}</span>
                    <span className="font-mono text-purple-300 font-bold">
                      ₹{f.effectiveValue.toLocaleString('en-IN')} ({f.weightPercentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#0a0a0c]/60 border border-white/5 text-[11px] text-zinc-400 leading-relaxed">
              <span className="font-bold text-amber-400 block mb-0.5">
                Educational Risk Perspective:
              </span>
              Holding an individual stock in direct demat while your active mutual funds concurrently maintain overweight allocations increases single-entity drawdown exposure.
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedCloneModal(null)}
                className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 text-xs font-semibold transition"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React from 'react';
import { Radar, Layers, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { HiddenClone } from '../../lib/types';

interface CloneRadarProps {
  clones: HiddenClone[];
  onSelectClone?: (clone: HiddenClone) => void;
}

export default function CloneRadar({ clones, onSelectClone }: CloneRadarProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Radar className="w-4 h-4 text-purple-400" />
          Underlying Stock Overlaps ({clones.length} Securities)
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          Securities held both directly in demat and indirectly through actively managed mutual funds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clones.map((clone) => {
          const directVal = clone.directExposure?.value || 0;
          const indirectVal = clone.indirectExposure.reduce(
            (acc, c) => acc + c.effectiveValue,
            0
          );
          const isHighRisk = clone.portfolioPercentage >= 15;

          return (
            <div
              key={clone.symbol}
              onClick={() => onSelectClone && onSelectClone(clone)}
              className="bg-[#131316] border border-white/5 hover:border-purple-500/30 rounded-2xl p-5 shadow-sm transition-all duration-200 cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/5 blur-2xl pointer-events-none rounded-full" />
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                        {clone.name}
                      </h4>
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                        {clone.symbol}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 mt-0.5 block">{clone.sector}</span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-base font-extrabold font-mono ${
                        isHighRisk ? 'text-amber-400' : 'text-purple-300'
                      }`}
                    >
                      {clone.portfolioPercentage}%
                    </span>
                    <span className="block text-[10px] text-zinc-500 font-mono">
                      Consolidated
                    </span>
                  </div>
                </div>

                {/* Risk Severity Pill Tag */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  {isHighRisk ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      High Concentration Overlap
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                      Moderate Look-Through Overlap
                    </span>
                  )}
                </div>

                {/* Combined Valuation Pill Bar */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#0a0a0c]/80 border border-white/5">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-500">Capital Exposure:</span>
                    <span className="font-bold text-white">
                      ₹{clone.totalCombinedValue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Stacked Pill Bar */}
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden flex">
                    {directVal > 0 && (
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full"
                        style={{
                          width: `${(directVal / clone.totalCombinedValue) * 100}%`,
                        }}
                        title={`Direct Demat: ₹${directVal.toLocaleString('en-IN')}`}
                      />
                    )}
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full"
                      style={{
                        width: `${(indirectVal / clone.totalCombinedValue) * 100}%`,
                      }}
                      title={`Via Funds: ₹${indirectVal.toLocaleString('en-IN')}`}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-zinc-400 mt-2.5 font-mono">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                      Direct Demat: ₹{directVal.toLocaleString('en-IN')}
                    </span>
                    <span className="flex items-center gap-1.5 text-purple-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                      {clone.indirectExposure.length} Funds: ₹{indirectVal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Underlying Fund Breakdown */}
                <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
                    Mutual Funds Holding This Stock:
                  </span>
                  {clone.indirectExposure.map((fund, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-xs text-zinc-300"
                    >
                      <span className="truncate max-w-[210px] text-zinc-400 flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-purple-400 shrink-0" />
                        {fund.fundName}
                      </span>
                      <span className="font-mono text-purple-300 font-semibold shrink-0">
                        ₹{fund.effectiveValue.toLocaleString('en-IN')} ({fund.weightPercentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between text-[11px] text-zinc-500">
                <span>View look-through diagnostic</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Truck,
  Landmark,
  Gem,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { AssetGap } from '../../lib/types';

interface GapLockZoneProps {
  gaps: AssetGap[];
}

export default function GapLockZone({ gaps }: GapLockZoneProps) {
  const getAssetIcon = (assetClass: string) => {
    switch (assetClass) {
      case 'REIT':
        return Building2;
      case 'INVIT':
        return Truck;
      case 'BOND':
        return Landmark;
      case 'GOLD':
        return Gem;
      default:
        return Building2;
    }
  };

  return (
    <div className="space-y-4" id="gaps">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          Unallocated Alternative Asset Classes ({gaps.length} Gaps Detected)
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          These institutional asset classes have 0% exposure in your portfolio. Incorporating non-correlated assets helps protect against cyclical drawdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gaps.map((gap) => {
          const Icon = getAssetIcon(gap.assetClass);

          return (
            <div
              key={gap.assetClass}
              className="bg-[#131316] border border-white/5 hover:border-amber-500/30 rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20 inline-block mb-1">
                        0% Allocation Detected
                      </span>
                      <h4 className="text-base font-bold text-white leading-tight">
                        {gap.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Subtitle / Why It Matters */}
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  {gap.whyItMatters}
                </p>

                {/* Regulatory Foundation */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#0a0a0c]/80 border border-white/5 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-semibold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Regulatory Framework:</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-zinc-500">{gap.sebiDefinition}</p>
                </div>
              </div>

              {/* Action Link to Academy */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">
                  Institutional Primer
                </span>
                <Link
                  href={`/learn-hub#${gap.learnHubZoneId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-transparent hover:bg-white/[0.04] text-amber-300 hover:text-white border border-white/10 font-semibold text-xs transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Primer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

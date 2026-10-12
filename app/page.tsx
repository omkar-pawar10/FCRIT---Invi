'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Layers,
  Radar,
  PieChart,
  Bot,
  GraduationCap,
  ArrowUpRight,
  ArrowRight,
  AlertTriangle,
  Building,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { TRANSLATIONS } from '../lib/i18n';
import { apiGateway } from '../lib/api';
import { UnifiedPortfolio, ExposureAnalysis } from '../lib/types';
import { SYNTHETIC_PERSONAS } from '../mocks/personas';

export default function HomePage() {
  const language = useGameStore((state) => state.language);
  const activePersonaId = useGameStore((state) => state.activePersonaId);
  const searchQuery = useGameStore((state) => state.searchQuery);

  const t = TRANSLATIONS[language];
  const activePersona =
    SYNTHETIC_PERSONAS.find((p) => p.id === activePersonaId) || SYNTHETIC_PERSONAS[0];

  const [portfolio, setPortfolio] = useState<UnifiedPortfolio | null>(null);
  const [exposure, setExposure] = useState<ExposureAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([apiGateway.getPortfolio(), apiGateway.getExposure()]).then(
      ([pData, eData]) => {
        if (isMounted) {
          setPortfolio(pData);
          setExposure(eData);
          setLoading(false);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, [activePersonaId]);

  if (loading || !portfolio || !exposure) {
    return (
      <div className="w-full max-w-7xl mx-auto py-20 text-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-zinc-400 font-mono">Consolidating multi-broker demat portfolios...</p>
      </div>
    );
  }

  // Calculate Asset Allocation percentages
  const equityValue = portfolio.holdings
    .filter((h) => h.assetClass === 'EQUITY')
    .reduce((acc, cur) => acc + cur.currentValue, 0);
  const mfValue = portfolio.mutualFunds.reduce((acc, cur) => acc + cur.currentValue, 0);
  const totalVal = portfolio.currentValue || 1;
  const equityPct = Math.round((equityValue / totalVal) * 100);
  const mfPct = Math.round((mfValue / totalVal) * 100);
  const cashPct = Math.max(0, 100 - (equityPct + mfPct));

  const topClone = exposure.hiddenClones[0];

  // Search filter for top holdings table
  const query = searchQuery.toLowerCase().trim();
  const displayedHoldings = portfolio.holdings
    .filter((h) => !query || h.name.toLowerCase().includes(query) || h.symbol.toLowerCase().includes(query) || h.isin.toLowerCase().includes(query))
    .slice(0, 4);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Active Profile Overview Card with Ambient Glow */}
      <div className="relative rounded-2xl bg-[#131316] border border-white/5 p-6 sm:p-7 overflow-hidden">
        {/* Subtle Backdrop Glow */}
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                Active Profile
              </span>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <strong className="text-white font-semibold">{activePersona.name}</strong>
                <span className="text-zinc-500">({activePersona.riskProfile})</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.sections.dashboard.welcome}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-2xl leading-relaxed">
              {activePersona.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/base-camp"
              className="px-4 py-2 rounded-full bg-transparent hover:bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/20 text-xs font-semibold transition"
            >
              Switch Profile
            </Link>
            <Link
              href="/vault"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:brightness-110 text-white text-xs font-bold transition shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
            >
              <span>{t.sections.dashboard.viewAllHoldings}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Net Worth */}
        <div className="rounded-2xl bg-[#131316] border border-white/5 p-5 relative overflow-hidden group hover:border-white/10 transition">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>{t.common.totalNetWorth}</span>
            <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
              ₹{portfolio.currentValue.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-semibold">
            <span className="inline-block px-1.5 py-0.2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px]">
              +₹14,200 (+0.37% 1D)
            </span>
          </div>
        </div>

        {/* KPI 2: Invested Capital */}
        <div className="rounded-2xl bg-[#131316] border border-white/5 p-5 relative overflow-hidden group hover:border-white/10 transition">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>{t.common.totalInvested}</span>
            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
              ₹{portfolio.totalInvested.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 text-xs text-zinc-500 font-mono">
            {portfolio.holdings.length + portfolio.mutualFunds.length} Instruments Across Brokers
          </div>
        </div>

        {/* KPI 3: Unrealized P&L */}
        <div className="rounded-2xl bg-[#131316] border border-white/5 p-5 relative overflow-hidden group hover:border-white/10 transition">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>{t.common.unrealizedPnL}</span>
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
              +₹{portfolio.totalUnrealizedPnl.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-2 text-xs text-emerald-400/90 font-mono font-semibold">
            +{portfolio.totalPnlPercentage}% Total Consolidated Gain
          </div>
        </div>

        {/* KPI 4: Diversification Health Score */}
        <div className="rounded-2xl bg-[#131316] border border-white/5 p-5 relative overflow-hidden group hover:border-white/10 transition">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>{t.sections.dashboard.portfolioHealth}</span>
            <div className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Radar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 tracking-tight">
              {exposure.diversificationScoreEducational}
            </span>
            <span className="text-xs font-mono text-zinc-500">/ 100</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400/90 font-mono font-medium">
            <span className="inline-block px-1.5 py-0.2 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px]">
              {exposure.hiddenClones.length} Clones • {exposure.gaps.length} Gaps
            </span>
          </div>
        </div>
      </div>

      {/* Asset Allocation & Connected Entities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Asset Allocation Visualizer */}
        <div className="lg:col-span-2 rounded-2xl bg-[#131316] border border-white/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white tracking-wide">
                {t.sections.dashboard.assetAllocation}
              </h2>
            </div>
            <span className="text-xs text-zinc-500 font-mono">
              {portfolio.sourcesConnected.join(' • ')}
            </span>
          </div>

          {/* Saturated Multi-Segment Pill Bar */}
          <div className="w-full h-3 rounded-full bg-[#0a0a0c] border border-white/5 overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${equityPct}%` }}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all"
              title={`Direct Equities: ${equityPct}%`}
            />
            <div
              style={{ width: `${mfPct}%` }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all"
              title={`Mutual Funds: ${mfPct}%`}
            />
            {cashPct > 0 && (
              <div
                style={{ width: `${cashPct}%` }}
                className="bg-zinc-700 h-full transition-all"
                title={`Liquid / Cash: ${cashPct}%`}
              />
            )}
          </div>

          {/* Allocation Sub-Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0a0a0c]/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="font-semibold">Direct Equities</span>
              </div>
              <p className="text-base font-extrabold font-mono text-white mt-1.5">{equityPct}%</p>
              <p className="text-[10px] text-zinc-500 font-mono">
                ₹{equityValue.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0a0c]/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span className="font-semibold">Mutual Funds</span>
              </div>
              <p className="text-base font-extrabold font-mono text-white mt-1.5">{mfPct}%</p>
              <p className="text-[10px] text-zinc-500 font-mono">
                ₹{mfValue.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0a0c]/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-amber-400/50 inline-block" />
                <span>REITs & InvITs</span>
              </div>
              <p className="text-base font-extrabold font-mono text-rose-400 mt-1.5">0%</p>
              <span className="text-[10px] text-rose-400/80 font-mono">Unallocated Gap</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0a0c]/60 border border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-rose-400/50 inline-block" />
                <span>Bonds & Gold</span>
              </div>
              <p className="text-base font-extrabold font-mono text-rose-400 mt-1.5">0%</p>
              <span className="text-[10px] text-rose-400/80 font-mono">Unallocated Gap</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Connected Entities Summary */}
        <div className="rounded-2xl bg-[#131316] border border-white/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>{t.common.accountsConnected}</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Live Feeds Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Consolidated demat & RTA records parsed in offline browser sandbox.
            </p>

            <div className="space-y-2">
              {portfolio.sourcesConnected.map((source) => (
                <div
                  key={source}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a0a0c]/60 border border-white/5 text-xs"
                >
                  <span className="font-semibold text-zinc-300">{source}</span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/base-camp"
            className="mt-4 w-full py-2.5 rounded-full bg-transparent hover:bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/20 text-xs font-semibold text-center transition block"
          >
            Manage Data Sources
          </Link>
        </div>
      </div>

      {/* Two Wide Ambient Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alert 1: Look-Through Stock Overlap Concentration */}
        {topClone && (
          <div className="rounded-2xl bg-[#131316] border border-white/5 p-6 relative overflow-hidden flex flex-col justify-between group hover:border-purple-500/30 transition">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/10 blur-3xl pointer-events-none rounded-full" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Radar className="w-3 h-3" />
                  Look-Through Overlap Alert
                </span>
                <span className="text-xs font-mono font-extrabold text-amber-400">
                  {topClone.portfolioPercentage}% Combined Weight
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-1">
                Concentrated Holding: {topClone.name} ({topClone.symbol})
              </h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Direct demat holding: <strong className="text-cyan-400 font-mono">₹{(topClone.directExposure?.value || 0).toLocaleString('en-IN')}</strong>, plus <strong className="text-purple-400 font-mono">₹{topClone.indirectExposure.reduce((a, b) => a + b.effectiveValue, 0).toLocaleString('en-IN')}</strong> indirectly across {topClone.indirectExposure.length} mutual funds.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                Single-stock concentration risk
              </span>
              <Link
                href="/exposure"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
              >
                <span>{t.sections.dashboard.viewExposureMatrix}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Alert 2: Multi-Asset Gaps Diagnostic */}
        <div className="rounded-2xl bg-[#131316] border border-white/5 p-6 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/30 transition">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Asset Allocation Diagnostic
              </span>
              <span className="text-xs font-mono font-extrabold text-rose-400">
                {exposure.gaps.length} Missing Classes
              </span>
            </div>

            <h3 className="text-base font-bold text-white mt-1">
              0% Allocation in REITs, InvITs, Bonds & Gold
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Your portfolio is strictly equity-concentrated. Alternative cash-flow generating assets can balance volatility during equity market drawdowns.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              Institutional primers available
            </span>
            <Link
              href="/exposure#gaps"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
            >
              <span>Explore Asset Gaps & Primers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Snapshot of Top Holdings Table */}
      <div className="rounded-2xl bg-[#131316] border border-white/5 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{t.sections.dashboard.topHoldings}</span>
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Consolidated demat equities and mutual fund units
            </p>
          </div>

          <Link
            href="/vault"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            <span>{t.sections.dashboard.viewAllHoldings}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 bg-[#0a0a0c]/60 border-b border-white/5">
              <tr>
                <th className="py-2.5 px-3.5 font-semibold">Security / Fund</th>
                <th className="py-2.5 px-3.5 font-semibold">Entity</th>
                <th className="py-2.5 px-3.5 font-semibold">ISIN</th>
                <th className="py-2.5 px-3.5 font-semibold text-right">Value (₹)</th>
                <th className="py-2.5 px-3.5 font-semibold text-right">Return (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {displayedHoldings.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3.5 font-semibold text-white">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-zinc-500 ml-2 font-mono">
                      {item.symbol}
                    </span>
                  </td>
                  <td className="py-3 px-3.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                      {item.source}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[11px] text-cyan-400/80">
                    {item.isin}
                  </td>
                  <td className="py-3 px-3.5 font-mono font-bold text-white text-right">
                    ₹{item.currentValue.toLocaleString('en-IN')}
                  </td>
                  <td
                    className={`py-3 px-3.5 font-mono font-bold text-right ${
                      item.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    +{item.pnlPercentage}%
                  </td>
                </tr>
              ))}
              {portfolio.mutualFunds.slice(0, 2).map((fund) => (
                <tr key={fund.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3.5 font-semibold text-purple-200">
                    <span>{fund.name}</span>
                    <span className="text-[10px] text-purple-400 ml-2 font-mono">MF</span>
                  </td>
                  <td className="py-3 px-3.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {fund.source}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[11px] text-purple-400/80">
                    {fund.isin}
                  </td>
                  <td className="py-3 px-3.5 font-mono font-bold text-white text-right">
                    ₹{fund.currentValue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3.5 font-mono font-bold text-emerald-400 text-right">
                    +{fund.pnlPercentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Two-Column Modules: Assistant Query Strip & Academy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wealth Assistant Quick Query */}
        <div className="rounded-2xl bg-[#131316] border border-white/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  {t.sections.assistant.title}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                Guardrail Interceptor Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Get plain-language explanations in English, हिंदी, or मराठी with regulatory citations.
            </p>

            <div className="space-y-2">
              {t.sections.assistant.promptChips.slice(0, 2).map((chip, idx) => (
                <Link
                  key={idx}
                  href={`/language-lab?q=${encodeURIComponent(chip)}`}
                  className="block text-xs text-zinc-300 hover:text-white bg-[#0a0a0c]/80 hover:bg-white/[0.03] border border-white/5 rounded-xl px-3.5 py-2.5 transition"
                >
                  &ldquo;{chip}&rdquo;
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/language-lab"
            className="mt-5 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-xs font-bold transition"
          >
            <span>Open Wealth Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Knowledge Academy Modules */}
        <div className="rounded-2xl bg-[#131316] border border-white/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  {t.sections.academy.title}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                4 Institutional Primers
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Institutional primers covering REITs, InvITs, Bonds, and Gold with scenario assessments.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#0a0a0c]/60 border border-white/5">
                <span className="font-semibold text-zinc-200 block">REITs Primer</span>
                <span className="text-[10px] text-zinc-500">Commercial Real Estate</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a0a0c]/60 border border-white/5">
                <span className="font-semibold text-zinc-200 block">InvITs Primer</span>
                <span className="text-[10px] text-zinc-500">Infrastructure Cash Flows</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a0a0c]/60 border border-white/5">
                <span className="font-semibold text-zinc-200 block">Corporate Bonds</span>
                <span className="text-[10px] text-zinc-500">Fixed Income Coupons</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a0a0c]/60 border border-white/5">
                <span className="font-semibold text-zinc-200 block">Gold & SGBs</span>
                <span className="text-[10px] text-zinc-500">Inflation Protection</span>
              </div>
            </div>
          </div>

          <Link
            href="/learn-hub"
            className="mt-5 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-bold transition"
          >
            <span>Enter Knowledge Academy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

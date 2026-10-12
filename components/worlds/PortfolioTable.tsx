'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Building,
  TrendingUp,
  ArrowRight,
  Search,
  Filter,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react';
import { apiGateway } from '../../lib/api';
import { UnifiedPortfolio } from '../../lib/types';
import { useGameStore } from '../../store/useGameStore';

export default function PortfolioTable() {
  const [portfolio, setPortfolio] = useState<UnifiedPortfolio | null>(null);
  const [groupBy, setGroupBy] = useState<'source' | 'assetClass'>('source');
  const [copiedIsin, setCopiedIsin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const activePersonaId = useGameStore((state) => state.activePersonaId);
  const searchQuery = useGameStore((state) => state.searchQuery);
  const setSearchQuery = useGameStore((state) => state.setSearchQuery);

  useEffect(() => {
    let isMounted = true;
    apiGateway.getPortfolio().then((data) => {
      if (isMounted) {
        setPortfolio(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [activePersonaId]);

  const handleCopyIsin = (isin: string) => {
    navigator.clipboard.writeText(isin);
    setCopiedIsin(isin);
    setTimeout(() => setCopiedIsin(null), 1500);
  };

  if (loading || !portfolio) {
    return (
      <div className="w-full max-w-7xl mx-auto py-20 text-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-zinc-400 font-mono">Loading consolidated portfolio holdings...</p>
      </div>
    );
  }

  // Filter holdings & funds by search query
  const query = searchQuery.toLowerCase().trim();
  const filteredHoldings = portfolio.holdings.filter(
    (h) =>
      h.name.toLowerCase().includes(query) ||
      h.symbol.toLowerCase().includes(query) ||
      h.isin.toLowerCase().includes(query)
  );
  const filteredFunds = portfolio.mutualFunds.filter(
    (f) =>
      f.name.toLowerCase().includes(query) ||
      f.isin.toLowerCase().includes(query) ||
      f.topHoldings.some((t) => t.symbol.toLowerCase().includes(query))
  );

  // Group by Source
  const groupedBySource: Record<string, typeof filteredHoldings> = {};
  filteredHoldings.forEach((h) => {
    if (!groupedBySource[h.source]) groupedBySource[h.source] = [];
    groupedBySource[h.source].push(h);
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Top Banner with Ambient Glow */}
      <div className="relative rounded-2xl bg-[#131316] border border-white/5 p-6 sm:p-7 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                Holdings Ledger
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400 font-mono">
                {portfolio.sourcesConnected.join(', ')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Consolidated Holdings & Depositories
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Unified view of direct demat securities and mutual fund units merged from broker statements and RTA feeds.
            </p>
          </div>

          <Link
            href="/exposure"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 hover:brightness-110 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.3)] transition shrink-0"
          >
            <span>Run True Exposure Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Aggregate Metrics Bar (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#131316] border border-white/5">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block">
            Total Invested
          </span>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-white mt-1.5 tracking-tight">
            ₹{portfolio.totalInvested.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Capital deployed</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131316] border border-white/5">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block">
            Current Valuation
          </span>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-300 mt-1.5 tracking-tight">
            ₹{portfolio.currentValue.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Mark-to-market</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131316] border border-white/5">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block">
            Total Unrealized Return
          </span>
          <p
            className={`text-xl sm:text-2xl font-extrabold font-mono mt-1.5 tracking-tight ${
              portfolio.totalUnrealizedPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            +₹{portfolio.totalUnrealizedPnl.toLocaleString('en-IN')}{' '}
            <span className="text-xs">({portfolio.totalPnlPercentage}%)</span>
          </p>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Consolidated gain</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131316] border border-white/5">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block">
            Connected Entities
          </span>
          <p className="text-xl sm:text-2xl font-extrabold font-mono text-amber-300 mt-1.5 tracking-tight">
            {portfolio.sourcesConnected.length} Sources
          </p>
          <span className="text-[10px] text-zinc-500 truncate block mt-1">
            {portfolio.sourcesConnected.join(', ')}
          </span>
        </div>
      </div>

      {/* Control Strip: Search & Grouping Pill Toggles */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#131316] border border-white/5 p-3 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ticker, security name, or ISIN..."
            className="w-full bg-[#0a0a0c] border border-white/5 hover:border-white/10 focus:border-cyan-500/40 rounded-full pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 flex items-center gap-1 hidden sm:inline">
            <Filter className="w-3.5 h-3.5" />
            Group:
          </span>
          <div className="inline-flex rounded-full bg-[#0a0a0c] p-1 border border-white/5 text-xs">
            <button
              onClick={() => setGroupBy('source')}
              className={`px-3.5 py-1 rounded-full font-semibold transition ${
                groupBy === 'source'
                  ? 'bg-[#18181c] text-white shadow-sm border border-white/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              By Broker / Depository
            </button>
            <button
              onClick={() => setGroupBy('assetClass')}
              className={`px-3.5 py-1 rounded-full font-semibold transition ${
                groupBy === 'assetClass'
                  ? 'bg-[#18181c] text-white shadow-sm border border-white/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              By Asset Class
            </button>
          </div>
        </div>
      </div>

      {/* Grouped View: Source */}
      {groupBy === 'source' && (
        <div className="space-y-6">
          {Object.entries(groupedBySource).map(([sourceName, holdings]) => (
            <div
              key={sourceName}
              className="bg-[#131316] border border-white/5 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="bg-[#0a0a0c]/60 px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {sourceName}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    ({holdings.length} direct demat securities)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  ₹{holdings.reduce((acc, cur) => acc + cur.currentValue, 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 bg-[#0a0a0c]/40 border-b border-white/5">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Instrument</th>
                      <th className="py-2.5 px-4 font-semibold">ISIN Code</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Qty</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Avg Price</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Current Value</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Unrealized PnL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {holdings.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3 px-4 font-semibold text-white">
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {item.symbol}{item.sector ? ` • ${item.sector}` : ''}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleCopyIsin(item.isin)}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan-400 hover:text-cyan-300 bg-[#0a0a0c] px-2.5 py-0.5 rounded-full border border-white/5 group transition"
                            title="Click to copy ISIN"
                          >
                            <span>{item.isin}</span>
                            {copiedIsin === item.isin ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-zinc-500 group-hover:text-cyan-400" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4 font-mono text-right">{item.quantity}</td>
                        <td className="py-3 px-4 font-mono text-right">
                          ₹{item.averagePrice.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-white text-right">
                          ₹{item.currentValue.toLocaleString('en-IN')}
                        </td>
                        <td
                          className={`py-3 px-4 font-mono font-bold text-right ${
                            item.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          +{item.pnlPercentage}%
                          <span className="block text-[10px] text-zinc-500">
                            +₹{item.pnl.toLocaleString('en-IN')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Mutual Funds Depository Section */}
          <div className="bg-[#131316] border border-white/5 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#0a0a0c]/60 px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Mutual Funds (CAMS / KFintech / Depository RTA)
                </span>
                <span className="text-[11px] text-zinc-500">
                  ({filteredFunds.length} active schemes)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-purple-300">
                ₹{filteredFunds.reduce((acc, cur) => acc + cur.currentValue, 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="divide-y divide-white/5 p-4 space-y-4">
              {filteredFunds.map((fund) => (
                <div key={fund.id} className="pt-3 first:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{fund.name}</h4>
                      <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        ISIN: {fund.isin} • Category: {fund.fundCategory} • Entity: {fund.source}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xs sm:text-sm font-mono font-bold text-white">
                        ₹{fund.currentValue.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[11px] text-emerald-400 font-mono">
                        +{fund.pnlPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Fund Underlying Stocks Look-Through Bar */}
                  <div className="mt-2.5 bg-[#0a0a0c]/60 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        Top Underlying Portfolio Constituents (Look-Through):
                      </span>
                      <Link
                        href="/exposure"
                        className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                      >
                        <span>Check Overlaps</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {fund.topHoldings.map((top) => (
                        <span
                          key={top.symbol}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#131316] border border-white/10 text-zinc-300"
                        >
                          {top.symbol} <strong className="text-cyan-400">({top.weightPercentage}%)</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grouped View: Asset Class */}
      {groupBy === 'assetClass' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#131316] border border-white/5 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Direct Equities
            </h4>
            <div className="space-y-2">
              {filteredHoldings
                .filter((h) => h.assetClass === 'EQUITY')
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-xs py-2 border-b border-white/5"
                  >
                    <div>
                      <span className="text-white font-medium block">{item.name}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {item.symbol} • {item.source}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-cyan-300 font-bold block">
                        ₹{item.currentValue.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        +{item.pnlPercentage}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-[#131316] border border-white/5 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Mutual Funds & ETFs
            </h4>
            <div className="space-y-2">
              {filteredFunds.map((fund) => (
                <div
                  key={fund.id}
                  className="flex justify-between items-center text-xs py-2 border-b border-white/5"
                >
                  <div>
                    <span className="text-white font-medium block truncate max-w-[220px]">
                      {fund.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {fund.fundCategory} • {fund.source}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-purple-300 font-bold block">
                      ₹{fund.currentValue.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      +{fund.pnlPercentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Upload,
  Edit3,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { SYNTHETIC_PERSONAS } from '../../mocks/personas';
import { apiGateway } from '../../lib/api';
import { AssetClass, BrokerSource } from '../../lib/types';

export default function BaseCampConsent() {
  const router = useRouter();
  const hasConsented = useGameStore((state) => state.hasConsented);
  const setConsent = useGameStore((state) => state.setConsent);
  const activePersonaId = useGameStore((state) => state.activePersonaId);
  const setActivePersona = useGameStore((state) => state.setActivePersona);

  const [activeTab, setActiveTab] = useState<'persona' | 'upload' | 'manual'>('persona');
  const [selectedDepository, setSelectedDepository] = useState<'CDSL' | 'NSDL' | 'CAMS' | 'KFINTECH'>('CDSL');
  const [casPassword, setCasPassword] = useState('');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Manual entry state
  const [manualSymbol, setManualSymbol] = useState('TCS');
  const [manualName] = useState('Tata Consultancy Services');
  const [manualAssetClass, setManualAssetClass] = useState<AssetClass>('EQUITY');
  const [manualBroker, setManualBroker] = useState<BrokerSource>('ZERODHA');
  const [manualQuantity, setManualQuantity] = useState(25);
  const [manualPrice, setManualPrice] = useState(3850);
  const [manualSuccess, setManualSuccess] = useState(false);

  const handleSelectPersona = (id: string) => {
    setActivePersona(id);
    apiGateway.setPersonaId(id);
    router.push('/vault');
  };

  const handleSimulateCasUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulatingUpload(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSimulatingUpload(false);
    setUploadSuccess(true);
    setTimeout(() => {
      router.push('/vault');
    }, 700);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiGateway.postPortfolioManual({
      symbol: manualSymbol,
      name: manualName,
      assetClass: manualAssetClass,
      source: manualBroker,
      quantity: manualQuantity,
      averagePrice: manualPrice,
    });
    setManualSuccess(true);
    setTimeout(() => {
      router.push('/vault');
    }, 700);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6 relative">
      {/* Ambient background glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header & Consent Framework Card */}
      <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                SEBI-Aligned Consent Architecture
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Data Sources, Consent & Ingestion Architecture
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
                Privacy is maintained via client-side processing. All data parsing, deduplication, and look-through math execute locally in your browser sandbox. No PAN credentials or demat records leave your local session.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {!hasConsented ? (
              <button
                onClick={() => setConsent(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs transition shadow-lg shadow-blue-500/25"
              >
                Accept Consent Terms
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Consent Verified & Active</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs for Ingestion Mode */}
      <div className="flex items-center justify-center gap-1.5 bg-[#131316] p-1.5 rounded-full border border-white/5 shadow-inner max-w-2xl mx-auto">
        <button
          onClick={() => setActiveTab('persona')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-semibold transition ${
            activeTab === 'persona'
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Synthetic Investor Profiles (3)</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-semibold transition ${
            activeTab === 'upload'
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload e-CAS Statement</span>
        </button>

        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-semibold transition ${
            activeTab === 'manual'
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Manual Security Entry</span>
        </button>
      </div>

      {/* TAB 1: Synthetic Personas */}
      {activeTab === 'persona' && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Institutional Sample Investor Profiles
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select a pre-built multi-broker portfolio to test True Look-Through overlap detection and asset gap diagnostics immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SYNTHETIC_PERSONAS.map((persona) => {
              const isSelected = activePersonaId === persona.id;
              return (
                <div
                  key={persona.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? 'border-cyan-400/60 bg-[#16161c] shadow-xl shadow-cyan-500/5'
                      : 'border-white/5 bg-[#131316] hover:bg-[#17171c] hover:border-white/10'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl pointer-events-none rounded-full" />
                  )}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/5 text-cyan-300 border border-white/10">
                        {persona.riskProfile}
                      </span>
                      {isSelected && (
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Active
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white mt-3.5 tracking-tight">
                      {persona.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400 mt-0.5">{persona.alias}</p>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                      {persona.description}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-white/5 space-y-2 text-xs">
                      <div className="flex justify-between text-zinc-400">
                        <span>Consolidated Holdings:</span>
                        <span className="font-mono text-white font-bold">
                          {persona.portfolioSummary.holdingCount} instruments
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Top Stock Overlap:</span>
                        <span className="font-mono text-amber-300 truncate max-w-[140px]">
                          {persona.portfolioSummary.topOverlapStock.split(' ')[0]}
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Asset Class Gaps:</span>
                        <span className="font-mono text-rose-400 font-extrabold">
                          {persona.portfolioSummary.gapCount} unallocated
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPersona(persona.id)}
                    className={`mt-5 w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10'
                    }`}
                  >
                    <span>{isSelected ? 'View Active Portfolio' : 'Switch To This Portfolio'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Upload CAS PDF */}
      {activeTab === 'upload' && (
        <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 sm:p-7 animate-fade-in max-w-xl mx-auto space-y-6 shadow-xl relative overflow-hidden">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Consolidated Account Statement (e-CAS) Ingestion
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Simulate uploading an encrypted CAS PDF statement from NSDL, CDSL, CAMS, or KFintech.
            </p>
          </div>

          {/* Depository Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(['CDSL', 'NSDL', 'CAMS', 'KFINTECH'] as const).map((source) => (
              <button
                key={source}
                onClick={() => setSelectedDepository(source)}
                className={`p-3 rounded-xl border text-center transition ${
                  selectedDepository === source
                    ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-300 font-bold'
                    : 'border-white/5 bg-[#0a0a0c] text-zinc-400 hover:border-white/10'
                }`}
              >
                <FileText className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <span className="text-xs font-medium">{source}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSimulateCasUpload} className="space-y-4">
            <div className="border-2 border-dashed border-white/10 hover:border-cyan-400/60 rounded-2xl p-6 text-center cursor-pointer transition bg-[#0a0a0c]">
              <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-zinc-200">
                Drop your <strong className="text-cyan-400">{selectedDepository}</strong> CAS PDF here
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                Local-only parsing • Zero network upload
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Statement Encryption Password (PAN / DOB)
              </label>
              <input
                type="password"
                placeholder="Enter password (mock test)"
                value={casPassword}
                onChange={(e) => setCasPassword(e.target.value)}
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {uploadSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CAS statement parsed and normalized. Loading portfolio ledger...</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSimulatingUpload}
              className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              {isSimulatingUpload ? (
                <span>Parsing & Normalizing ISIN Records...</span>
              ) : (
                <>
                  <span>Simulate CAS Ingestion</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Manual Entry Form */}
      {activeTab === 'manual' && (
        <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 sm:p-7 animate-fade-in max-w-xl mx-auto space-y-6 shadow-xl relative overflow-hidden">
          <div className="text-center">
            <h2 className="text-lg font-bold text-white tracking-tight">Manual Security Entry</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Directly input an instrument to consolidate into your portfolio view.
            </p>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Ticker / Symbol
                </label>
                <input
                  type="text"
                  value={manualSymbol}
                  onChange={(e) => setManualSymbol(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Asset Class
                </label>
                <select
                  value={manualAssetClass}
                  onChange={(e) => setManualAssetClass(e.target.value as AssetClass)}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="EQUITY">Direct Equity</option>
                  <option value="MUTUAL_FUND">Mutual Fund</option>
                  <option value="REIT">REIT</option>
                  <option value="INVIT">InvIT</option>
                  <option value="BOND">Corporate Bond</option>
                  <option value="GOLD">Sovereign Gold Bond</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Broker / Entity
                </label>
                <select
                  value={manualBroker}
                  onChange={(e) => setManualBroker(e.target.value as BrokerSource)}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="ZERODHA">Zerodha</option>
                  <option value="GROWW">Groww</option>
                  <option value="ANGEL_ONE">Angel One</option>
                  <option value="ICICI_DIRECT">ICICI Direct</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  value={manualQuantity}
                  onChange={(e) => setManualQuantity(Number(e.target.value))}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Avg Buy Price (₹)
                </label>
                <input
                  type="number"
                  value={manualPrice}
                  onChange={(e) => setManualPrice(Number(e.target.value))}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  required
                />
              </div>
            </div>

            {manualSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Security added to portfolio. Routing to holdings ledger...</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              <span>Record Instrument & View Holdings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

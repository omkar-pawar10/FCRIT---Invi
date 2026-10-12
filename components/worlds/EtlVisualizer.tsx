'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Database,
  Search,
} from 'lucide-react';

interface PipelineStage {
  id: number;
  label: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAGES: PipelineStage[] = [
  {
    id: 1,
    label: 'PARSER ENGINE',
    subtext: 'Scanning simulated CAS statement tables & multi-broker XML feeds',
    icon: Database,
  },
  {
    id: 2,
    label: 'INTEGRITY VALIDATION',
    subtext: 'Checking cryptographic checksums, PAN masking & transaction bounds',
    icon: ShieldCheck,
  },
  {
    id: 3,
    label: 'SCHEMA NORMALIZATION',
    subtext: 'Harmonizing Zerodha, Groww, CAMS, and KFintech records into unified domain model',
    icon: Cpu,
  },
  {
    id: 4,
    label: 'ISIN & TAXONOMY MAPPING',
    subtext: 'Resolving security tickers to master ISIN codes and sector classifications',
    icon: Search,
  },
];

export default function EtlVisualizer() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(1);
  const [progress, setProgress] = useState(25);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStage(2);
      setProgress(50);
    }, 700);

    const timer2 = setTimeout(() => {
      setCurrentStage(3);
      setProgress(75);
    }, 1400);

    const timer3 = setTimeout(() => {
      setCurrentStage(4);
      setProgress(95);
    }, 2100);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setIsFinished(true);
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleProceed = () => {
    router.push('/vault');
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4 text-center relative">
      {/* Ambient glow in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium uppercase tracking-wider mb-3">
          Client Pipeline Execution
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Data Ingestion & Normalization Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
          Real-time execution of client-side schema transformation, deduplication, and ISIN resolution.
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto my-8">
          <div className="flex justify-between text-xs font-bold font-mono text-zinc-400 mb-2">
            <span>NORMALIZATION PROGRESS</span>
            <span className="text-cyan-400">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-[#131316] rounded-full border border-white/5 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl mx-auto text-left">
          {STAGES.map((stage) => {
            const isDone = stage.id < currentStage || isFinished;
            const isActive = stage.id === currentStage && !isFinished;
            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className={`p-4.5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                  isDone
                    ? 'border-emerald-500/20 bg-emerald-950/10 text-zinc-200'
                    : isActive
                    ? 'border-cyan-400/60 bg-[#16161c] text-white shadow-xl shadow-cyan-500/5'
                    : 'border-white/5 bg-[#131316] text-zinc-500 opacity-60'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-xl pointer-events-none rounded-full" />
                )}
                <div className="flex items-center justify-between relative">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-inner ${
                        isDone
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : isActive
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                          : 'bg-[#18181c] text-zinc-500 border border-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-wider">{stage.label}</span>
                  </div>

                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isActive && (
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      PROCESSING...
                    </span>
                  )}
                </div>

                <p className="text-[11px] mt-2.5 leading-relaxed text-zinc-400 relative">{stage.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Proceed CTA */}
        <div className="mt-8">
          <button
            onClick={handleProceed}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-blue-500/25"
          >
            <span>{isFinished ? 'View Normalized Portfolio' : 'Skip & View Portfolio'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Layers, Radar, Bot, GraduationCap, Database } from 'lucide-react';

export default function WorldMap() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 text-center">
      <h2 className="text-xl font-bold text-white mb-2">Unified Wealth Intelligence Navigation</h2>
      <p className="text-xs text-slate-400 mb-6">Access institutional tools and portfolio look-through analytics.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Link href="/" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex flex-col items-center gap-2 text-xs">
          <LayoutDashboard className="w-5 h-5 text-cyan-400" />
          <span>Dashboard</span>
        </Link>
        <Link href="/vault" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex flex-col items-center gap-2 text-xs">
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>Holdings</span>
        </Link>
        <Link href="/exposure" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex flex-col items-center gap-2 text-xs">
          <Radar className="w-5 h-5 text-purple-400" />
          <span>True Exposure</span>
        </Link>
        <Link href="/language-lab" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex flex-col items-center gap-2 text-xs">
          <Bot className="w-5 h-5 text-cyan-400" />
          <span>Wealth Assistant</span>
        </Link>
        <Link href="/learn-hub" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex flex-col items-center gap-2 text-xs">
          <GraduationCap className="w-5 h-5 text-amber-400" />
          <span>Academy</span>
        </Link>
        <Link href="/base-camp" className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex flex-col items-center gap-2 text-xs">
          <Database className="w-5 h-5 text-blue-400" />
          <span>Data Sources</span>
        </Link>
      </div>
    </div>
  );
}

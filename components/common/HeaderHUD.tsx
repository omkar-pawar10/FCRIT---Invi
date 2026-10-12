'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Radar,
  Bot,
  GraduationCap,
  Database,
  Globe,
  User,
  Shield,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { TRANSLATIONS } from '../../lib/i18n';
import { SYNTHETIC_PERSONAS } from '../../mocks/personas';
import { apiGateway } from '../../lib/api';
import { SupportedLanguage } from '../../lib/types';

export default function HeaderHUD() {
  const pathname = usePathname();
  const language = useGameStore((state) => state.language);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const activePersonaId = useGameStore((state) => state.activePersonaId);
  const setActivePersona = useGameStore((state) => state.setActivePersona);

  const t = TRANSLATIONS[language];

  const handlePersonaChange = (newId: string) => {
    setActivePersona(newId);
    apiGateway.setPersonaId(newId);
  };

  const navItems = [
    { href: '/', label: t.nav.dashboard, icon: LayoutDashboard },
    { href: '/vault', label: t.nav.portfolio, icon: Layers },
    { href: '/exposure', label: t.nav.exposure, icon: Radar },
    { href: '/language-lab', label: t.nav.assistant, icon: Bot },
    { href: '/learn-hub', label: t.nav.academy, icon: GraduationCap },
    { href: '/base-camp', label: t.nav.import, icon: Database },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      {/* Top Compliance & Status Bar */}
      <div className="border-b border-slate-800/60 bg-slate-900/60 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-300">SEBI-Aligned Guardrails</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Strictly Educational Look-Through Analytics</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Offline Client Processing Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-black text-white text-sm shadow-sm group-hover:brightness-110 transition">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  Nivesa
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono hidden md:inline">
                    PRO
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 hidden lg:inline">
                  True Exposure & Multi-Asset Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Persona & Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Persona Switcher */}
            <div className="relative inline-flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1">
              <User className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-slate-500 uppercase font-mono tracking-wider">Investor Profile</span>
                <select
                  value={activePersonaId}
                  onChange={(e) => handlePersonaChange(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
                  aria-label="Select Investor Profile"
                >
                  {SYNTHETIC_PERSONAS.map((p) => (
                    <option key={p.id} value={p.id} className="bg-slate-950 text-white">
                      {p.name} ({p.riskProfile})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative inline-flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:inline" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
                aria-label="Select Language"
              >
                <option value="en" className="bg-slate-950 text-white">English</option>
                <option value="hi" className="bg-slate-950 text-white">हिंदी</option>
                <option value="mr" className="bg-slate-950 text-white">मराठी</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Sub-bar */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800/60 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold shrink-0 transition ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

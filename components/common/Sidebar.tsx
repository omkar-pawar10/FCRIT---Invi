'use client';

import React, { useState } from 'react';
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
  ChevronDown,
  Zap,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { TRANSLATIONS } from '../../lib/i18n';
import { SYNTHETIC_PERSONAS } from '../../mocks/personas';
import { apiGateway } from '../../lib/api';
import { SupportedLanguage } from '../../lib/types';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const language = useGameStore((state) => state.language);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const activePersonaId = useGameStore((state) => state.activePersonaId);
  const setActivePersona = useGameStore((state) => state.setActivePersona);

  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const activePersona =
    SYNTHETIC_PERSONAS.find((p) => p.id === activePersonaId) || SYNTHETIC_PERSONAS[0];

  const handlePersonaSelect = (id: string) => {
    setActivePersona(id);
    apiGateway.setPersonaId(id);
    setPersonaDropdownOpen(false);
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
    <aside className="w-64 h-screen bg-[#070709] border-r border-white/5 flex flex-col justify-between shrink-0 select-none sticky top-0 z-40">
      {/* Top Section: Logo & Brand */}
      <div>
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/5">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center font-black text-white text-xs shadow-[0_0_15px_rgba(6,182,212,0.35)] group-hover:brightness-110 transition">
                N
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                Nivesa
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                  PRO
                </span>
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">
                True Look-Through Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Primary Navigation Links */}
        <div className="px-3 py-5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 px-3 mb-2 block font-semibold">
            Platform Views
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-transparent text-white border-l-2 border-cyan-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-zinc-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Ambient Exposure Widget Card */}
        <div className="px-3 mb-4">
          <div className="p-3.5 rounded-2xl bg-[#131316] border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 blur-2xl rounded-full pointer-events-none" />
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Exposure Health
              </span>
              <span className="font-mono text-cyan-300 font-bold">64/100</span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              3 Hidden Clones & 4 Gaps detected in current portfolio.
            </p>
            <Link
              href="/exposure"
              onClick={onCloseMobile}
              className="mt-2.5 text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
            >
              <span>Analyze Look-Through</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Language & User Profile */}
      <div className="p-3 border-t border-white/5 space-y-2.5">
        {/* Language Pill Selector */}
        <div className="flex items-center justify-between bg-[#131316] border border-white/5 rounded-full p-1 text-[11px]">
          <div className="flex items-center gap-1.5 pl-2.5 text-zinc-400">
            <Globe className="w-3 h-3" />
            <span className="text-[10px] font-medium uppercase font-mono">Lang</span>
          </div>
          <div className="flex items-center gap-0.5">
            {(['en', 'hi', 'mr'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as SupportedLanguage)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                  language === lang
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* User Profile Block with Dropdown Switcher */}
        <div className="relative">
          <button
            onClick={() => setPersonaDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between p-2 rounded-2xl bg-[#131316] border border-white/5 hover:border-white/10 transition text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm uppercase">
                {activePersona.name.toLowerCase().startsWith('user')
                  ? `U${activePersona.name.replace(/^user\s*/i, '')}`
                  : activePersona.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">
                  {activePersona.name}
                </span>
                <span className="text-[10px] text-zinc-500 truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {activePersona.riskProfile}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${
                personaDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Profile Switcher Popover */}
          {personaDropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#16161a] border border-white/10 rounded-2xl p-2 shadow-2xl space-y-1 animate-fade-in z-50">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-2 block font-semibold">
                Switch Sample Investor
              </span>
              {SYNTHETIC_PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePersonaSelect(p.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition ${
                    activePersonaId === p.id
                      ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500 shrink-0 ml-1">
                    {p.riskProfile.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

'use client';

import React from 'react';
import { Target, X, CheckCircle2, Zap, Coins } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestModal({ isOpen, onClose }: QuestModalProps) {
  const dailyQuests = useGameStore((state) => state.dailyQuests);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Daily Learning Quests</h3>
              <p className="text-xs text-slate-400">Complete quests through learning actions to earn XP & Coins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close Quests Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5">
          {dailyQuests.map((quest) => {
            const progressPercent = Math.min(100, Math.round((quest.progress / quest.maxProgress) * 100));
            return (
              <div
                key={quest.id}
                className={`p-4 rounded-2xl border transition-all ${
                  quest.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-200">{quest.title}</h4>
                      {quest.completed && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Done
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            quest.completed ? 'bg-emerald-400' : 'bg-gradient-to-r from-amber-400 to-cyan-400'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-400">
                        {quest.progress}/{quest.maxProgress}
                      </span>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      +{quest.rewardXp}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                      <Coins className="w-3 h-3 text-amber-400" />
                      +{quest.rewardCoins}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Quests reset daily at 00:00 IST</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

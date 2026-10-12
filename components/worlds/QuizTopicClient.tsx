'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { LEARN_ZONES } from '../../mocks/learnContent';

interface QuizTopicClientProps {
  topic: string;
}

export default function QuizTopicClient({ topic }: QuizTopicClientProps) {
  const zone = LEARN_ZONES[topic] || LEARN_ZONES['reits'];
  const questions = zone.quizRunQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (currentQ.laneOptions[idx]?.isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 relative">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6 relative">
        <Link
          href="/learn-hub"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Academy</span>
        </Link>

        <span className="text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 uppercase">
          {zone.title} Assessment
        </span>
      </div>

      {!isCompleted ? (
        <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6 relative overflow-hidden">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
            <span className="text-xs font-semibold text-zinc-400">
              Scenario Assessment Check
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
            {currentQ.prompt}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.laneOptions.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = opt.isCorrect;

              let btnStyles =
                'border-white/5 bg-[#0a0a0c] hover:bg-white/5 text-zinc-300';
              if (showExplanation) {
                if (isCorrect) {
                  btnStyles =
                    'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyles =
                    'border-rose-500/50 bg-rose-500/10 text-rose-300 font-bold';
                } else {
                  btnStyles =
                    'border-white/5 bg-[#0a0a0c] text-zinc-600 opacity-40';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showExplanation}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnStyles}`}
                >
                  <span>{opt.text}</span>
                  {showExplanation && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Regulatory Explanation */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-[#0a0a0c] border border-white/5 text-xs animate-fade-in space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>SEBI / Regulatory Analysis:</span>
              </div>
              <p className="text-zinc-300 leading-relaxed pt-1">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-blue-500/25"
              >
                <span>
                  {currentIndex < questions.length - 1
                    ? 'Next Question'
                    : 'View Assessment Summary'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#131316] border border-white/5 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Assessment Completed: {zone.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
              You scored <span className="font-mono text-emerald-400 font-bold">{score}</span> out of <span className="font-mono text-white font-bold">{questions.length}</span> on institutional regulatory scenarios.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0a0c] border border-white/5 text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
            All insights align with SEBI and RBI regulatory mandates. You are now familiar with how this asset class generates non-equity cash flows.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/learn-hub"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-semibold transition"
            >
              Explore Other Primers
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs transition shadow-lg shadow-blue-500/25"
            >
              Return to Portfolio Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

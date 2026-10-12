'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Building2,
  Truck,
  Landmark,
  Gem,
  Clock,
  ShieldCheck,
  HelpCircle,
  X,
  FileCheck,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { LEARN_ZONES } from '../../mocks/learnContent';
import { LessonCard, QuizQuestion } from '../../lib/types';
import { TRANSLATIONS } from '../../lib/i18n';

export default function LearnHubPath() {
  const [selectedZoneKey, setSelectedZoneKey] = useState<string>('reits');
  const [activeLessonModal, setActiveLessonModal] = useState<LessonCard | null>(null);
  const [assessmentModal, setAssessmentModal] = useState<QuizQuestion[] | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const completedLessons = useGameStore((state) => state.completedLessons);
  const completeLesson = useGameStore((state) => state.completeLesson);
  const language = useGameStore((state) => state.language);

  const t = TRANSLATIONS[language];
  const zones = Object.values(LEARN_ZONES);
  const currentZone = LEARN_ZONES[selectedZoneKey] || LEARN_ZONES['reits'];

  const getZoneIcon = (topicId: string) => {
    switch (topicId) {
      case 'reits':
        return Building2;
      case 'invits':
        return Truck;
      case 'bonds':
        return Landmark;
      case 'gold':
        return Gem;
      default:
        return Building2;
    }
  };

  const getLocalizedTitle = (zone: typeof currentZone) => {
    if (language === 'hi') return zone.hindiTitle;
    if (language === 'mr') return zone.marathiTitle;
    return zone.title;
  };

  const handleStartAssessment = (questions: QuizQuestion[]) => {
    setAssessmentModal(questions);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!assessmentModal) return;
    if (currentQIndex < assessmentModal.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Completed assessment
      setAssessmentModal(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6 relative">
      {/* Ambient glow in background */}
      <div className="absolute -top-12 left-1/4 w-96 h-48 bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Institutional Academy
            </span>
            <span className="text-xs text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">
              Regulatory Frameworks & Multi-Asset Primers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.sections.academy.title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            {t.sections.academy.subtitle}
          </p>
        </div>
      </div>

      {/* Four Asset Class Navigation Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 relative">
        {zones.map((zone) => {
          const isSelected = selectedZoneKey === zone.topicId;
          const Icon = getZoneIcon(zone.topicId);
          const zoneLessonsDone = zone.lessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;

          return (
            <button
              key={zone.topicId}
              id={zone.topicId}
              onClick={() => setSelectedZoneKey(zone.topicId)}
              className={`p-4.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-cyan-400/60 bg-[#16161c] shadow-lg shadow-cyan-500/5'
                  : 'border-white/5 bg-[#131316] hover:bg-[#17171c] hover:border-white/10'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-xl pointer-events-none rounded-full" />
              )}
              <div className="flex items-center justify-between mb-3 relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-inner"
                  style={{
                    backgroundColor: `${zone.themeColor}15`,
                    color: zone.themeColor,
                    border: `1px solid ${zone.themeColor}30`,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                  <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {zoneLessonsDone}/{zone.lessons.length}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white leading-tight tracking-tight">
                {zone.topicId.toUpperCase()}
              </h3>
              <p className="text-xs text-zinc-400 truncate mt-0.5">
                {getLocalizedTitle(zone)}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Asset Class Deep Dive Card */}
      <div className="bg-[#131316] border border-white/5 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6 relative overflow-hidden">
        {/* Subtle glow underneath active card */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/5 relative">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 uppercase">
                Active Primer
              </span>
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Non-Correlated Alternative Class
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2.5 tracking-tight">
              {getLocalizedTitle(currentZone)}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              {currentZone.description}
            </p>
          </div>

          {/* Interactive Scenario Check Launcher */}
          <button
            onClick={() => handleStartAssessment(currentZone.quizRunQuestions)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs transition shadow-lg shadow-blue-500/25 shrink-0"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Scenario Check ({currentZone.quizRunQuestions.length} Questions)</span>
          </button>
        </div>

        {/* Micro-Lessons Grid */}
        <div className="relative">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Core Curated Primers & Regulatory Mechanics
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentZone.lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isCompleted
                      ? 'border-emerald-500/20 bg-emerald-950/10'
                      : 'border-white/5 bg-[#0e0e11] hover:border-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-medium text-zinc-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.durationMinutes} min read
                        </span>
                        <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                          SEBI Foundation
                        </span>
                      </div>

                      {isCompleted && (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Reviewed</span>
                        </span>
                      )}
                    </div>

                    <h5 className="text-sm font-bold text-white mt-2.5 tracking-tight">{lesson.title}</h5>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      {lesson.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Institutional Primer
                    </span>
                    <button
                      onClick={() => {
                        setActiveLessonModal(lesson);
                        completeLesson(lesson.id);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white text-xs font-medium border border-white/10 transition"
                    >
                      {isCompleted ? 'Review Primer' : 'Read Primer'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lesson Reader Modal */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#131316] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 uppercase">
                Institutional Primer
              </span>
              <button
                onClick={() => setActiveLessonModal(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-white mt-3.5 tracking-tight">
              {activeLessonModal.title}
            </h3>
            <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
              {activeLessonModal.summary}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-[#0a0a0c] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block">
                Key Analytical Takeaways:
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                {activeLessonModal.keyPoints.map((pt: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-[#0a0a0c] border border-white/5 text-[11px] text-zinc-400">
              <div className="flex items-center gap-1.5 text-zinc-200 font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>SEBI / RBI Regulatory Context:</span>
              </div>
              <p className="leading-relaxed text-zinc-400">{activeLessonModal.sebiRegulationNote}</p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setActiveLessonModal(null)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs transition shadow-lg shadow-blue-500/25"
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Scenario Assessment Modal */}
      {assessmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#131316] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 uppercase">
                  Scenario Checkpoint
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  Question {currentQIndex + 1} of {assessmentModal.length}
                </span>
              </div>
              <button
                onClick={() => setAssessmentModal(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Question */}
            <h3 className="text-base font-bold text-white mt-4 leading-snug">
              {assessmentModal[currentQIndex].prompt}
            </h3>

            {/* Options */}
            <div className="mt-4 space-y-2.5">
              {assessmentModal[currentQIndex].laneOptions.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = opt.isCorrect;

                let btnStyles =
                  'border-white/5 bg-[#0a0a0c] hover:bg-white/5 text-zinc-300';
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyles = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300';
                  } else if (isSelected) {
                    btnStyles = 'border-rose-500/50 bg-rose-500/10 text-rose-300';
                  } else {
                    btnStyles = 'border-white/5 bg-[#0a0a0c] text-zinc-600 opacity-40';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition flex items-center justify-between ${btnStyles}`}
                  >
                    <span>{opt.text}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card */}
            {showExplanation && (
              <div className="mt-4 p-3.5 rounded-xl bg-[#0a0a0c] border border-white/5 text-xs animate-fade-in">
                <span className="font-bold text-cyan-400 block mb-1">
                  Regulatory Foundation:
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  {assessmentModal[currentQIndex].explanation}
                </p>
              </div>
            )}

            {/* Next / Finish Button */}
            {showExplanation && (
              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs transition shadow-lg shadow-blue-500/25"
                >
                  {currentQIndex < assessmentModal.length - 1
                    ? 'Next Question'
                    : 'Complete Assessment'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

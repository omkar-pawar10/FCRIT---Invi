'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Heart, Coins, ArrowLeft, ArrowRight, Zap, RotateCcw, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../../lib/types';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../lib/audio';
import Mascot from '../common/Mascot';

interface QuizRunnerCanvasProps {
  questions: QuizQuestion[];
  topicTitle: string;
  onComplete?: (score: number) => void;
}

export default function QuizRunnerCanvas({ questions, topicTitle, onComplete }: QuizRunnerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Zustand Store hooks
  const addCoins = useGameStore((state) => state.addCoins);
  const addXp = useGameStore((state) => state.addXp);
  const unlockBadge = useGameStore((state) => state.unlockBadge);
  const updateQuestProgress = useGameStore((state) => state.updateQuestProgress);

  // Runner state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [playerLane, setPlayerLane] = useState<0 | 1 | 2>(1); // 0=Left, 1=Center, 2=Right
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isQuizCleared, setIsQuizCleared] = useState(false);
  const [wrongAnswerExplanation, setWrongAnswerExplanation] = useState<string | null>(null);
  const [reducedMotionMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // References to keep requestAnimationFrame loop smooth
  const stateRef = useRef({
    playerLane: 1 as 0 | 1 | 2,
    gateY: -200,
    speed: 3.2,
    coinsInLane: [] as { lane: 0 | 1 | 2; y: number; collected: boolean }[],
    roadOffset: 0,
    currentQuestionIndex: 0,
    lives: 3,
    hasCheckedGate: false,
  });

  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Lane switch handler
  const switchLane = useCallback((targetLane: 0 | 1 | 2) => {
    soundEngine.playClick();
    setPlayerLane(targetLane);
    stateRef.current.playerLane = targetLane;
  }, []);

  const moveLeft = useCallback(() => {
    if (stateRef.current.playerLane === 2) switchLane(1);
    else if (stateRef.current.playerLane === 1) switchLane(0);
  }, [switchLane]);

  const moveRight = useCallback(() => {
    if (stateRef.current.playerLane === 0) switchLane(1);
    else if (stateRef.current.playerLane === 1) switchLane(2);
  }, [switchLane]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused || isGameOver || isQuizCleared) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveRight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, isGameOver, isQuizCleared, moveLeft, moveRight]);

  // Touch Swipe controls
  useEffect(() => {
    let startX = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isPaused || isGameOver || isQuizCleared) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      if (diffX > 40) moveRight();
      else if (diffX < -40) moveLeft();
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPaused, isGameOver, isQuizCleared, moveLeft, moveRight]);

  // Next Question or Win
  const advanceQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      stateRef.current.currentQuestionIndex += 1;
      stateRef.current.gateY = -250;
      stateRef.current.hasCheckedGate = false;
      stateRef.current.speed += 0.4; // Gradually rising speed
    } else {
      // Quiz Cleared!
      soundEngine.playLevelUp();
      setIsQuizCleared(true);
      addXp(120);
      addCoins(25);
      unlockBadge('RUNNER_ACE');
      if (onComplete) onComplete(score + 100);
    }
  }, [currentQuestionIndex, questions.length, addXp, addCoins, unlockBadge, onComplete, score]);

  // Retry after wrong gate
  const resumeAfterExplanation = () => {
    setWrongAnswerExplanation(null);
    setIsPaused(false);
    stateRef.current.gateY = -250;
    stateRef.current.hasCheckedGate = false;
  };

  // Reset entire run
  const restartRun = () => {
    setLives(3);
    setScore(0);
    setCurrentQuestionIndex(0);
    setCoinsCollected(0);
    setIsGameOver(false);
    setIsQuizCleared(false);
    setWrongAnswerExplanation(null);
    setIsPaused(false);
    stateRef.current = {
      playerLane: 1,
      gateY: -200,
      speed: 3.2,
      coinsInLane: [
        { lane: 0, y: 100, collected: false },
        { lane: 1, y: 220, collected: false },
        { lane: 2, y: 340, collected: false },
      ],
      roadOffset: 0,
      currentQuestionIndex: 0,
      lives: 3,
      hasCheckedGate: false,
    };
    switchLane(1);
  };

  // Canvas 2D Loop
  useEffect(() => {
    if (reducedMotionMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // Populate initial lane coins
    stateRef.current.coinsInLane = [
      { lane: 0, y: 60, collected: false },
      { lane: 1, y: 160, collected: false },
      { lane: 2, y: 260, collected: false },
      { lane: 1, y: 380, collected: false },
    ];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const laneWidth = width / 3;
      const playerY = height - 90;

      // 1. Clear & Background Gradient (Futuristic Cyber Track)
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#020617'); // Dark slate
      grad.addColorStop(0.6, '#0f172a');
      grad.addColorStop(1, '#030712');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Road Perspective Lines & Grid
      stateRef.current.roadOffset = (stateRef.current.roadOffset + stateRef.current.speed) % 40;
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let y = stateRef.current.roadOffset; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Lane dividers (Neon dashed lines)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([15, 15]);
      ctx.lineDashOffset = -stateRef.current.roadOffset;

      ctx.beginPath();
      ctx.moveTo(laneWidth, 0);
      ctx.lineTo(laneWidth, height);
      ctx.moveTo(laneWidth * 2, 0);
      ctx.lineTo(laneWidth * 2, height);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // 3. Move & Draw Coins
      if (!isPaused && !isGameOver && !isQuizCleared) {
        stateRef.current.coinsInLane.forEach((coin) => {
          coin.y += stateRef.current.speed;
          if (coin.y > height + 40) {
            coin.y = -60 - Math.random() * 150;
            coin.lane = Math.floor(Math.random() * 3) as 0 | 1 | 2;
            coin.collected = false;
          }

          // Coin Collision Check
          if (
            !coin.collected &&
            coin.lane === stateRef.current.playerLane &&
            Math.abs(coin.y - playerY) < 35
          ) {
            coin.collected = true;
            soundEngine.playCoin();
            setCoinsCollected((c) => c + 1);
            setScore((s) => s + 10);
            addCoins(1);
          }
        });
      }

      // Draw Coins
      stateRef.current.coinsInLane.forEach((coin) => {
        if (!coin.collected && coin.y > -20 && coin.y < height + 20) {
          const coinX = coin.lane * laneWidth + laneWidth / 2;
          ctx.save();
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(coinX, coin.y, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Coin Inner Symbol
          ctx.fillStyle = '#78350f';
          ctx.font = 'bold 11px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('₹', coinX, coin.y);
          ctx.restore();
        }
      });

      // 4. Move & Draw Gates (Options A, B, C)
      if (!isPaused && !isGameOver && !isQuizCleared) {
        stateRef.current.gateY += stateRef.current.speed;
      }
      const gateY = stateRef.current.gateY;

      // Draw 3 Gate Arches
      currentQ.laneOptions.forEach((opt) => {
        const gateX = opt.laneIndex * laneWidth;

        ctx.save();
        // Gate Arch Pillar
        ctx.fillStyle = opt.laneIndex === stateRef.current.playerLane ? '#0284c7' : '#1e293b';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;

        ctx.fillRect(gateX + 6, gateY, laneWidth - 12, 38);
        ctx.strokeRect(gateX + 6, gateY, laneWidth - 12, 38);

        // Gate Label & Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`[${opt.label}]`, gateX + laneWidth / 2, gateY + 12);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px sans-serif';
        // Wrap/truncate option text
        const displayTxt = opt.text.length > 16 ? opt.text.substring(0, 15) + '..' : opt.text;
        ctx.fillText(displayTxt, gateX + laneWidth / 2, gateY + 26);
        ctx.restore();
      });

      // 5. Collision with Gate
      if (
        !stateRef.current.hasCheckedGate &&
        !isPaused &&
        !isGameOver &&
        !isQuizCleared &&
        gateY >= playerY - 30 &&
        gateY <= playerY + 30
      ) {
        stateRef.current.hasCheckedGate = true;
        const currentOption = currentQ.laneOptions.find(
          (o) => o.laneIndex === stateRef.current.playerLane
        );

        if (currentOption?.isCorrect) {
          // Gate passed successfully!
          soundEngine.playGateSuccess();
          setScore((s) => s + 50);
          addXp(20);
          addCoins(5);
          updateQuestProgress('quest-runner', 1);
          advanceQuestion();
        } else {
          // Wrong gate!
          soundEngine.playGateError();
          const nextLives = stateRef.current.lives - 1;
          stateRef.current.lives = nextLives;
          setLives(nextLives);

          if (nextLives <= 0) {
            setIsGameOver(true);
          } else {
            setIsPaused(true);
            setWrongAnswerExplanation(currentQ.explanation);
          }
        }
      }

      // If gate moves off-screen without hit
      if (gateY > height + 60 && !stateRef.current.hasCheckedGate) {
        stateRef.current.gateY = -150;
      }

      // 6. Draw Player (Artha Cyber Jet Runner)
      const playerX = stateRef.current.playerLane * laneWidth + laneWidth / 2;

      ctx.save();
      // Thruster Neon Flame
      const flameHeight = 12 + Math.random() * 8;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(playerX - 8, playerY + 22);
      ctx.lineTo(playerX + 8, playerY + 22);
      ctx.lineTo(playerX, playerY + 22 + flameHeight);
      ctx.closePath();
      ctx.fill();

      // Cyber Runner Body
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(playerX - 22, playerY - 24, 44, 48, 14);
      ctx.fill();
      ctx.stroke();

      // Visor Glow
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(playerX - 14, playerY - 12, 28, 12);

      // Cyber Wings
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(playerX - 22, playerY);
      ctx.lineTo(playerX - 34, playerY + 16);
      ctx.lineTo(playerX - 22, playerY + 16);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(playerX + 22, playerY);
      ctx.lineTo(playerX + 34, playerY + 16);
      ctx.lineTo(playerX + 22, playerY + 16);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    isPaused,
    isGameOver,
    isQuizCleared,
    currentQ,
    reducedMotionMode,
    addCoins,
    addXp,
    advanceQuestion,
    updateQuestProgress,
  ]);

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Game HUD Bar */}
      <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 flex items-center justify-between mb-3 shadow-lg">
        {/* Lives Counter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 mr-1">LIVES:</span>
          {[1, 2, 3].map((heart) => (
            <Heart
              key={heart}
              className={`w-5 h-5 transition-transform ${
                heart <= lives
                  ? 'text-rose-500 fill-rose-500 scale-100'
                  : 'text-slate-700 scale-75'
              }`}
            />
          ))}
        </div>

        {/* Question Counter */}
        <div className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-xl border border-cyan-500/30">
          Q {currentQuestionIndex + 1}/{questions.length}
        </div>

        {/* Coins Collected */}
        <div className="flex items-center gap-1 text-xs font-extrabold text-amber-300">
          <Coins className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{coinsCollected}</span>
        </div>
      </div>

      {/* Question Prompt Overlay Header */}
      <div className="w-full bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-2 border-cyan-400/60 rounded-2xl p-4 mb-3 text-center shadow-md">
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
          {topicTitle} Gate Question
        </span>
        <h3 className="text-sm sm:text-base font-bold text-white mt-1 leading-snug">
          {currentQ.prompt}
        </h3>
      </div>

      {/* Main Canvas Runner OR Accessible Reduced-Motion Mode */}
      {!reducedMotionMode ? (
        <div className="relative rounded-3xl overflow-hidden border-4 border-slate-700 shadow-2xl bg-black">
          <canvas
            ref={canvasRef}
            width={380}
            height={460}
            className="block touch-none select-none"
            aria-label="3-lane Quiz Run Canvas"
          />

          {/* Lane Gate Labels overlay on top */}
          <div className="absolute top-2 left-0 right-0 grid grid-cols-3 px-2 text-center text-[10px] font-bold text-slate-400 pointer-events-none">
            <span>Lane A (Left)</span>
            <span>Lane B (Center)</span>
            <span>Lane C (Right)</span>
          </div>

          {/* Explanation Modal on Wrong Gate */}
          {wrongAnswerExplanation && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md p-5 flex flex-col items-center justify-center text-center z-20 animate-fade-in">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400 mb-2">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-rose-300">Wrong Gate! (-1 Life)</h4>
              <p className="text-xs text-slate-300 mt-2 px-2 leading-relaxed">
                {wrongAnswerExplanation}
              </p>
              <button
                onClick={resumeAfterExplanation}
                className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition"
              >
                Retry Gate Run
              </button>
            </div>
          )}

          {/* Game Over Modal */}
          {isGameOver && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center z-30 animate-fade-in">
              <Mascot size={70} mood="warning" />
              <h4 className="text-xl font-black text-rose-400 mt-3">Run Ended!</h4>
              <p className="text-xs text-slate-400 mt-1">
                You ran out of lives, but the concepts are easy to master.
              </p>
              <button
                onClick={restartRun}
                className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 active:scale-95 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
            </div>
          )}

          {/* Quiz Cleared Screen */}
          {isQuizCleared && (
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center z-30 animate-fade-in">
              <Mascot size={75} mood="cheering" />
              <h4 className="text-2xl font-black text-emerald-400 mt-3">Zone Mastered!</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xs">
                You dashed through all gates successfully and unlocked the Runner Ace badge!
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-3 py-1 rounded-xl border border-cyan-500/30">
                  +120 XP
                </span>
                <span className="text-xs font-bold text-amber-300 bg-amber-950 px-3 py-1 rounded-xl border border-amber-500/30">
                  +{coinsCollected + 25} Coins
                </span>
              </div>
              <button
                onClick={restartRun}
                className="mt-5 inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Replay Zone
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Reduced Motion Accessible Card Mode */
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
          <p className="text-xs text-slate-400 mb-4">Reduced motion mode enabled.</p>
          <div className="grid grid-cols-1 gap-3">
            {currentQ.laneOptions.map((opt) => (
              <button
                key={opt.laneIndex}
                onClick={() => {
                  if (opt.isCorrect) {
                    soundEngine.playGateSuccess();
                    addXp(20);
                    advanceQuestion();
                  } else {
                    soundEngine.playGateError();
                    setWrongAnswerExplanation(currentQ.explanation);
                  }
                }}
                className="p-3.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:border-cyan-400 text-left transition"
              >
                <span className="font-bold text-cyan-400 mr-2">[{opt.label}]</span>
                <span className="text-sm text-slate-200">{opt.text}</span>
              </button>
            ))}
          </div>
          {wrongAnswerExplanation && (
            <div className="mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300">
              {wrongAnswerExplanation}
            </div>
          )}
        </div>
      )}

      {/* On-Screen Touch / Accessibility Controls (3 Lanes) */}
      <div className="w-full max-w-sm mt-4 grid grid-cols-3 gap-2">
        <button
          onClick={() => switchLane(0)}
          className={`py-3 rounded-2xl border font-bold text-xs flex flex-col items-center justify-center transition active:scale-95 ${
            playerLane === 0
              ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
          }`}
          aria-label="Switch to Lane A (Left)"
        >
          <ArrowLeft className="w-4 h-4 mb-0.5" />
          <span>Lane A</span>
        </button>

        <button
          onClick={() => switchLane(1)}
          className={`py-3 rounded-2xl border font-bold text-xs flex flex-col items-center justify-center transition active:scale-95 ${
            playerLane === 1
              ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
          }`}
          aria-label="Switch to Lane B (Center)"
        >
          <Zap className="w-4 h-4 mb-0.5" />
          <span>Lane B</span>
        </button>

        <button
          onClick={() => switchLane(2)}
          className={`py-3 rounded-2xl border font-bold text-xs flex flex-col items-center justify-center transition active:scale-95 ${
            playerLane === 2
              ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
          }`}
          aria-label="Switch to Lane C (Right)"
        >
          <ArrowRight className="w-4 h-4 mb-0.5" />
          <span>Lane C</span>
        </button>
      </div>

      {/* Control Tips */}
      <p className="text-[11px] text-slate-500 mt-2.5 text-center">
        Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">→</kbd> keys or swipe left/right to switch gates.
      </p>
    </div>
  );
}

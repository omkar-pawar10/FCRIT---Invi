'use client';

import React from 'react';

interface MascotProps {
  size?: number;
  mood?: 'happy' | 'thinking' | 'cheering' | 'warning';
  className?: string;
}

export default function Mascot({ size = 80, mood = 'happy', className = '' }: MascotProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Artha the Cyber-Owl Guide"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_12px_rgba(14,165,233,0.35)] transition-transform duration-300 hover:scale-105"
      >
        {/* Glow Aura */}
        <circle cx="50" cy="50" r="46" fill="url(#mascotGlow)" opacity="0.25" />

        {/* Body Base (Cyber Owl Shape) */}
        <path
          d="M50 12C32 12 20 28 20 54C20 74 34 88 50 88C66 88 80 74 80 54C80 28 68 12 50 12Z"
          fill="#0f172a"
          stroke="#06b6d4"
          strokeWidth="3.5"
        />

        {/* Feather Crest Ears */}
        <path d="M26 18L36 30L22 34Z" fill="#06b6d4" />
        <path d="M74 18L64 30L78 34Z" fill="#06b6d4" />

        {/* Chest Feather Pattern */}
        <path
          d="M38 64C44 68 56 68 62 64M42 72C46 75 54 75 58 72"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Visor / Eye Console */}
        <rect
          x="26"
          y="36"
          width="48"
          height="22"
          rx="11"
          fill="#1e293b"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        {/* Visor Screen Glow */}
        <rect x="29" y="39" width="42" height="16" rx="8" fill="#0369a1" />

        {/* Eyes based on mood */}
        {mood === 'happy' && (
          <>
            {/* Happy Arch Eyes */}
            <path
              d="M36 49C38 45 44 45 46 49"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M54 49C56 45 62 45 64 49"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}

        {mood === 'thinking' && (
          <>
            {/* Thinking / Curious Eyes */}
            <circle cx="41" cy="47" r="3" fill="#38bdf8" />
            <circle cx="59" cy="47" r="4.5" fill="#38bdf8" />
            <path d="M36 43L46 41" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {mood === 'cheering' && (
          <>
            {/* Star Eyes */}
            <path
              d="M41 43L42.5 46.5L46 47L43.5 49.5L44 53L41 51L38 53L38.5 49.5L36 47L39.5 46.5Z"
              fill="#fbbf24"
            />
            <path
              d="M59 43L60.5 46.5L64 47L61.5 49.5L62 53L59 51L56 53L56.5 49.5L54 47L57.5 46.5Z"
              fill="#fbbf24"
            />
          </>
        )}

        {mood === 'warning' && (
          <>
            {/* Alert Mode */}
            <path d="M37 45L45 49M37 49L45 45" stroke="#ef4444" strokeWidth="2.5" />
            <path d="M55 45L63 49M55 49L63 45" stroke="#ef4444" strokeWidth="2.5" />
          </>
        )}

        {/* Beak / Gold Triangle */}
        <polygon points="50,58 45,52 55,52" fill="#f59e0b" />

        {/* Cyber Neon Accents */}
        <circle cx="50" cy="20" r="2.5" fill="#22c55e" />
        <circle cx="50" cy="80" r="2" fill="#06b6d4" />

        <defs>
          <radialGradient id="mascotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

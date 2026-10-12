// Institutional Portfolio & Preference Store with localStorage persistence
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Badge, DailyQuest, SupportedLanguage } from '../lib/types';

export interface LevelUpInfo {
  newLevel: number;
  levelTitle: string;
}

interface PortfolioState {
  hasConsented: boolean;
  activePersonaId: string;
  language: SupportedLanguage;
  completedLessons: string[];
  searchQuery: string;

  // Actions
  setConsent: (consented: boolean) => void;
  setActivePersona: (id: string) => void;
  setLanguage: (lang: SupportedLanguage) => void;
  setSearchQuery: (query: string) => void;
  completeLesson: (lessonId: string) => void;

  // Compatibility defaults
  unlockedWorlds: number[];
  currentWorld: number;
  xp: number;
  learningCoins: number;
  streakDays: number;
  badges: Badge[];
  dailyQuests: DailyQuest[];
  newBadgeUnlocked: Badge | null;
  levelUpNotice: LevelUpInfo | null;
  isSoundMuted: boolean;
  unlockWorld: (worldNum: number) => void;
  setCurrentWorld: (worldNum: number) => void;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  toggleSound: () => void;
  unlockBadge: (badgeId: string) => void;
  clearBadgeToast: () => void;
  clearLevelUpModal: () => void;
  updateQuestProgress: (questId: string, delta?: number) => void;
  getLevel: () => { level: number; title: string; nextLevelXp: number; currentLevelXp: number };
}

export const useGameStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      hasConsented: true,
      activePersonaId: 'aarav-equity-enthusiast',
      language: 'en',
      completedLessons: [],
      searchQuery: '',

      setConsent: (consented: boolean) => set({ hasConsented: consented }),
      setActivePersona: (id: string) => set({ activePersonaId: id }),
      setLanguage: (lang: SupportedLanguage) => set({ language: lang }),
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      completeLesson: (lessonId: string) => {
        const { completedLessons } = get();
        if (!completedLessons.includes(lessonId)) {
          set({ completedLessons: [...completedLessons, lessonId] });
        }
      },

      // Compatibility no-ops
      unlockedWorlds: [1, 2, 3, 4, 5, 6],
      currentWorld: 1,
      xp: 0,
      learningCoins: 0,
      streakDays: 0,
      badges: [],
      dailyQuests: [],
      newBadgeUnlocked: null,
      levelUpNotice: null,
      isSoundMuted: true,
      unlockWorld: () => {},
      setCurrentWorld: () => {},
      addXp: () => {},
      addCoins: () => {},
      toggleSound: () => {},
      unlockBadge: () => {},
      clearBadgeToast: () => {},
      clearLevelUpModal: () => {},
      updateQuestProgress: () => {},
      getLevel: () => ({ level: 1, title: 'Retail Investor', nextLevelXp: 100, currentLevelXp: 0 }),
    }),
    {
      name: 'uwh-portfolio-store-v2',
    }
  )
);

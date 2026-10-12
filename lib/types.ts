// Domain types and JSON contracts for Unified Wealth & Educational Hub

export type AssetClass = 'EQUITY' | 'MUTUAL_FUND' | 'REIT' | 'INVIT' | 'BOND' | 'GOLD' | 'CASH';

export type BrokerSource = 'ZERODHA' | 'GROWW' | 'ANGEL_ONE' | 'ICICI_DIRECT';
export type DepositorySource = 'CDSL' | 'NSDL' | 'CAMS' | 'KFINTECH';

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  isin: string; // Realistic placeholder flagged with -MOCK
  assetClass: AssetClass;
  source: BrokerSource | DepositorySource;
  accountType: 'BROKER' | 'DEPOSITORY' | 'RTA';
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  currentValue: number;
  investedValue: number;
  pnl: number;
  pnlPercentage: number;
  sector?: string;
}

export interface MutualFundUnderlying {
  symbol: string;
  name: string;
  isin: string;
  weightPercentage: number;
  allocatedValue: number;
}

export interface MutualFundHolding extends Holding {
  fundCategory: 'Large Cap' | 'Flexi Cap' | 'Mid Cap' | 'Index Fund' | 'Debt Liquid';
  topHoldings: MutualFundUnderlying[];
  units?: number;
  nav?: number;
}

export interface SyntheticPersona {
  id: string;
  name: string;
  alias: string;
  avatar: string;
  tagline: string;
  description: string;
  riskProfile: 'Aggressive Equity' | 'Balanced Explorer' | 'Starter';
  accounts: {
    brokers: BrokerSource[];
    depositories: DepositorySource[];
  };
  portfolioSummary: {
    totalInvested: number;
    currentValue: number;
    holdingCount: number;
    topOverlapStock: string;
    gapCount: number;
  };
  holdings: Holding[];
  mutualFunds: MutualFundHolding[];
}

export interface HiddenClone {
  symbol: string;
  name: string;
  isin: string;
  sector: string;
  directExposure: {
    quantity: number;
    value: number;
    broker: BrokerSource;
  } | null;
  indirectExposure: {
    fundName: string;
    fundCategory: string;
    weightPercentage: number;
    effectiveValue: number;
  }[];
  totalCombinedValue: number;
  portfolioPercentage: number;
  overlapRiskLevel: 'HIGH' | 'MEDIUM' | 'MODERATE';
}

export interface AssetGap {
  assetClass: 'REIT' | 'INVIT' | 'BOND' | 'GOLD';
  title: string;
  subtitle: string;
  whyItMatters: string;
  sebiDefinition: string;
  currentAllocationPercentage: number;
  learnHubZoneId: string;
  unlocked: boolean;
}

export interface ExposureAnalysis {
  generatedAt: string;
  totalPortfolioValue: number;
  assetClassBreakdown: {
    assetClass: AssetClass;
    value: number;
    percentage: number;
  }[];
  hiddenClones: HiddenClone[];
  gaps: AssetGap[];
  diversificationScoreEducational: number; // strictly educational metric (0-100)
}

export interface UnifiedPortfolio {
  lastUpdated: string;
  personaId: string;
  totalInvested: number;
  currentValue: number;
  totalUnrealizedPnl: number;
  totalPnlPercentage: number;
  sourcesConnected: string[];
  holdings: Holding[];
  mutualFunds: MutualFundHolding[];
}

export interface EducatorMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isGuardrailTriggered?: boolean;
  guardrailNote?: string;
  citation?: string;
  language: 'en' | 'hi' | 'mr';
}

export interface EducatorRequest {
  query: string;
  language: 'en' | 'hi' | 'mr';
  context?: {
    activePersonaId?: string;
    topOverlapStock?: string;
  };
}

export interface EducatorResponse {
  answer: string;
  isGuardrailTriggered: boolean;
  guardrailNote: string;
  citation: string;
  suggestedFollowUps: string[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  laneOptions: {
    laneIndex: 0 | 1 | 2; // Left = 0, Center = 1, Right = 2
    label: string; // A, B, C
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface LessonCard {
  id: string;
  title: string;
  durationMinutes: number;
  reviewStatus: 'needs review';
  summary: string;
  keyPoints: string[];
  sebiRegulationNote: string;
  xpReward: number;
}

export interface LearnZoneData {
  topicId: 'reits' | 'invits' | 'bonds' | 'gold';
  title: string;
  hindiTitle: string;
  marathiTitle: string;
  badgeId: string;
  themeColor: string;
  description: string;
  lessons: LessonCard[];
  quizRunQuestions: QuizQuestion[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt: string | null;
  xpValue: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  rewardXp: number;
  rewardCoins: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface ImportResult {
  success: boolean;
  importedHoldingsCount: number;
  depositorySource: DepositorySource;
  maskedPan: string;
  timestamp: string;
}

export interface ManualHoldingInput {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  source: BrokerSource;
  quantity: number;
  averagePrice: number;
}

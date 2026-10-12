// SEBI Educational Corpus Snippets (Reference material for AI Educator citations)
// Note: For educational context only. Adheres to SEBI-aligned guidelines.

export interface SebiSnippet {
  id: string;
  topic: string;
  citation: string;
  summary: string;
  keyRule: string;
}

export const SEBI_CORPUS_SNIPPETS: Record<string, SebiSnippet> = {
  reits: {
    id: 'sebi-reit-2014',
    topic: 'Real Estate Investment Trusts',
    citation: 'SEBI (Real Estate Investment Trusts) Regulations, 2014 [Reg. 18(16)]',
    summary: 'Governs creation and operation of REITs in India. Requires at least 80% of REIT assets to be invested in completed and rent-generating properties.',
    keyRule: 'Mandates minimum 90% distribution of Net Distributable Cash Flows (NDCF) to unit holders at least semi-annually.',
  },
  invits: {
    id: 'sebi-invit-2014',
    topic: 'Infrastructure Investment Trusts',
    citation: 'SEBI (Infrastructure Investment Trusts) Regulations, 2014 [Reg. 18(6)]',
    summary: 'Governs investment in revenue-generating infrastructure projects such as roads, power transmission networks, and telecom towers.',
    keyRule: 'Requires minimum 90% payout of Net Distributable Cash Flows and sets aggregate leverage borrowing limits at 70% of InvIT asset value (with credit rating requirements).',
  },
  overlap: {
    id: 'sebi-mf-categorization-2017',
    topic: 'Mutual Fund Categorization & Underlying Exposure',
    citation: 'SEBI Master Circular for Mutual Funds (SEBI/HO/IMD/DF3/CIR/P/2017/114)',
    summary: 'Defines distinct fund categories (Large Cap, Mid Cap, Flexi Cap) to prevent portfolio clutter and enforce true diversification for retail investors.',
    keyRule: 'Large cap funds must invest minimum 80% in top 100 stocks by market cap; when investors hold multiple large cap funds plus direct equities, underlying duplicate stock risk increases sharply.',
  },
  bonds: {
    id: 'sebi-ncs-2021',
    topic: 'Non-Convertible Securities & Debt',
    citation: 'SEBI (Issue and Listing of Non-Convertible Securities) Regulations, 2021',
    summary: 'Regulates corporate debt listing, debenture trustee oversight, and credit rating disclosure mechanisms.',
    keyRule: 'Provides structured retail participation in debt securities through Request for Quote (RFQ) and Online Bond Platform Providers (OBPPs).',
  },
  gold: {
    id: 'sebi-gold-etf-2006',
    topic: 'Gold Exchange Traded Funds & SGBs',
    citation: 'SEBI (Mutual Funds) Regulations, 1996 - Schedule IX (Gold Exchange Traded Funds)',
    summary: 'Requires physical gold underlying Gold ETFs to be of 99.5% purity (995 fineness), audited by independent vault custodians.',
    keyRule: 'Gold provides counter-cyclical correlation against equity drawdowns and currency depreciation.',
  },
};

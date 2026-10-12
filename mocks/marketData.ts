// AMFI/BSE-style synthetic market snapshot
// Flagged: Synthetic Mock Data - Not real market prices or figures

export interface MarketSnapshotItem {
  symbol: string;
  isin: string;
  name: string;
  sector: string;
  syntheticNavOrPrice: number;
  syntheticChangePercent: number;
  marketCapCategory: 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Govt Debt' | 'Hybrid';
}

export const SYNTHETIC_MARKET_SNAPSHOT: MarketSnapshotItem[] = [
  {
    symbol: 'HDFCBANK',
    isin: 'INE040A01034-MOCK',
    name: 'HDFC Bank Ltd',
    sector: 'Banking & Financial Services',
    syntheticNavOrPrice: 1680.0,
    syntheticChangePercent: 0.85,
    marketCapCategory: 'Large Cap',
  },
  {
    symbol: 'RELIANCE',
    isin: 'INE002A01018-MOCK',
    name: 'Reliance Industries Ltd',
    sector: 'Oil, Gas & Consumer Retail',
    syntheticNavOrPrice: 2980.0,
    syntheticChangePercent: 1.12,
    marketCapCategory: 'Large Cap',
  },
  {
    symbol: 'INFY',
    isin: 'INE009A01021-MOCK',
    name: 'Infosys Ltd',
    sector: 'Information Technology',
    syntheticNavOrPrice: 1580.0,
    syntheticChangePercent: -0.42,
    marketCapCategory: 'Large Cap',
  },
  {
    symbol: 'ICICIBANK',
    isin: 'INE090A01021-MOCK',
    name: 'ICICI Bank Ltd',
    sector: 'Banking & Financial Services',
    syntheticNavOrPrice: 1180.0,
    syntheticChangePercent: 1.45,
    marketCapCategory: 'Large Cap',
  },
  {
    symbol: 'TCS',
    isin: 'INE467B01029-MOCK',
    name: 'Tata Consultancy Services',
    sector: 'Information Technology',
    syntheticNavOrPrice: 4120.0,
    syntheticChangePercent: 0.31,
    marketCapCategory: 'Large Cap',
  },
  {
    symbol: 'EMBASSY-REIT',
    isin: 'INE041025011-MOCK',
    name: 'Embassy Office Parks REIT',
    sector: 'Real Estate Investment Trust',
    syntheticNavOrPrice: 385.5,
    syntheticChangePercent: 0.22,
    marketCapCategory: 'Hybrid',
  },
  {
    symbol: 'POWERGRID-INVIT',
    isin: 'INE050225019-MOCK',
    name: 'PowerGrid Infrastructure Investment Trust',
    sector: 'Power Transmission InvIT',
    syntheticNavOrPrice: 104.2,
    syntheticChangePercent: 0.15,
    marketCapCategory: 'Hybrid',
  },
  {
    symbol: 'GOI-GS-2033',
    isin: 'IN0020230086-MOCK',
    name: 'Government of India 7.18% GS 2033',
    sector: 'Sovereign Debt',
    syntheticNavOrPrice: 101.5,
    syntheticChangePercent: 0.05,
    marketCapCategory: 'Govt Debt',
  },
  {
    symbol: 'GOLDBEES',
    isin: 'INF204KB14I2-MOCK',
    name: 'Nippon India ETF Gold BeES',
    sector: 'Precious Metals',
    syntheticNavOrPrice: 62.4,
    syntheticChangePercent: 0.74,
    marketCapCategory: 'Hybrid',
  },
];

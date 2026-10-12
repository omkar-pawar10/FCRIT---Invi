# Unified Wealth Hub (PRO) - Institutional Phase 1

> **An institutional-grade, consent-based wealth intelligence platform giving retail investors a consolidated multi-broker look-through view, uncovering True Exposure (underlying stock overlaps & unallocated asset gaps), and delivering multilingual financial education across REITs, InvITs, bonds, and gold.**

---

## 🏛️ Executive Product Architecture

Transitioned from arcade mechanics to institutional fintech standards (comparable to BlackRock Aladdin, Zerodha Console, Morningstar, Dezerv, and INDmoney):

1. **Executive Portfolio Dashboard (`/`)**:
   - Consolidated Net Worth, Invested Capital, Unrealized Profit (+23.16%), and 1D Return KPIs.
   - Interactive Asset Allocation visualizer (Direct Equities, Mutual Funds, Fixed Income, Gold, Cash).
   - High-severity Look-Through Concentration alerts (e.g. HDFC Bank combined direct + mutual fund weight).
   - Multi-Asset Allocation Gap diagnostic alerts linking directly to primers.
   - Quick Demat & Mutual Fund holdings ledger preview.

2. **Holdings & Depositories Ledger (`/vault`)**:
   - Multi-broker consolidation (Zerodha, Groww, Angel One, ICICI Direct) + Depository RTA records (CDSL, NSDL, CAMS, KFintech).
   - Live search filter across tickers, security names, and ISIN codes.
   - Grouping toggles: *By Broker / Depository* vs. *By Asset Class*.
   - Copyable ISIN codes, buy price, current valuation, and unrealized returns.
   - Mutual fund scheme cards with underlying constituent look-through.

3. **True Look-Through Exposure Matrix (`/exposure`)**:
   - Decomposes active mutual fund portfolios into underlying stocks to reveal hidden duplication.
   - Direct Demat holding value vs. Mutual Fund indirect holding value stacked breakdown.
   - Single-Stock Overlap severity flags (High >15%, Moderate).
   - Comprehensive underlying mutual fund contribution table.
   - Institutional Diversification Health Index (0 - 100 scale).

4. **Multi-Asset Allocation & Gap Diagnostics (`/exposure#gaps`)**:
   - Diagnostic analysis of unallocated alternative asset classes (REITs, InvITs, Corporate Bonds, Sovereign Gold).
   - Analysis of risk-return characteristics and cash flow mechanics.
   - SEBI and RBI regulatory foundations (e.g. SEBI 90% Net Distributable Cash Flow mandate).

5. **Multilingual Wealth Assistant (`/language-lab`)**:
   - Powered by SEBI-aligned advice interceptor and regulatory frameworks.
   - Full trilingual support: **English, Hindi (हिंदी), and Marathi (मराठी)**.
   - Active SEBI guardrail intercept: When advisory queries are submitted ("Should I buy...", "Which stock to sell..."), it intercepts with an institutional compliance notice (*"Under SEBI (Investment Advisers) Regulations, 2013, we provide objective educational frameworks only"*).
   - Citations to SEBI and RBI regulatory circulars on every response.

6. **Knowledge Academy & Scenario Assessments (`/learn-hub`)**:
   - Curated institutional primers on REITs, InvITs, Corporate Bonds, and Gold.
   - Interactive Scenario Knowledge Checkpoint cards with immediate regulatory feedback and SEBI citations.

7. **Data Sources & Ingestion Hub (`/base-camp`)**:
   - Consent-based client-side sandbox architecture.
   - Encrypted e-CAS PDF statement upload simulator (NSDL, CDSL, CAMS, KFintech).
   - Instant Persona Switcher:
     - **user1**: Equity Enthusiast (High single-stock clone overlap).
     - **user2**: Balanced Professional (Diversified mutual funds & equities).
     - **user3**: Tech-Heavy Growth Investor (Concentrated tech demat holdings).
   - Manual holding entry ledger.

8. **Client-Side Data Normalization Pipeline (`/pit-stop`)**:
   - Real-time client pipeline visualizer: `PARSER ENGINE` ➔ `INTEGRITY VALIDATION` ➔ `SCHEMA NORMALIZATION` ➔ `ISIN & TAXONOMY MAPPING`.

---

## 🔒 SEBI-Aligned Regulatory Compliance

- **Non-Advisory Mandate**: Strictly educational portfolio look-through intelligence.
- **Never Claims SEBI Registration**: Uses "SEBI-Aligned Guardrails" and "SEBI Regulatory Frameworks" exclusively.
- **Persistent Compliance Footer**: Present across every view in English, Hindi, and Marathi.
- **Local Client Processing**: In Phase 1, all deduplication and exposure calculations execute strictly in local browser memory.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.4 (App Router, Turbopack)
- **Language**: TypeScript (Strict typing, 0 errors)
- **Styling**: Tailwind CSS (Dark slate executive palette `#0b0f19`)
- **State Management**: Zustand with `localStorage` persistence
- **Icons**: Lucide React
- **API Architecture**: Typed API client (`lib/api.ts`) ready for Phase 2 Flask/FastAPI backend

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run Next.js local development server
npm run dev

# 3. Access in browser
http://localhost:3000
```

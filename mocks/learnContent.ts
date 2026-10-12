// Learn Hub Content & Quiz Run Questions
// Note: All lesson cards are marked "needs review" as required by brief

import { LearnZoneData } from '../lib/types';

export const LEARN_ZONES: Record<string, LearnZoneData> = {
  reits: {
    topicId: 'reits',
    title: 'Real Estate Investment Trusts (REITs)',
    hindiTitle: 'रीट्स (रियल एस्टेट इन्वेस्टमेंट ट्रस्ट)',
    marathiTitle: 'रीट्स (रिअल इस्टेट इन्व्हेस्टमेंट ट्रस्ट)',
    badgeId: 'REIT_SCHOLAR',
    themeColor: '#0ea5e9', // Sky blue
    description: 'Learn how fractional ownership of grade-A commercial tech parks and malls produces regular rental distributions without buying physical property.',
    lessons: [
      {
        id: 'reit-1',
        title: 'What is a REIT? (Fractional Real Estate)',
        durationMinutes: 3,
        reviewStatus: 'needs review',
        summary: 'A REIT pools investor capital to purchase and manage high-grade commercial properties (like IT parks and corporate headquarters).',
        keyPoints: [
          'Listed and traded on NSE/BSE just like regular company shares.',
          'Investors receive dividend income, interest payouts, and capital appreciation.',
          'Eliminates the huge capital barrier of buying physical commercial property.',
        ],
        sebiRegulationNote: 'SEBI mandates minimum 80% investment in completed, rent-generating commercial assets.',
        xpReward: 50,
      },
      {
        id: 'reit-2',
        title: 'The 90% Cash Distribution Rule',
        durationMinutes: 4,
        reviewStatus: 'needs review',
        summary: 'Why REITs are popular for income investors: mandatory cash distribution.',
        keyPoints: [
          'Under SEBI regulations, at least 90% of net distributable cash flows must be paid out to unitholders.',
          'Distributions are typically made on a quarterly basis in India.',
          'Cash flow comes from contracted corporate leases spanning 5 to 10 years.',
        ],
        sebiRegulationNote: 'SEBI (REIT) Regulations, 2014, Reg 18(16).',
        xpReward: 50,
      },
    ],
    quizRunQuestions: [
      {
        id: 'q-reit-1',
        prompt: 'What percentage of net distributable cash must Indian REITs pay out to unitholders?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: 'At least 50%', isCorrect: false },
          { laneIndex: 1, label: 'B', text: 'At least 90%', isCorrect: true },
          { laneIndex: 2, label: 'C', text: 'Exactly 25%', isCorrect: false },
        ],
        explanation: 'Under SEBI REIT Regulations, a minimum of 90% of net distributable cash flows must be distributed to investors.',
      },
      {
        id: 'q-reit-2',
        prompt: 'What type of properties do most Indian REITs primarily own?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: 'Grade-A Commercial Offices', isCorrect: true },
          { laneIndex: 1, label: 'B', text: 'Vacant Agricultural Land', isCorrect: false },
          { laneIndex: 2, label: 'C', text: 'Unfinished residential flats', isCorrect: false },
        ],
        explanation: 'Indian REITs primarily own completed, rent-yielding commercial IT parks and office complexes leased to blue-chip tenants.',
      },
      {
        id: 'q-reit-3',
        prompt: 'How can a retail investor buy or sell REIT units in India?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: 'Through property registration offices', isCorrect: false },
          { laneIndex: 1, label: 'B', text: 'Only through private auctions', isCorrect: false },
          { laneIndex: 2, label: 'C', text: 'On stock exchanges via Demat account', isCorrect: true },
        ],
        explanation: 'REITs trade publicly on stock exchanges (NSE and BSE) just like company equities through any standard demat broker.',
      },
    ],
  },
  invits: {
    topicId: 'invits',
    title: 'Infrastructure Investment Trusts (InvITs)',
    hindiTitle: 'इनविट्स (इंफ्रास्ट्रक्चर इन्वेस्टमेंट ट्रस्ट)',
    marathiTitle: 'इनव्हिट्स (इन्फ्रास्ट्रक्चर इन्व्हेस्टमेंट ट्रस्ट)',
    badgeId: 'INFRA_PIONEER',
    themeColor: '#10b981', // Emerald
    description: 'Understand how national highway toll gates, power transmission towers, and pipeline assets generate inflation-adjusted cash distributions.',
    lessons: [
      {
        id: 'invit-1',
        title: 'InvITs Explained: Nation-Building Assets',
        durationMinutes: 3,
        reviewStatus: 'needs review',
        summary: 'InvITs are trusts that own revenue-generating infrastructure assets such as toll expressways, power grids, and gas pipelines.',
        keyPoints: [
          'Assets usually operate under long-term concession agreements with government entities (e.g., NHAI, PowerGrid).',
          'Toll fees and transmission tariffs generate predictable, recurring revenues.',
          'Gives retail investors exposure to national infrastructure projects.',
        ],
        sebiRegulationNote: 'Governed by SEBI (Infrastructure Investment Trusts) Regulations, 2014.',
        xpReward: 50,
      },
      {
        id: 'invit-2',
        title: 'How InvITs Differ from REITs',
        durationMinutes: 4,
        reviewStatus: 'needs review',
        summary: 'Comparing real estate cash flows with infrastructure concession life cycles.',
        keyPoints: [
          'REITs own commercial buildings and tech parks; InvITs own infrastructure networks.',
          'Many InvIT assets have finite concession lifespans (e.g., 25-30 year road concession), requiring amortization.',
          'Both mandate a 90% payout rule under SEBI norms.',
        ],
        sebiRegulationNote: 'SEBI InvIT Guidelines 2014.',
        xpReward: 50,
      },
    ],
    quizRunQuestions: [
      {
        id: 'q-invit-1',
        prompt: 'Which underlying asset is typical for an Infrastructure Investment Trust (InvIT)?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: 'Highway Toll Roads & Power Grids', isCorrect: true },
          { laneIndex: 1, label: 'B', text: 'Shopping Malls & Retail Stores', isCorrect: false },
          { laneIndex: 2, label: 'C', text: 'Cryptocurrency mining farms', isCorrect: false },
        ],
        explanation: 'InvITs aggregate critical infrastructure assets like power transmission lines, toll highways, and gas pipelines.',
      },
      {
        id: 'q-invit-2',
        prompt: 'What happens to the cash flows from toll booths and transmission tariffs in an InvIT?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: 'At least 90% is distributed to unitholders', isCorrect: true },
          { laneIndex: 1, label: 'B', text: '100% must be reinvested in speculative stocks', isCorrect: false },
          { laneIndex: 2, label: 'C', text: 'It cannot be shared with retail investors', isCorrect: false },
        ],
        explanation: 'Similar to REITs, SEBI regulations mandate that minimum 90% of Net Distributable Cash Flows be paid to unitholders.',
      },
    ],
  },
  bonds: {
    topicId: 'bonds',
    title: 'Bonds & Fixed Income Securities',
    hindiTitle: 'बॉन्ड्स और फिक्स्ड इनकम (ऋण प्रतिभूतियां)',
    marathiTitle: 'रोखे आणि स्थिर उत्पन्न (कर्ज रोखे)',
    badgeId: 'BOND_STRATEGIST',
    themeColor: '#8b5cf6', // Violet
    description: 'Learn how Government Securities (G-Secs), Treasury Bills, and AAA corporate bonds provide downside protection and coupon income.',
    lessons: [
      {
        id: 'bond-1',
        title: 'Bonds 101: Becoming the Lender',
        durationMinutes: 3,
        reviewStatus: 'needs review',
        summary: 'When you buy a bond, you lend money to the government or a corporation in exchange for periodic interest (coupons).',
        keyPoints: [
          'Face value: The principal amount returned at maturity.',
          'Coupon rate: The fixed annual interest paid to bondholders.',
          'Maturity: The agreed date when the principal is repaid.',
        ],
        sebiRegulationNote: 'Regulated under SEBI (Issue and Listing of Non-Convertible Securities) Regulations.',
        xpReward: 50,
      },
      {
        id: 'bond-2',
        title: 'Credit Ratings & Sovereign Guarantee',
        durationMinutes: 4,
        reviewStatus: 'needs review',
        summary: 'Understanding risk and safety in debt markets.',
        keyPoints: [
          'G-Secs (Government of India) carry zero credit default risk (sovereign guarantee).',
          'Corporate bonds carry ratings from AAA (highest safety) down to D (default).',
          'Higher yield usually compensates for higher credit risk.',
        ],
        sebiRegulationNote: 'Credit rating agency disclosures mandated by SEBI (Credit Rating Agencies) Regulations.',
        xpReward: 50,
      },
    ],
    quizRunQuestions: [
      {
        id: 'q-bond-1',
        prompt: 'What is the periodic interest payment received by a bondholder called?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: 'Dividend', isCorrect: false },
          { laneIndex: 1, label: 'B', text: 'Coupon', isCorrect: true },
          { laneIndex: 2, label: 'C', text: 'Royalty', isCorrect: false },
        ],
        explanation: 'The interest paid by bond issuers to investors on fixed scheduled dates is called the coupon payment.',
      },
      {
        id: 'q-bond-2',
        prompt: 'Which security carries zero credit default risk in India?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: 'Government of India Securities (G-Secs)', isCorrect: true },
          { laneIndex: 1, label: 'B', text: 'Unrated corporate penny bonds', isCorrect: false },
          { laneIndex: 2, label: 'C', text: 'Peer-to-peer personal loans', isCorrect: false },
        ],
        explanation: 'Central Government Securities (G-Secs) are backed by the sovereign authority of India, carrying zero credit default risk.',
      },
    ],
  },
  gold: {
    topicId: 'gold',
    title: 'Gold Instruments (SGBs, ETFs & Digital Gold)',
    hindiTitle: 'स्वर्ण निवेश (SGB, गोल्ड ईटीएफ एवं डिजिटल गोल्ड)',
    marathiTitle: 'सुवर्ण गुंतवणूक (SGB, गोल्ड ईटीएफ आणि डिजिटल गोल्ड)',
    badgeId: 'GOLD_GUARDIAN',
    themeColor: '#f59e0b', // Amber
    description: 'Compare physical jewelry, Sovereign Gold Bonds (SGBs), and SEBI-regulated Gold ETFs as portfolio volatility hedges.',
    lessons: [
      {
        id: 'gold-1',
        title: 'Why Allocate to Gold in a Portfolio?',
        durationMinutes: 3,
        reviewStatus: 'needs review',
        summary: 'Gold acts as a classic non-correlated hedge against geopolitical tension, inflation, and equity market drawdowns.',
        keyPoints: [
          'Historically exhibits low or negative correlation with equities during severe market stress.',
          'Preserves purchasing power against long-term currency depreciation.',
          'Usually recommended between 5% to 15% of total wealth for balancing.',
        ],
        sebiRegulationNote: 'Educational concept only; actual asset allocation depends on individual risk profile.',
        xpReward: 50,
      },
      {
        id: 'gold-2',
        title: 'Gold ETFs vs SGBs vs Physical Gold',
        durationMinutes: 4,
        reviewStatus: 'needs review',
        summary: 'Comparing liquidity, purity, making charges, and extra interest yields.',
        keyPoints: [
          'Gold ETFs: High liquidity on stock exchange, 99.5% purity, zero making charges.',
          'Sovereign Gold Bonds (SGBs): Issued by RBI, pays 2.5% annual interest, sovereign guarantee.',
          'Physical jewelry: Carries high making charges and storage security risks.',
        ],
        sebiRegulationNote: 'Gold ETFs are audited and custodied under SEBI Mutual Fund regulations.',
        xpReward: 50,
      },
    ],
    quizRunQuestions: [
      {
        id: 'q-gold-1',
        prompt: 'What additional benefit do Sovereign Gold Bonds (SGBs) offer over physical gold?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: '2.5% annual interest payout on initial investment', isCorrect: true },
          { laneIndex: 1, label: 'B', text: 'Free delivery of physical gold biscuits every month', isCorrect: false },
          { laneIndex: 2, label: 'C', text: 'Guaranteed 50% yearly stock market returns', isCorrect: false },
        ],
        explanation: 'Sovereign Gold Bonds issued by RBI pay a semi-annual interest of 2.50% per annum on the nominal value, in addition to tracking the market price of gold.',
      },
      {
        id: 'q-gold-2',
        prompt: 'How is physical gold stored for SEBI-regulated Gold ETFs?',
        laneOptions: [
          { laneIndex: 0, label: 'A', text: 'In secure, independently audited custodian vaults at 99.5% purity', isCorrect: true },
          { laneIndex: 1, label: 'B', text: 'In local jewelry display cases without insurance', isCorrect: false },
          { laneIndex: 2, label: 'C', text: 'As digital IOUs with no physical metal backing', isCorrect: false },
        ],
        explanation: 'SEBI mandates that Gold ETFs hold 99.5% pure physical gold bullion in accredited, insured custodian vaults.',
      },
    ],
  },
};

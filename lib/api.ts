// Unified Typed API Client & Gateway Interface
// Matches future Phase 2 Flask endpoints with seamless NEXT_PUBLIC_USE_MOCKS flag

import {
  SyntheticPersona,
  UnifiedPortfolio,
  ExposureAnalysis,
  EducatorRequest,
  EducatorResponse,
  LearnZoneData,
  ImportResult,
  ManualHoldingInput,
  Holding,
} from './types';
import { SYNTHETIC_PERSONAS } from '../mocks/personas';
import { SYNTHETIC_EXPOSURE_DATA } from '../mocks/exposureData';
import { LEARN_ZONES } from '../mocks/learnContent';
import { checkQueryGuardrails, GUARDRAIL_DISCLAIMERS } from './guardrails';
import { SEBI_CORPUS_SNIPPETS } from '../mocks/sebiCorpus';

export const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== 'false';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiGatewayClient {
  private sessionToken: string | null = null;
  private currentPersonaId: string = 'aarav-equity-enthusiast';

  constructor() {
    if (typeof window !== 'undefined') {
      this.sessionToken = localStorage.getItem('uwh_session_token') || 'mock-session-jwt-token-demo';
    }
  }

  public setPersonaId(id: string) {
    this.currentPersonaId = id;
  }

  public getPersonaId(): string {
    return this.currentPersonaId;
  }

  // 1. POST /auth/token
  public async postAuthToken(): Promise<{ token: string; expiresAt: string }> {
    if (USE_MOCKS) {
      const mockToken = `mock-token-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      this.sessionToken = mockToken;
      if (typeof window !== 'undefined') {
        localStorage.setItem('uwh_session_token', mockToken);
      }
      return {
        token: mockToken,
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
      };
    }

    const res = await fetch(`${API_BASE_URL}/auth/token`, { method: 'POST' });
    const data = await res.json();
    this.sessionToken = data.token;
    return data;
  }

  // 2. GET /personas
  public async getPersonas(): Promise<SyntheticPersona[]> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 150));
      return SYNTHETIC_PERSONAS;
    }

    const res = await fetch(`${API_BASE_URL}/personas`, {
      headers: { Authorization: `Bearer ${this.sessionToken}` },
    });
    return res.json();
  }

  // 3. POST /portfolio/import (Simulated CAS PDF upload)
  public async postPortfolioImport(formData: FormData): Promise<ImportResult> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 600)); // Simulate file ingest
      return {
        success: true,
        importedHoldingsCount: 8,
        depositorySource: 'CDSL',
        maskedPan: 'ABCDE****F',
        timestamp: new Date().toISOString(),
      };
    }

    const res = await fetch(`${API_BASE_URL}/portfolio/import`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.sessionToken}` },
      body: formData,
    });
    return res.json();
  }

  // 4. POST /portfolio/manual
  public async postPortfolioManual(entry: ManualHoldingInput): Promise<Holding> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 300));
      const newHolding: Holding = {
        id: `manual-${Date.now()}`,
        symbol: entry.symbol.toUpperCase(),
        name: entry.name,
        isin: `${entry.symbol.toUpperCase()}-IN-MOCK`,
        assetClass: entry.assetClass,
        source: entry.source,
        accountType: 'BROKER',
        quantity: entry.quantity,
        averagePrice: entry.averagePrice,
        currentPrice: entry.averagePrice * 1.05,
        currentValue: entry.quantity * entry.averagePrice * 1.05,
        investedValue: entry.quantity * entry.averagePrice,
        pnl: entry.quantity * entry.averagePrice * 0.05,
        pnlPercentage: 5.0,
      };
      return newHolding;
    }

    const res = await fetch(`${API_BASE_URL}/portfolio/manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.sessionToken}`,
      },
      body: JSON.stringify(entry),
    });
    return res.json();
  }

  // 5. GET /portfolio
  public async getPortfolio(): Promise<UnifiedPortfolio> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 200));
      const persona = SYNTHETIC_PERSONAS.find((p) => p.id === this.currentPersonaId) || SYNTHETIC_PERSONAS[0];
      const totalInv = persona.portfolioSummary.totalInvested;
      const curVal = persona.portfolioSummary.currentValue;
      return {
        lastUpdated: new Date().toISOString(),
        personaId: persona.id,
        totalInvested: totalInv,
        currentValue: curVal,
        totalUnrealizedPnl: curVal - totalInv,
        totalPnlPercentage: parseFloat((((curVal - totalInv) / totalInv) * 100).toFixed(2)),
        sourcesConnected: [...persona.accounts.brokers, ...persona.accounts.depositories],
        holdings: persona.holdings,
        mutualFunds: persona.mutualFunds,
      };
    }

    const res = await fetch(`${API_BASE_URL}/portfolio`, {
      headers: { Authorization: `Bearer ${this.sessionToken}` },
    });
    return res.json();
  }

  // 6. GET /exposure
  public async getExposure(): Promise<ExposureAnalysis> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 250));
      const data = SYNTHETIC_EXPOSURE_DATA[this.currentPersonaId] || SYNTHETIC_EXPOSURE_DATA['aarav-equity-enthusiast'];
      return data;
    }

    const res = await fetch(`${API_BASE_URL}/exposure`, {
      headers: { Authorization: `Bearer ${this.sessionToken}` },
    });
    return res.json();
  }

  // 7. POST /educator/ask (With SEBI-aligned guardrail layer & multilingual mock replies)
  public async postEducatorAsk(req: EducatorRequest): Promise<EducatorResponse> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 450)); // simulate thinking

      // Guardrail Check
      const guardrailResult = checkQueryGuardrails(req.query);
      const lang = req.language || 'en';

      if (guardrailResult.isTriggered) {
        return {
          answer: GUARDRAIL_DISCLAIMERS[lang].adviceRefusal,
          isGuardrailTriggered: true,
          guardrailNote: GUARDRAIL_DISCLAIMERS[lang].aiBadge,
          citation: 'SEBI (Research Analysts) Regulations, 2014 & SEBI (Investment Advisers) Regulations, 2013',
          suggestedFollowUps: [
            lang === 'hi' ? 'विविधीकरण (Diversification) क्यों जरूरी है?' : lang === 'mr' ? 'विविधीकरण म्हणजे काय?' : 'Why is diversification essential?',
            lang === 'hi' ? 'हिडन क्लोन (Hidden Clones) क्या होते हैं?' : lang === 'mr' ? 'हिडन क्लोन्स म्हणजे काय?' : 'What does True Exposure reveal?',
            lang === 'hi' ? 'REITs से क्या लाभ होता है?' : lang === 'mr' ? 'REITs कसे काम करतात?' : 'How do REITs generate cash flow?',
          ],
        };
      }

      // Contextual educational response based on query keywords
      const queryLower = req.query.toLowerCase();
      let answer = '';
      let citation = '';

      if (queryLower.includes('clone') || queryLower.includes('overlap') || queryLower.includes('क्लोन') || queryLower.includes('ओव्हरलॅप')) {
        citation = SEBI_CORPUS_SNIPPETS.overlap.citation;
        if (lang === 'hi') {
          answer = `💡 **हिडन क्लोन्स की समझ:** जब आप किसी शेयर (जैसे HDFC Bank) को सीधे अपने डीमैट में रखते हैं और साथ ही ऐसे 2-3 म्यूचुअल फंड्स में भी निवेश करते हैं जिनमें वही शेयर शीर्ष पर है, तो आपकी अनजाने में उसी कंपनी पर बहुत बड़ी निर्भरता हो जाती है। इसे 'अदृश्य दोहराव' (Hidden Clones) कहते हैं। जब वह क्षेत्र गिरता है, तो पूरा पोर्टफोलियो एक साथ प्रभावित होता है।`;
        } else if (lang === 'mr') {
          answer = `💡 **हिडन क्लोन्स (ओव्हरलॅप):** जेव्हा तुम्ही एखादा शेअर (उदा. HDFC Bank) थेट स्वतःच्या डिमॅटमध्ये विकत घेता आणि त्याचवेळी तुम्ही घेतलेल्या म्युच्युअल फंडांमध्येही तोच शेअर मोठ्या प्रमाणावर असतो, तेव्हा नकळत तुमचे एकाच कंपनीवरील अवलंबित्व खूप वाढते. याला 'हिडन क्लोन्स' म्हणतात.`;
        } else {
          answer = `💡 **Understanding Hidden Clones:** A hidden clone happens when you hold a stock directly in your demat account (e.g. HDFC Bank) AND simultaneously hold multiple mutual funds where that same stock is a top allocation. While you might believe you are diversified across 3 different funds, in reality over 25-30% of your total capital may be concentrated in that single corporate entity.`;
        }
      } else if (queryLower.includes('reit') || queryLower.includes('रीट')) {
        citation = SEBI_CORPUS_SNIPPETS.reits.citation;
        if (lang === 'hi') {
          answer = `🏢 **REITs (रियल एस्टेट इन्वेस्टमेंट ट्रस्ट):** यह आपको करोड़ों रुपये खर्च किए बिना बड़े कमर्शियल आईटी पार्क्स और मॉल में छोटे स्तर पर मालिक बनने की सुविधा देता है। सेबी (SEBI) के नियमों के तहत, REITs को अपने शुद्ध किराये और नकदी का कम से कम 90% हिस्सा निवेशकों को नियमित लाभांश के रूप में वितरित करना अनिवार्य है।`;
        } else if (lang === 'mr') {
          answer = `🏢 **REITs (रिअल इस्टेट इन्व्हेस्टमेंट ट्रस्ट):** प्रत्यक्ष कोट्यवधींची मालमत्ता न घेता व्यावसायिक इमारती व आयटी पार्क्समध्ये लहान गुंतवणूकदारांना मालकी हक्क मिळवून देण्याचे हे साधन आहे. सेबीच्या नियमांनुसार, मिळणाऱ्या नक्त भाडेउत्पन्नाच्या किमान ९०% रक्कम युनिट धारकांना नियमित वाटप करणे बंधनकारक असते.`;
        } else {
          answer = `🏢 **Real Estate Investment Trusts (REITs):** REITs allow retail investors to own fractional shares of revenue-generating commercial real estate (such as grade-A office buildings and IT parks). SEBI regulations require REITs to distribute at least 90% of their Net Distributable Cash Flows to unitholders, providing regular dividend yield.`;
        }
      } else if (queryLower.includes('invit') || queryLower.includes('इनविट') || queryLower.includes('इनव्हिट')) {
        citation = SEBI_CORPUS_SNIPPETS.invits.citation;
        if (lang === 'hi') {
          answer = `🛣️ **InvITs (इंफ्रास्ट्रक्चर इन्वेस्टमेंट ट्रस्ट):** यह राष्ट्रीय राजमार्गों, पावर ग्रिड लाइनों और दूरसंचार टावरों जैसी अवसंरचना परिसंपत्तियों का स्वामित्व रखते हैं। टोल टैक्स और ट्रांसमिशन शुल्कों से आने वाली आय का 90% हिस्सा निवेशकों को वितरित किया जाता है।`;
        } else if (lang === 'mr') {
          answer = `🛣️ **InvITs (इन्फ्रास्ट्रक्चर इन्व्हेस्टमेंट ट्रस्ट):** राष्ट्रीय महामार्ग, वीज वाहिन्या आणि टॉवर्स यांसारख्या पायाभूत सुविधांमधील उत्पन्नाचे हे साधन आहे. टोल आणि ट्रान्समिशन शुल्कातून येणाऱ्या नफ्यातील ९०% हिस्सा युनिट धारकांना दिला जातो.`;
        } else {
          answer = `🛣️ **Infrastructure Investment Trusts (InvITs):** InvITs aggregate operating infrastructure assets such as toll expressways, power transmission grids, and pipelines. Like REITs, they operate under a strict 90% cash distribution mandate under SEBI regulations.`;
        }
      } else {
        citation = 'SEBI Investor Education and Financial Literacy Framework';
        if (lang === 'hi') {
          answer = `📚 **वित्तीय साक्षरता नियम:** किसी भी पोर्टफोलियो को केवल एक परिसंपत्ति वर्ग (जैसे केवल इक्विटी) में सीमित रखने के बजाय, अलग-अलग चक्रों वाली संपत्तियों (जैसे इक्विटी, बॉन्ड, REITs और सोना) में विभाजित करना जोखिम को संतुलित करता है। क्या आप किसी विशिष्ट संपत्ति वर्ग के बारे में जानना चाहते हैं?`;
        } else if (lang === 'mr') {
          answer = `📚 **वित्तीय साक्षरतेचे तत्त्व:** संपूर्ण पोर्टफोलिओ केवळ एकाच मालमत्तेवर (उदा. केवळ शेअर्स) अवलंबून न ठेवता वेगवेगळ्या मालमत्ता प्रकारांमध्ये (शेअर्स, रोखे, REITs, सोने) विभागणे हे दीर्घकालीन सुरक्षिततेसाठी उपयुक्त ठरते.`;
        } else {
          answer = `📚 **Core Diversification Principles:** Holding uncorrelated asset classes (equities, fixed income bonds, REITs, and gold) ensures that a sharp correction in one sector does not jeopardize your entire net worth. You can explore the Exposure Arena to see where your gaps lie.`;
        }
      }

      return {
        answer,
        isGuardrailTriggered: false,
        guardrailNote: GUARDRAIL_DISCLAIMERS[lang].aiBadge,
        citation,
        suggestedFollowUps: [
          lang === 'hi' ? 'मेरे हिडन क्लोन को सरल हिंदी में समझाएं' : lang === 'mr' ? 'माझे ओव्हरलॅप शेअर्स दाखवा' : 'Show me my highest overlap stocks',
          lang === 'hi' ? 'REITs और InvITs में क्या अंतर है?' : lang === 'mr' ? 'REITs आणि InvITs मधील फरक काय?' : 'What is the difference between REITs and InvITs?',
          lang === 'hi' ? 'सोने में निवेश के क्या नियम हैं?' : lang === 'mr' ? 'सोन्यामध्ये गुंतवणुकीचे मार्ग कोणते?' : 'How does gold act as a volatility cushion?',
        ],
      };
    }

    const res = await fetch(`${API_BASE_URL}/educator/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.sessionToken}`,
      },
      body: JSON.stringify(req),
    });
    return res.json();
  }

  // 8. GET /learn/{topic}
  public async getLearnTopic(topicId: string): Promise<LearnZoneData> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 150));
      const zone = LEARN_ZONES[topicId] || LEARN_ZONES['reits'];
      return zone;
    }

    const res = await fetch(`${API_BASE_URL}/learn/${topicId}`, {
      headers: { Authorization: `Bearer ${this.sessionToken}` },
    });
    return res.json();
  }
}

export const apiGateway = new ApiGatewayClient();

// SEBI-Aligned Guardrail Layer
// Strictly educational: intercepts advice-seeking queries and redirects to principles.
// Note: This platform adheres to SEBI-aligned guardrails and does NOT claim SEBI registration or endorsement.

export interface GuardrailCheckResult {
  isTriggered: boolean;
  category: 'ADVICE_SEEKING' | 'SPECULATION' | 'PORTFOLIO_JUDGMENT' | 'NONE';
  responseKey: string;
}

const ADVICE_PATTERNS = [
  /\b(should\s+i\s+(buy|sell|invest|exit|hold))\b/i,
  /\b(which\s+(stock|share|fund|coin)\s+to\s+buy)\b/i,
  /\b(target\s+price|price\s+target|multibagger)\b/i,
  /\b(will\s+.*\s+(go\s+up|rise|crash|fall|double))\b/i,
  /\b(best\s+(stock|fund|share|crypto|penny\s+stock))\b/i,
  /\b(give\s+me\s+(tips|recommendations?|advice))\b/i,
  /\b(is\s+it\s+good\s+time\s+to\s+invest)\b/i,
  /\b(rate\s+my\s+portfolio|judge\s+my\s+portfolio|rank\s+me)\b/i,
  /\b(tata\s+motors|reliance|hdfc|infosys)\s+(buy|sell)\b/i,
];

export function checkQueryGuardrails(query: string): GuardrailCheckResult {
  const normalized = query.trim().toLowerCase();

  for (const pattern of ADVICE_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        isTriggered: true,
        category: 'ADVICE_SEEKING',
        responseKey: 'advice_refusal',
      };
    }
  }

  return {
    isTriggered: false,
    category: 'NONE',
    responseKey: '',
  };
}

export const GUARDRAIL_DISCLAIMERS = {
  en: {
    banner: "Educational only, not investment advice. Powered by SEBI-aligned guardrails.",
    footer: "Disclaimer: This hub is strictly an educational tool to visualize portfolio exposure and learn asset mechanics. It is NOT a SEBI-registered advisor, broker, or research entity. No content constitutes financial advice, buy/sell calls, or securities recommendations. All market data & ISINs displayed are synthetic mocks.",
    aiBadge: "SEBI-Aligned Guardrail Active • Purely Educational",
    adviceRefusal: "🛡️ SEBI-Aligned Guardrail Notice: I cannot provide investment advice, buy/sell recommendations, price targets, or rank your investments. However, I can help explain the mechanics of how portfolio diversification works, what True Exposure means, or the characteristics of REITs, InvITs, bonds, and gold.",
  },
  hi: {
    banner: "केवल शैक्षणिक उद्देश्य, कोई निवेश सलाह नहीं। SEBI-संरचित दिशा-निर्देशों के अनुरूप।",
    footer: "अस्वीकरण: यह हब केवल पोर्टफोलियो के जोखिम और परिसंपत्तियों की कार्यप्रणाली को समझाने के लिए एक शैक्षणिक मंच है। यह SEBI-पंजीकृत सलाहकार या ब्रोकर नहीं है। कोई भी सामग्री खरीद/बिक्री की सलाह नहीं है। सभी आंकड़े काल्पनिक (सिंथेटिक) हैं।",
    aiBadge: "SEBI-संरचित दिशा-निर्देश सक्रिय • केवल शिक्षण हेतु",
    adviceRefusal: "🛡️ SEBI-संरचित गार्डरेल सूचना: मैं कोई निवेश सलाह, शेयर खरीदने/बेचने की सिफारिश या टार्गेट प्राइस नहीं दे सकता। लेकिन मैं यह समझा सकता हूँ कि पोर्टफोलियो में विविधता (Diversification) कैसे काम करती है, या REITs, InvITs, बॉन्ड और सोने के क्या बुनियादी नियम हैं।",
  },
  mr: {
    banner: "केवळ शैक्षणिक उद्देश, कोणतीही गुंतवणूक सल्ला नाही. SEBI-सुसंगत नियमावलीनुसार.",
    footer: "अस्वीकरण: हे हब केवळ पोर्टफोलिओ एक्सपोजर समजून घेण्यासाठी आणि विविध मालमत्तांचे शिक्षण घेण्यासाठी एक गेम-आधारित साधन आहे. हे SEBI-नोंदणीकृत सल्लागार नाही. कोणतीही माहिती शेअर्स खरेदी/विक्रीचा सल्ला मानू नये. सर्व डेटा कृत्रिम (मॉक) आहे.",
    aiBadge: "SEBI-सुसंगत गार्डरेल सक्रिय • केवळ शिक्षणासाठी",
    adviceRefusal: "🛡️ SEBI-सुसंगत गार्डरेल सूचना: मी गुंतवणूक सल्ला, शेअर्स खरेदी किंवा विक्रीच्या शिफारशी किंवा भाकिते देऊ शकत नाही. मात्र, मी पोर्टफोलिओमधील Hidden Clones (ओव्हरलॅप), विविधीकरणाचे महत्त्व किंवा REITs, InvITs, रोखे आणि सुवर्ण गुंतवणुकीचे नियम सहज भाषेत समजावून सांगू शकतो.",
  },
};

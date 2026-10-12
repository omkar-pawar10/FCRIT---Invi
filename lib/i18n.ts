import { SupportedLanguage } from './types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  nav: {
    dashboard: string;
    portfolio: string;
    exposure: string;
    gaps: string;
    assistant: string;
    academy: string;
    import: string;
  };
  common: {
    totalNetWorth: string;
    totalInvested: string;
    unrealizedPnL: string;
    accountsConnected: string;
    trueExposure: string;
    overlapRisk: string;
    assetGaps: string;
    sebiNotice: string;
    filterByBroker: string;
    filterByAssetClass: string;
    searchPlaceholder: string;
    personaSelector: string;
  };
  sections: {
    exposure: {
      title: string;
      subtitle: string;
      hiddenClonesTitle: string;
      hiddenClonesDesc: string;
      directWeight: string;
      indirectWeight: string;
      combinedWeight: string;
      concentrationRisk: string;
    };
    gaps: {
      title: string;
      subtitle: string;
      unallocatedNotice: string;
      exploreAssetCTA: string;
    };
    assistant: {
      title: string;
      subtitle: string;
      inputPlaceholder: string;
      sendBtn: string;
      guardrailNotice: string;
      promptChips: string[];
    };
    academy: {
      title: string;
      subtitle: string;
      knowledgeCheck: string;
      regulatoryBasis: string;
      needsReview: string;
    };
    dashboard: {
      welcome: string;
      portfolioHealth: string;
      assetAllocation: string;
      topHoldings: string;
      overlapAlert: string;
      gapAlert: string;
      viewAllHoldings: string;
      viewExposureMatrix: string;
      askAssistant: string;
    };
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: "Unified Wealth Hub",
    tagline: "Institutional Portfolio Look-Through, Exposure Analysis & Multilingual Literacy",
    nav: {
      dashboard: "Overview",
      portfolio: "Holdings & Accounts",
      exposure: "True Exposure & Overlaps",
      gaps: "Asset Allocation & Gaps",
      assistant: "Wealth Assistant",
      academy: "Knowledge Academy",
      import: "Data Sources & Sync",
    },
    common: {
      totalNetWorth: "Consolidated Net Worth",
      totalInvested: "Invested Capital",
      unrealizedPnL: "Total Unrealized Return",
      accountsConnected: "Connected Entities",
      trueExposure: "True Look-Through Exposure",
      overlapRisk: "Single-Stock Concentration",
      assetGaps: "Unallocated Asset Classes",
      sebiNotice: "SEBI-Aligned Guardrails • Strictly Educational",
      filterByBroker: "Group by Depository / Broker",
      filterByAssetClass: "Group by Asset Class",
      searchPlaceholder: "Search by symbol, scheme name, or ISIN...",
      personaSelector: "Sample Portfolio Persona",
    },
    sections: {
      exposure: {
        title: "True Look-Through & Overlap Matrix",
        subtitle: "Uncovers underlying stock concentration across direct equities and active mutual funds.",
        hiddenClonesTitle: "Concentrated Underlying Holdings (Hidden Overlaps)",
        hiddenClonesDesc: "Securities held both directly in demat and through underlying mutual fund portfolios.",
        directWeight: "Direct Demat Holding",
        indirectWeight: "Look-Through via Mutual Funds",
        combinedWeight: "Consolidated Exposure",
        concentrationRisk: "Concentration Risk Severity",
      },
      gaps: {
        title: "Multi-Asset Allocation Diagnostic",
        subtitle: "Identification of unrepresented alternative asset classes essential for all-weather risk balance.",
        unallocatedNotice: "0% Allocation Detected",
        exploreAssetCTA: "Read Institutional Primer",
      },
      assistant: {
        title: "Multilingual Wealth Educator",
        subtitle: "Conversational guidance powered by SEBI-aligned guardrails and regulatory frameworks.",
        inputPlaceholder: "Ask about your portfolio overlap, REIT rental yields, bond coupons, or asset mechanics...",
        sendBtn: "Inquire",
        guardrailNotice: "SEBI-Aligned Guardrail Intercept • Educational Only",
        promptChips: [
          "Explain my highest underlying stock overlap",
          "What is the SEBI 90% payout mandate for REITs?",
          "How do InvITs generate recurring cash flows?",
          "Should I buy Tata Motors shares today? (Guardrail Test)",
        ],
      },
      academy: {
        title: "Multi-Asset Educational Academy",
        subtitle: "Curated institutional primers and knowledge assessments covering REITs, InvITs, Bonds, and Gold.",
        knowledgeCheck: "Knowledge Checkpoint",
        regulatoryBasis: "Regulatory Foundation (SEBI / RBI)",
        needsReview: "Needs Review",
      },
      dashboard: {
        welcome: "Consolidated Portfolio Intelligence",
        portfolioHealth: "Diversification & Exposure Health",
        assetAllocation: "Consolidated Asset Allocation",
        topHoldings: "Consolidated Demat & Scheme Holdings",
        overlapAlert: "Underlying Stock Concentration Alert",
        gapAlert: "Unallocated Multi-Asset Gaps",
        viewAllHoldings: "View Full Holdings & Depositories",
        viewExposureMatrix: "View True Look-Through Exposure Matrix",
        askAssistant: "Ask Wealth Assistant",
      },
    },
  },
  hi: {
    appName: "यूनिफाइड वेल्थ हब",
    tagline: "संस्थागत पोर्टफोलियो लुक-थ्रू, एक्सपोज़र विश्लेषण एवं बहुभाषी वित्तीय साक्षरता",
    nav: {
      dashboard: "सिंहावलोकन",
      portfolio: "होल्डिंग्स एवं खाते",
      exposure: "सच्चा एक्सपोज़र एवं ओवरलैप",
      gaps: "संपत्ति आवंटन एवं गॅप्स",
      assistant: "वेल्थ असिस्टेंट",
      academy: "नॉलेज एकेडमी",
      import: "डेटा स्रोत एवं सिंक",
    },
    common: {
      totalNetWorth: "एकीकृत कुल संपत्ति",
      totalInvested: "कुल निवेशित पूंजी",
      unrealizedPnL: "कुल अवास्तविक लाभ",
      accountsConnected: "संबद्ध संस्थाएं",
      trueExposure: "सच्चा लुक-थ्रू एक्सपोज़र",
      overlapRisk: "एकल शेयर एकाग्रता जोखिम",
      assetGaps: "अनुपस्थित परिसंपत्ति वर्ग",
      sebiNotice: "SEBI-संरचित दिशा-निर्देश • केवल शैक्षणिक",
      filterByBroker: "डिपॉजिटरी / ब्रोकर अनुसार",
      filterByAssetClass: "परिसंपत्ति वर्ग अनुसार",
      searchPlaceholder: "शेयर, फंड या ISIN द्वारा खोजें...",
      personaSelector: "नमूना पोर्टफोलियो प्रोफाइल",
    },
    sections: {
      exposure: {
        title: "सच्चा लुक-थ्रू एवं ओवरलैप मैट्रिक्स",
        subtitle: "प्रत्यक्ष इक्विटी और सक्रिय म्यूचुअल फंड्स में अंतर्निहित शेयरों के दोहराव का विश्लेषण।",
        hiddenClonesTitle: "सघन अंतर्निहित होल्डिंग्स (हिडन क्लोन्स)",
        hiddenClonesDesc: "वे प्रतिभूतियां जो प्रत्यक्ष डीमैट और म्यूचुअल फंड दोनों के जरिए धारित हैं।",
        directWeight: "प्रत्यक्ष डीमैट होल्डिंग",
        indirectWeight: "फंड्स के माध्यम से लुक-थ्रू",
        combinedWeight: "एकीकृत कुल एक्सपोज़र",
        concentrationRisk: "जोखिम गंभीरता",
      },
      gaps: {
        title: "बहु-परिसंपत्ति आवंटन विश्लेषण",
        subtitle: "पोर्टफोलियो संतुलन के लिए छूटे हुए वैकल्पिक परिसंपत्ति वर्गों की पहचान।",
        unallocatedNotice: "०% आवंटन दर्ज",
        exploreAssetCTA: "मार्गदर्शिका पढ़ें",
      },
      assistant: {
        title: "बहुभाषी वेल्थ शिक्षक",
        subtitle: "सेबी-निर्देशित सुरक्षा नियमों के तहत स्पष्ट एवं निष्पक्ष वित्तीय समझ।",
        inputPlaceholder: "अपने ओवरलैप, REITs, बॉन्ड कूपन या सोने के बारे में पूछें...",
        sendBtn: "पूछें",
        guardrailNotice: "SEBI-संरचित गार्डरेल अवरोध • केवल शिक्षण हेतु",
        promptChips: [
          "मेरे सबसे बड़े स्टॉक ओवरलैप को समझाएं",
          "REITs के लिए सेबी का 90% नकदी वितरण नियम क्या है?",
          "InvITs से नियमित आय कैसे होती है?",
          "क्या मुझे आज टाटा मोटर्स खरीदना चाहिए? (गार्डरेल टेस्ट)",
        ],
      },
      academy: {
        title: "वित्तीय साक्षरता एकेडमी",
        subtitle: "REITs, InvITs, बॉन्ड्स और सोने के संस्थागत नियम और परीक्षण।",
        knowledgeCheck: "ज्ञान परीक्षण",
        regulatoryBasis: "नियामक आधार (SEBI / RBI)",
        needsReview: "समीक्षाधीन",
      },
      dashboard: {
        welcome: "एकीकृत पोर्टफोलियो इंटेलिजेंस",
        portfolioHealth: "विविधीकरण एवं एक्सपोज़र स्वास्थ्य",
        assetAllocation: "एकीकृत परिसंपत्ति आवंटन",
        topHoldings: "प्रमुख डीमैट एवं फंड होल्डिंग्स",
        overlapAlert: "अंतर्निहित शेयर एकाग्रता चेतावनी",
        gapAlert: "अनुपस्थित बहु-परिसंपत्ति गॅप्स",
        viewAllHoldings: "संपूर्ण होल्डिंग्स देखें",
        viewExposureMatrix: "सच्चा लुक-थ्रू एक्सपोज़र देखें",
        askAssistant: "असिस्टेंट से पूछें",
      },
    },
  },
  mr: {
    appName: "युनिफाइड वेल्थ हब",
    tagline: "संस्थागत पोर्टफोलिओ लुक-थ्रू, एक्सपोजर विश्लेषण व बहुभाषिक वित्तीय साक्षरता",
    nav: {
      dashboard: "आढावा",
      portfolio: "होल्डिंग्स व खाती",
      exposure: "खरे एक्सपोजर व ओव्हरलॅप",
      gaps: "मालमत्ता वाटप व गॅप्स",
      assistant: "वेल्थ असिस्टंट",
      academy: "नॉलेज अकॅडमी",
      import: "डेटा स्रोत व सिंक",
    },
    common: {
      totalNetWorth: "एकत्रित निव्वळ संपत्ती",
      totalInvested: "गुंतवणूक केलेली रक्कम",
      unrealizedPnL: "एकूण नफा/तोटा",
      accountsConnected: "जोडलेली खाती",
      trueExposure: "खरे लुक-थ्रू एक्सपोजर",
      overlapRisk: "एकाच शेअरमधील केंद्रित जोखीम",
      assetGaps: "नसलेले मालमत्ता प्रकार",
      sebiNotice: "SEBI-सुसंगत मार्गदर्शक तत्त्वे • केवळ शैक्षणिक",
      filterByBroker: "डिपॉझिटरी / ब्रोकरनुसार",
      filterByAssetClass: "मालमत्ता प्रकारानुसार",
      searchPlaceholder: "शेअर्स, फंड किंवा ISIN द्वारे शोधा...",
      personaSelector: "नमुना पोर्टफोलिओ प्रोफाइल",
    },
    sections: {
      exposure: {
        title: "खरे लुक-थ्रू व ओव्हरलॅप मॅट्रिक्स",
        subtitle: "थेट शेअर्स आणि म्युच्युअल फंडांमधील डुप्लिकेट गुंतवणुकीचे अचूक विश्लेषण.",
        hiddenClonesTitle: "केंद्रित अंतर्गत होल्डिंग्स (हिडन क्लोन्स)",
        hiddenClonesDesc: "जे शेअर्स थेट डिमॅटमध्येही आहेत आणि म्युच्युअल फंडांमध्येही समाविष्ट आहेत.",
        directWeight: "थेट डिमॅट होल्डिंग",
        indirectWeight: "म्युच्युअल फंडांमार्फत लुक-थ्रू",
        combinedWeight: "एकत्रित एकूण एक्सपोजर",
        concentrationRisk: "केंद्रीकरण जोखीम",
      },
      gaps: {
        title: "बहु-मालमत्ता वाटप विश्लेषण",
        subtitle: "जोखीम कमी करण्यासाठी आवश्यक असलेल्या पर्यायी मालमत्तांचा आढावा.",
        unallocatedNotice: "०% वाटप आढळले",
        exploreAssetCTA: "सविस्तर माहिती वाचा",
      },
      assistant: {
        title: "बहुभाषिक वेल्थ मार्गदर्शक",
        subtitle: "SEBI-सुसंगत नियमावलीनुसार सोप्या मराठीत निष्पक्ष मार्गदर्शन.",
        inputPlaceholder: "ओव्हरलॅप, REITs, रोखे किंवा सोन्याबद्दल प्रश्न विचारा...",
        sendBtn: "विचारा",
        guardrailNotice: "SEBI-सुसंगत गार्डरेल अडथळा • केवळ शिक्षणासाठी",
        promptChips: [
          "माझ्या पोर्टफोलिओमधील सर्वाधिक ओव्हरलॅप शेअर्स दाखवा",
          "REITs साठी सेबीचा ९०% लाभांश वाटप नियम काय आहे?",
          "InvITs मधून पायाभूत सुविधांचे उत्पन्न कसे मिळते?",
          "मी आज टाटा मोटर्स शेअर्स खरेदी करू का? (गार्डरेल टेस्ट)",
        ],
      },
      academy: {
        title: "वित्तीय साक्षरता अकॅडमी",
        subtitle: "REITs, InvITs, रोखे आणि सोन्यावरील संस्थागत अभ्यासक्रम आणि संकल्पना तपासणी.",
        knowledgeCheck: "ज्ञान तपासणी",
        regulatoryBasis: "नियामक आधार (SEBI / RBI)",
        needsReview: "पुनरावलोकन आवश्यक",
      },
      dashboard: {
        welcome: "एकत्रित पोर्टफोलिओ इंटेलिजन्स",
        portfolioHealth: "वैविध्यीकरण व एक्सपोजर स्थिती",
        assetAllocation: "एकत्रित मालमत्ता वाटप",
        topHoldings: "प्रमुख डिमॅट व फंड होल्डिंग्स",
        overlapAlert: "अंतर्गत शेअर एकाग्रता इशारा",
        gapAlert: "नसलेले बहु-मालमत्ता गॅप्स",
        viewAllHoldings: "सर्व होल्डिंग्स तपासा",
        viewExposureMatrix: "खरे लुक-थ्रू एक्सपोजर पहा",
        askAssistant: "असिस्टंटला विचारा",
      },
    },
  },
};

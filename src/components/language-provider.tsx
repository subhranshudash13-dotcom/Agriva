"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  en: {
    "hero.title1": "Smarter Decisions for a",
    "hero.title2": "Better Harvest.",
    "hero.subtitle": "Your personal AI Copilot. Get real-time answers on crop selection, predictive weather risks, and the exact window to sell for maximum profit.",
    "hero.cta": "Launch Copilot",
    "features.title": "Powerful Features",
    "nav.features": "Features",
    "nav.howItWorks": "How it Works",
    "nav.schemes": "Govt Support"
  },
  hi: {
    "hero.title1": "एक के लिए स्मार्ट निर्णय",
    "hero.title2": "बेहतर फसल।",
    "hero.subtitle": "आपका व्यक्तिगत AI कोपायलट। फसल चयन, मौसम के जोखिम और अधिकतम लाभ के लिए वास्तविक समय में उत्तर प्राप्त करें।",
    "hero.cta": "कोपायलट लॉन्च करें",
    "features.title": "शक्तिशाली विशेषताएं",
    "nav.features": "विशेषताएं",
    "nav.howItWorks": "यह कैसे काम करता है",
    "nav.schemes": "सरकारी योजनाएं"
  },
  te: {
    "hero.title1": "మెరుగైన పంట కోసం",
    "hero.title2": "తెలివైన నిర్ణయాలు.",
    "hero.subtitle": "మీ వ్యక్తిగత AI కోపైలట్. పంట ఎంపిక, వాతావరణ హెచ్చరికలు మరియు లాభాల కోసం ఖచ్చితమైన సమయాన్ని పొందండి.",
    "hero.cta": "కోపైలట్ ప్రారంభించండి",
    "features.title": "శక్తివంతమైన ఫీచర్లు",
    "nav.features": "ఫీచర్లు",
    "nav.howItWorks": "ఎలా పనిచేస్తుంది",
    "nav.schemes": "ప్రభుత్వ మద్దతు"
  },
  mr: {
    "hero.title1": "च्यासाठी स्मार्ट निर्णय",
    "hero.title2": "चांगली कापणी.",
    "hero.subtitle": "तुमचा वैयक्तिक AI कोपायलट. पीक निवड आणि जास्तीत जास्त नफ्यासाठी रिअल-टाइम उत्तरे मिळवा.",
    "hero.cta": "कोपायलट लाँच करा",
    "features.title": "शक्तिशाली वैशिष्ट्ये",
    "nav.features": "वैशिष्ट्ये",
    "nav.howItWorks": "हे कसे कार्य करते",
    "nav.schemes": "शासकीय मदत"
  },
  ta: {
    "hero.title1": "ஒரு சிறந்த அறுவடைக்கான",
    "hero.title2": "புத்திசாலித்தனமான முடிவுகள்.",
    "hero.subtitle": "உங்கள் AI Copilot. பயிர் தேர்வு மற்றும் அதிகபட்ச லாபத்திற்கான நேரத்தை நிகழ்நேரத்தில் பெறுங்கள்.",
    "hero.cta": "Copilot ஐத் தொடங்கவும்",
    "features.title": "சக்திவாய்ந்த அம்சங்கள்",
    "nav.features": "அம்சங்கள்",
    "nav.howItWorks": "எப்படி வேலை செய்கிறது",
    "nav.schemes": "அரசு ஆதரவு"
  }
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const savedCode = localStorage.getItem("agribrain_lang")
    if (savedCode && translations[savedCode]) {
      setLanguage(savedCode)
    }
  }, [])

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("agribrain_lang", lang)
  }

  const t = (key: string) => {
    return translations[language]?.[key] || translations["en"]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

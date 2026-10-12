'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  ShieldAlert,
  Bot,
  User,
  Globe,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { apiGateway } from '../../lib/api';
import { EducatorMessage } from '../../lib/types';
import { TRANSLATIONS } from '../../lib/i18n';

export default function ChatEducator() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams ? searchParams.get('q') : null;

  const language = useGameStore((state) => state.language);
  const setLanguage = useGameStore((state) => state.setLanguage);

  const t = TRANSLATIONS[language];
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const idCounterRef = useRef(1);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<EducatorMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते! मैं आपका बहुभाषी वित्तीय साक्षरता सहायक "अर्थ" हूँ। अपने पोर्टफोलियो ओवरलैप, REITs, InvITs या बॉन्ड्स के बारे में पूछें।\n\nमहत्वपूर्ण: सेबी (निवेश सलाहकार) विनियमों के अनुसार, यह मंच केवल वित्तीय शिक्षा प्रदान करता है, कोई खरीद/बिक्री सलाह नहीं।'
          : language === 'mr'
          ? 'नमस्कार! मी तुमचा बहुभाषिक वित्तीय साक्षरता सहाय्यक "अर्थ" आहे. तुमच्या पोर्टफोलिओमधील ओव्हरलॅप, REITs, InvITs किंवा रोख्यांबद्दल विचारा.\n\nमहत्त्वाची नोंद: SEBI नियमांनुसार, हे व्यासपीठ केवळ संकल्पना स्पष्ट करते, थेट गुंतवणूक सल्ला देत नाही.'
          : 'Hello! I am Artha, your institutional wealth literacy educator. Ask me about your underlying portfolio overlaps, REIT rental yields, bond duration, or multi-asset diversification.\n\nCompliance Notice: Under SEBI (Investment Advisers) Regulations, 2013, all responses are strictly educational and non-advisory.',
      timestamp: '10:00 AM',
      language,
      citation: 'SEBI Investor Education and Financial Literacy Framework',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = useCallback(
    async (queryText?: string) => {
      const query = (queryText || inputQuery).trim();
      if (!query) return;

      setInputQuery('');

      const userMsg: EducatorMessage = {
        id: `user-${idCounterRef.current++}`,
        sender: 'user',
        text: query,
        timestamp: 'Just now',
        language,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      const response = await apiGateway.postEducatorAsk({
        query,
        language,
      });

      setIsTyping(false);

      const assistantMsg: EducatorMessage = {
        id: `bot-${idCounterRef.current++}`,
        sender: 'assistant',
        text: response.answer,
        timestamp: 'Just now',
        isGuardrailTriggered: response.isGuardrailTriggered,
        guardrailNote: response.guardrailNote,
        citation: response.citation,
        language,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    },
    [inputQuery, language]
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      const timer = setTimeout(() => {
        handleSend(initialQuery);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [initialQuery, handleSend]);

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 flex flex-col h-[780px] relative">
      {/* Ambient background glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Header Card */}
      <div className="relative bg-[#131316] border border-white/5 rounded-2xl p-5 mb-4 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold text-white tracking-tight">
                {t.sections.assistant.title}
              </h2>
              <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                SEBI Guardrails Active
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {t.sections.assistant.subtitle}
            </p>
          </div>
        </div>

        {/* Language Selection Buttons */}
        <div className="flex items-center gap-1 bg-[#0a0a0c] p-1 rounded-full border border-white/5">
          <Globe className="w-3.5 h-3.5 text-zinc-400 ml-2 mr-1" />
          {(['en', 'hi', 'mr'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                language === lang
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestion Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none mb-2">
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Suggested:
        </span>
        {t.sections.assistant.promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="text-xs text-zinc-300 hover:text-white bg-[#131316] hover:bg-[#1a1a1f] border border-white/5 hover:border-cyan-500/40 px-3.5 py-1.5 rounded-full shrink-0 transition"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 bg-[#0a0a0c] border border-white/5 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            )}

            <div
              className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-tr-sm font-medium shadow-blue-500/15'
                  : msg.isGuardrailTriggered
                  ? 'bg-rose-950/20 border border-rose-500/30 text-zinc-200 rounded-tl-sm'
                  : 'bg-[#131316] border border-white/5 text-zinc-200 rounded-tl-sm'
              }`}
            >
              {/* Guardrail Alert Header */}
              {msg.isGuardrailTriggered && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-2.5 pb-2 border-b border-rose-500/30">
                  <span className="p-1 rounded-full bg-rose-500/20">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  </span>
                  <span>SEBI-Aligned Advisory Intercept Triggered</span>
                </div>
              )}

              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Regulatory Citation */}
              {msg.citation && (
                <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span className="font-mono text-zinc-400">Reference: {msg.citation}</span>
                  <span className="text-zinc-500 font-mono">{msg.timestamp}</span>
                </div>
              )}

              {/* Mandatory Educational Disclaimer */}
              {msg.sender === 'assistant' && (
                <div className="mt-2.5 text-[10px] text-amber-400/90 flex items-center gap-1.5 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Educational look-through intelligence • Non-advisory</span>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-[#18181b] border border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <User className="w-4 h-4 text-zinc-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="bg-[#131316] border border-white/5 rounded-2xl px-4 py-2.5 text-xs text-cyan-300 flex items-center gap-2.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Analyzing portfolio context and applying SEBI compliance rules...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="mt-3 bg-[#131316] border border-white/5 rounded-full p-1.5 pl-5 flex items-center gap-2 shadow-xl focus-within:border-cyan-500/40 transition">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.sections.assistant.inputPlaceholder}
          className="flex-1 bg-transparent py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-blue-500/25 shrink-0"
        >
          <span>{t.sections.assistant.sendBtn}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

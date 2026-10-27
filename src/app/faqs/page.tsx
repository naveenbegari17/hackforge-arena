'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Search,
  Trophy,
  Users2,
  ShieldCheck,
  Cpu,
  BookOpen
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General & Simulator',
    question: 'What is HACKFORGE ARENA and who is it designed for?',
    answer: 'HACKFORGE ARENA is an AI-powered competition preparation and simulator platform designed for engineering students preparing to compete in college hackathons, national innovation competitions (e.g. Smart India Hackathon / SIH), and global developer challenges. It guides you from problem discovery and MVP prioritization to live technical defense before ruthless AI judges.'
  },
  {
    id: 'faq-2',
    category: 'General & Simulator',
    question: 'Does this guarantee a hackathon victory?',
    answer: 'No. HACKFORGE ARENA does not promise guaranteed victories. Instead, it focuses on developing demonstrable skills, architectural discipline, evidence-based pitching, and defense composure under high-pressure scenarios.'
  },
  {
    id: 'faq-3',
    category: 'AI Jury Room',
    question: 'How do the 10 AI Judge personas differ in their questioning?',
    answer: 'Each judge persona has distinct evaluation priorities and questioning strictness. For example, Dr. Aris Thorne (Technical Architect) focuses on database indexing, race conditions, and failover latency. Marcus Sterling (Ruthless Judge) cuts through slides and demands live code or network inspector proof. Vikram Sethi (Security CISO) probes prompt injection, sanitization, and API secret leaks.'
  },
  {
    id: 'faq-4',
    category: 'AI Jury Room',
    question: 'Do I need an OpenAI or Gemini API key to use the Jury Room?',
    answer: 'No! HACKFORGE ARENA features a High-Fidelity Deterministic Evaluation Engine that runs completely offline with zero API keys. If you do provide a Google Gemini API key in Settings, the platform seamlessly upgrades to live generative multi-turn cross-examination.'
  },
  {
    id: 'faq-5',
    category: 'Competition Arena',
    question: 'What is Pressure Mode in the Competition Arena?',
    answer: 'Pressure Mode introduces unexpected mid-event disruptions common in real hackathons—such as a critical third-party API crashing with HTTP 503, database connectivity dropouts, or sudden scope cuts. You are challenged to implement circuit breakers, in-memory fallbacks, and defend your architectural resiliency.'
  },
  {
    id: 'faq-6',
    category: 'Project Studio & Technical Lab',
    question: 'Does the Technical Lab execute untrusted user code on the server?',
    answer: 'No. To maintain software security standards, the Technical Lab uses secure static code inspection, regex pattern guards, and deterministic contract tests without executing untrusted arbitrary code strings on the backend.'
  },
  {
    id: 'faq-7',
    category: 'Pitch Arena',
    question: 'How does the Pitch Arena evaluate my pitch delivery?',
    answer: 'The Pitch Arena analyzes your pitch text across 5 criteria (Hook & Metric, Problem Clarity, Solution Value, Live Demo Proof, and Differentiation), calculates your spoken delivery pace in Words-Per-Minute (target: 130–150 WPM), flags vague buzzwords, and provides sentence-level upgrade suggestions.'
  },
  {
    id: 'faq-8',
    category: 'Scoring & Progression',
    question: 'How is the Competition Readiness Score calculated?',
    answer: 'Your Readiness Score (0–100) is a weighted composite of your performance across 10 skill vectors: Problem-solving, Innovation, Technical Execution, Product Thinking, Pitching, Teamwork, Time Management, Technical Defense, Security & AI, and Adaptability. Scores remain provisional until at least 5 attempts are recorded.'
  }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-3': true });
  const [search, setSearch] = useState<string>('');

  const categories = ['All', 'General & Simulator', 'AI Jury Room', 'Competition Arena', 'Pitch Arena', 'Project Studio & Technical Lab', 'Scoring & Progression'];

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFAQs = FAQS_DATA.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="border-b border-[#1E293B] pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>Knowledge & Help Base</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Frequently Asked Questions (FAQs)</h1>
        <p className="text-slate-400 text-xs mt-1">
          Everything you need to know about simulations, judge personas, rubrics, and offline demo mode.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (e.g. pressure mode, judge personas, api key)..."
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-[#0F172A] text-slate-400 hover:text-white border border-[#1E293B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-3">
        {filteredFAQs.map((faq) => {
          const isOpen = openIds[faq.id];

          return (
            <div
              key={faq.id}
              className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#111827]/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 shrink-0">
                    {faq.category}
                  </span>
                  <span className="text-sm font-bold text-slate-100">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-purple-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-[#1E293B]/60 pt-3 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filteredFAQs.length === 0 && (
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-8 text-center text-xs text-slate-400">
            No FAQs matching your query. Try searching for a different keyword.
          </div>
        )}
      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldAlert,
  Users2,
  Bot
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TranslationTemplate {
  category: string;
  original: string;
  framework: 'PREP (Point-Reason-Example-Point)' | 'STAR (Situation-Task-Action-Result)' | 'Executive Summary' | 'Humility-Mitigation';
  audience: 'Non-Technical Judge' | 'Senior Architect' | 'Frustrated Teammate' | 'Angel Investor';
}

const TEMPLATES: TranslationTemplate[] = [
  {
    category: 'Jury Defense',
    original: 'We used SQLite and an in-memory queue because it was fast, but it might break if 10,000 people spam it at once.',
    framework: 'Humility-Mitigation',
    audience: 'Senior Architect'
  },
  {
    category: 'Non-Tech Explanation',
    original: 'Our pipeline leverages geospatial DBSCAN clustering over latitude-longitude delta vectors with WebSocket pub/sub.',
    framework: 'PREP (Point-Reason-Example-Point)',
    audience: 'Non-Technical Judge'
  },
  {
    category: 'Team De-escalation',
    original: 'Why did you change the API to GraphQL at 3 AM? Now none of my fetch requests work and we are going to lose.',
    framework: 'STAR (Situation-Task-Action-Result)',
    audience: 'Frustrated Teammate'
  },
  {
    category: 'Investor Pitch',
    original: 'We built an app that helps students report broken stuff in college so the college saves some money.',
    framework: 'Executive Summary',
    audience: 'Angel Investor'
  }
];

export default function CommunicationCoachPage() {
  const { updateSkillScore } = useApp();

  const [inputStatement, setInputStatement] = useState<string>(
    'Our pipeline leverages geospatial DBSCAN clustering over latitude-longitude delta vectors with WebSocket pub/sub.'
  );
  const [targetAudience, setTargetAudience] = useState<'Non-Technical Judge' | 'Senior Architect' | 'Frustrated Teammate' | 'Angel Investor'>('Non-Technical Judge');
  const [selectedFramework, setSelectedFramework] = useState<string>('PREP (Point-Reason-Example-Point)');
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<{
    clarityScore: number;
    concisenessScore: number;
    persuasivenessScore: number;
    improvedVersion: string;
    critique: string;
    jargonDetected: string[];
    audienceAlignment: string;
  } | null>(null);

  const handleTranslate = () => {
    setAnalyzing(true);

    const words = inputStatement.trim().split(/\s+/).filter(Boolean);
    const lower = inputStatement.toLowerCase();

    // Heuristic jargon detection
    const detectedJargon: string[] = [];
    const technicalTerms = ['dbscan', 'geospatial', 'websocket', 'pub/sub', 'vectors', 'sqlite', 'graphql', 'latency', 'concurrency', 'sharding', 'indexes'];
    technicalTerms.forEach((term) => {
      if (lower.includes(term)) detectedJargon.push(term);
    });

    let improved = '';
    let critique = '';
    let clarity = 75;
    let conciseness = 80;
    let persuasiveness = 85;

    if (targetAudience === 'Non-Technical Judge') {
      if (detectedJargon.length > 0) {
        clarity = 60;
        critique = `Your original statement relied heavily on engineering jargon (${detectedJargon.join(', ')}). Non-technical stakeholders cannot evaluate algorithm names; they evaluate the human outcome.`;
      } else {
        critique = 'Clear, relatable phrasing that any university dean or civic leader can immediately visualize.';
      }
      improved = `Instead of forcing facilities staff to read through 50 individual student complaints for the same leaking pipe, our system automatically groups nearby reports into one prioritized ticket within seconds. Think of it like a smart filter that stops technician phone spam.`;
    } else if (targetAudience === 'Senior Architect') {
      critique = 'Architects appreciate structural humility: explicitly acknowledge your current 24-hour prototype boundary before stating the production scaling plan.';
      clarity = 90;
      conciseness = 88;
      persuasiveness = 92;
      improved = `For our 24-hour prototype, we chose a lightweight in-memory queue backed by SQLite to minimize external failure points during the live demo. In Phase 2 at 10k users, we would decouple writes through a distributed Redis buffer with optimistic concurrency control.`;
    } else if (targetAudience === 'Frustrated Teammate') {
      critique = 'Replaced accusatory "You" language with objective problem focus and collaborative triage.';
      clarity = 85;
      conciseness = 90;
      persuasiveness = 88;
      improved = `I see the GraphQL update broke our 12 frontend component queries. We have 4 hours until submission. Let's write a simple 20-line REST adapter route right now so the existing UI runs, and we can discuss the pure GraphQL benefits after we submit.`;
    } else {
      critique = 'Framed with concrete operational metrics ($ saved, response time compression) that address customer ROI.';
      clarity = 92;
      conciseness = 95;
      persuasiveness = 94;
      improved = `Campus LeakWatch cuts facility water losses by 65% and reduces response time from 4 days to 28 minutes, saving the average university $24,000 annually with zero new hardware investment.`;
    }

    setTimeout(() => {
      setResult({
        clarityScore: clarity,
        concisenessScore: conciseness,
        persuasivenessScore: persuasiveness,
        improvedVersion: improved,
        critique,
        jargonDetected: detectedJargon,
        audienceAlignment: `Tailored specifically for ${targetAudience} using the ${selectedFramework} structure.`
      });
      setAnalyzing(false);
      updateSkillScore('Pitching & Storytelling', 2);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Communication & Translation Coach</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Engineering Communication Coach</h1>
          <p className="text-slate-400 text-xs mt-1">
            Translate complex technical concepts into persuasive, jargon-free explanations for judges, teammates, and investors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Input & Audience Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-3">
              <span className="text-xs font-bold text-white">Your Technical Statement or Defense</span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Target Audience:</span>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="bg-[#111827] border border-[#1E293B] text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-purple-500 font-semibold"
                >
                  <option value="Non-Technical Judge">Non-Technical Judge</option>
                  <option value="Senior Architect">Senior Architect / Principal Engineer</option>
                  <option value="Frustrated Teammate">Frustrated Teammate (Crisis De-escalation)</option>
                  <option value="Angel Investor">Angel Investor / Business Judge</option>
                </select>
              </div>
            </div>

            <textarea
              rows={4}
              value={inputStatement}
              onChange={(e) => setInputStatement(e.target.value)}
              placeholder="Paste what you plan to say or explain..."
              className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-purple-500"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Structure Framework:</span>
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value)}
                  className="bg-[#111827] border border-[#1E293B] text-slate-300 rounded-lg px-2.5 py-1 text-xs"
                >
                  <option value="PREP (Point-Reason-Example-Point)">PREP (Point-Reason-Example-Point)</option>
                  <option value="STAR (Situation-Task-Action-Result)">STAR (Situation-Task-Action-Result)</option>
                  <option value="Executive Summary">Executive Summary ($ ROI & Impact)</option>
                  <option value="Humility-Mitigation">Humility-Mitigation (Tradeoff Formula)</option>
                </select>
              </div>

              <button
                onClick={handleTranslate}
                disabled={analyzing || !inputStatement.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{analyzing ? 'Analyzing Communication...' : 'Polish & Translate'}</span>
              </button>
            </div>
          </div>

          {/* Translation Result Card */}
          {result && (
            <div className="bg-[#0F172A] border border-purple-800/40 rounded-2xl p-6 md:p-8 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-purple-400">Polished Delivery</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">High-Impact Communication Version</h3>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-purple-950 text-purple-300 text-xs font-bold border border-purple-800">
                    Clarity: {result.clarityScore}%
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-800">
                    Persuasiveness: {result.persuasivenessScore}%
                  </span>
                </div>
              </div>

              {/* Upgraded text */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/50 space-y-2">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block tracking-wider">
                  Say This Instead:
                </span>
                <p className="text-sm text-slate-100 font-medium leading-relaxed">
                  "{result.improvedVersion}"
                </p>
              </div>

              {/* Critique */}
              <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-slate-300 block">Coach Analysis:</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">{result.critique}</p>

                {result.jargonDetected.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-amber-400 font-semibold">Jargon flagged for this audience:</span>
                    {result.jargonDetected.map((j, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] border border-amber-800">
                        {j}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Preset Scenarios */}
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-white mb-2">Practice Scenarios</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click any scenario to practice translating common hackathon communication traps:
            </p>
            <div className="space-y-2.5 pt-2">
              {TEMPLATES.map((t, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setInputStatement(t.original);
                    setTargetAudience(t.audience);
                    setSelectedFramework(t.framework);
                  }}
                  className="p-3 rounded-xl bg-[#111827] border border-slate-800 hover:border-purple-500/50 cursor-pointer text-xs transition-all"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-purple-400 uppercase">{t.category}</span>
                    <span className="text-[10px] text-slate-500">{t.audience}</span>
                  </div>
                  <p className="text-slate-300 truncate font-medium">"{t.original}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


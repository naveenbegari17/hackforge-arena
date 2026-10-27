'use client';

import React, { useState } from 'react';
import {
  Mic2,
  Sparkles,
  Send,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PitchAttempt } from '@/types';

export default function PitchArenaPage() {
  const { project, updateSkillScore } = useApp();

  const [pitchFormat, setPitchFormat] = useState<PitchAttempt['format']>('3m_competition');
  const [pitchText, setPitchText] = useState<string>(
    `Every single month, our university campus loses over 180,000 gallons of clean water due to hidden basement pipe leaks that take an average of 4.2 days to report. Facilities staff are blind, relying on delayed student emails.\n\nWe built Campus LeakWatch Sentinel: a crowd-verified triage portal with 50-meter proximity clustering. When a student snaps a photo, our system instantly checks if an incident already exists within 50 meters to prevent duplicate clutter. The facilities manager gets an auto-prioritized dashboard showing severity and immediate room location.\n\nIn our live demo, watch as two simultaneous reports from the basement are merged in 140ms and dispatched to technician John's phone with zero duplicate notification spam. Unlike static ticketing forms, our proximity clustering cuts response time from 4 days to 28 minutes.`
  );

  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<PitchAttempt | null>(null);

  const handleEvaluate = () => {
    setEvaluating(true);

    const words = pitchText.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const lower = pitchText.toLowerCase();

    // Check delivery pace (standard spoken pace is 130-150 words per minute)
    let estimatedMinutes = 3;
    if (pitchFormat === '30s_elevator') estimatedMinutes = 0.5;
    if (pitchFormat === '60s_idea') estimatedMinutes = 1;
    if (pitchFormat === '5m_technical') estimatedMinutes = 5;

    const wpm = Math.round(wordCount / estimatedMinutes);

    // Analyze specific pitch anchors
    const hasHookMetric = /\d+/.test(pitchText);
    const hasClearProblem = lower.includes('problem') || lower.includes('loses') || lower.includes('wasting') || lower.includes('delay');
    const hasLiveDemo = lower.includes('demo') || lower.includes('watch') || lower.includes('click') || lower.includes('see');
    const hasDifferentiation = lower.includes('unlike') || lower.includes('instead of') || lower.includes('compared to');

    const hookScore = hasHookMetric ? 90 : 65;
    const problemScore = hasClearProblem ? 88 : 70;
    const solutionScore = 85;
    const demoScore = hasLiveDemo ? 92 : 60;
    const differentiationScore = hasDifferentiation ? 88 : 55;

    const overall = Math.round((hookScore + problemScore + solutionScore + demoScore + differentiationScore) / 5);

    const vagueClaims: string[] = [];
    if (lower.includes('revolutionary') || lower.includes('game-changing')) {
      vagueClaims.push('Hyperbolic buzzwords ("revolutionary / game-changing") reduce technical credibility.');
    }
    if (lower.includes('100%')) {
      vagueClaims.push('Absolutist metric ("100%") without experimental confidence interval.');
    }

    const sentenceImprovements = [
      {
        original: 'Facilities staff are blind, relying on delayed student emails.',
        suggested: 'Campus facilities engineers currently waste 14 technician-hours weekly chasing unverified duplicate tickets.',
        reason: 'Quantifying the wasted operational cost sharpens the financial impact for business judges.'
      }
    ];

    const toughQuestions = [
      'What specific incentive makes a student stop and submit a report if they are late to class?',
      'How does your 50-meter GPS proximity clustering behave indoors where satellite signal degrades by 80%?'
    ];

    const attempt: PitchAttempt = {
      id: `pitch-${Date.now()}`,
      userId: 'usr-student-01',
      projectId: project.id,
      format: pitchFormat,
      pitchText,
      hookScore,
      problemScore,
      solutionScore,
      demoScore,
      differentiationScore,
      overallScore: overall,
      wordCount,
      deliveryPaceWPM: wpm,
      vagueClaims,
      sentenceImprovements,
      toughQuestions,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setResult(attempt);
      setEvaluating(false);
      updateSkillScore('Pitching & Storytelling', overall >= 80 ? 3 : 1);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Mic2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Pitch Arena</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Pitch & Presentation Rehearsal</h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time delivery cadence analysis, buzzword filtering, and sentence-level polish suggestions.
          </p>
        </div>

        {/* Format Selector */}
        <select
          value={pitchFormat}
          onChange={(e) => setPitchFormat(e.target.value as any)}
          className="bg-[#111827] border border-[#1E293B] text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
        >
          <option value="30s_elevator">30-Second Elevator Pitch (~75 words)</option>
          <option value="60s_idea">60-Second Idea Pitch (~140 words)</option>
          <option value="3m_competition">3-Minute Competition Pitch (~400 words)</option>
          <option value="5m_technical">5-Minute Technical Defense (~650 words)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Pitch Editor & Structure Guide */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <span className="text-xs font-bold text-white">Draft Pitch Script</span>
              <span className="text-xs text-cyan-400 font-mono">
                {pitchText.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              rows={10}
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
              placeholder="Structure: 1. Hook with metric -> 2. Visceral pain -> 3. Solution -> 4. Live demo walkthrough -> 5. Differentiator..."
              className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-4 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-purple-500 font-sans"
            />

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setPitchText('')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
              <button
                onClick={handleEvaluate}
                disabled={evaluating || !pitchText.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{evaluating ? 'Analyzing Cadence & Claims...' : 'Evaluate Pitch Delivery'}</span>
              </button>
            </div>
          </div>

          {/* Evaluation Results Card */}
          {result && (
            <div className="bg-[#0F172A] border border-purple-800/40 rounded-2xl p-6 md:p-8 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-purple-400">Delivery Diagnostics</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">Pitch Evaluation Report</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Overall Score</span>
                  <span className="text-3xl font-black text-cyan-300">{result.overallScore}<span className="text-base text-slate-500 font-normal">/100</span></span>
                </div>
              </div>

              {/* Sub-scores */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Hook & Metric</span>
                  <span className="text-base font-bold text-white mt-1 block">{result.hookScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Problem Clarity</span>
                  <span className="text-base font-bold text-white mt-1 block">{result.problemScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Solution Value</span>
                  <span className="text-base font-bold text-white mt-1 block">{result.solutionScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Live Demo Proof</span>
                  <span className="text-base font-bold text-white mt-1 block">{result.demoScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#111827] border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block">Differentiation</span>
                  <span className="text-base font-bold text-white mt-1 block">{result.differentiationScore}%</span>
                </div>
              </div>

              {/* Delivery Cadence */}
              <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-300">Estimated Delivery Pace:</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Target: 130-150 words/min. Your draft is <strong>{result.deliveryPaceWPM} WPM</strong>.
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase ${
                  result.deliveryPaceWPM >= 120 && result.deliveryPaceWPM <= 160
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {result.deliveryPaceWPM >= 120 && result.deliveryPaceWPM <= 160 ? 'Optimal Cadence' : 'Pace Needs Adjustment'}
                </span>
              </div>

              {/* Sentence Polish */}
              {result.sentenceImprovements.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-purple-300 block">Sentence-Level Upgrade Suggestion:</span>
                  {result.sentenceImprovements.map((imp, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#111827] border border-purple-900/30 text-xs space-y-1.5">
                      <p className="text-rose-400 line-through text-[11px]">"{imp.original}"</p>
                      <p className="text-emerald-300 font-semibold text-[11px]">"{imp.suggested}"</p>
                      <p className="text-slate-400 text-[10px] italic">Why: {imp.reason}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tough Audience Q&A Preview */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-2 text-xs">
                <span className="font-bold text-purple-400 block">Tough Follow-up Questions from the Jury:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {result.toughQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: 10-Point Winning Pitch Structure */}
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-3">10-Point Pitch Formula</h3>
            <div className="space-y-2 text-xs">
              {[
                { step: '1. The Hook', desc: 'A shocking quantifiable metric, not "Have you ever wondered?"' },
                { step: '2. The Pain', desc: 'Visceral human problem experienced by a distinct user.' },
                { step: '3. Current Alternative Failure', desc: 'Why existing tools or manual workarounds fail.' },
                { step: '4. The Solution', desc: 'Your 1-sentence value proposition.' },
                { step: '5. The Live Demo', desc: 'Show the core transaction proving the claim.' },
                { step: '6. Technical Depth', desc: 'Architecture, APIs, and resiliency.' },
                { step: '7. Differentiation', desc: 'Why a basic Airtable or Google script cannot do this.' },
                { step: '8. Unit Economics & Impact', desc: 'Measurable dollar, carbon, or time savings.' },
                { step: '9. Known Limitations', desc: 'Honest constraints and Phase 2 roadmap.' },
                { step: '10. The Closing Ask', desc: 'Memorable summary of societal impact.' }
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#111827] border border-slate-800">
                  <p className="font-bold text-slate-200">{item.step}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


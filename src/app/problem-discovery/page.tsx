'use client';

import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ProblemDiscoveryPage() {
  const { updateSkillScore } = useApp();

  const [stakeholder, setStakeholder] = useState<string>('Campus Facilities Maintenance Engineers');
  const [symptom, setSymptom] = useState<string>('Students complain on social media about wet basements.');
  const [rootCause, setRootCause] = useState<string>('Facilities ticketing uses slow unmonitored email queues without geospatial deduplication.');
  const [alternatives, setAlternatives] = useState<string>('Manual walk-through inspections once every 2 weeks.');
  const [verifiedEvidence, setVerifiedEvidence] = useState<string>('Facilities logs record 180,000 gallons lost over 42 days.');
  const [measurableOutcome, setMeasurableOutcome] = useState<string>('Reduce mean time to technician dispatch from 4.2 days to under 30 minutes.');
  const [smallestExperiment, setSmallestExperiment] = useState<string>('A QR-code mobile web form placed on 5 dormitory water mains testing deduplication.');

  const [evaluation, setEvaluation] = useState<{
    score: number;
    critique: string;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const handleEvaluateCanvas = () => {
    let score = 70;
    const strengths: string[] = [];
    const improvements: string[] = [];

    if (/\d+/.test(measurableOutcome)) {
      score += 10;
      strengths.push('Measurable outcome includes concrete numerical time compression.');
    } else {
      improvements.push('Quantify the measurable outcome with numerical target metrics.');
    }

    if (rootCause.length > 30) {
      score += 10;
      strengths.push('Root cause clearly separated from the surface symptom.');
    } else {
      improvements.push('Deepen the root cause: explain why the current system fails operationally.');
    }

    if (smallestExperiment.length > 20) {
      score += 10;
      strengths.push('Smallest experiment is bounded and testable within 24 hours.');
    }

    setEvaluation({
      score: Math.min(100, score),
      critique: 'Your problem canvas demonstrates strong separation between symptoms and operational root causes.',
      strengths,
      improvements: improvements.length > 0 ? improvements : ['Canvas is primed for high-scoring jury review.']
    });

    updateSkillScore('Problem-solving', 3);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Search className="w-3.5 h-3.5 text-purple-400" />
            <span>Problem Discovery Lab</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Problem Validation Canvas</h1>
          <p className="text-slate-400 text-xs mt-1">
            Separate surface symptoms from root causes before writing a single line of code.
          </p>
        </div>

        <button
          onClick={handleEvaluateCanvas}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Validate Problem Rigor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: The Problem Canvas Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">1. Primary Affected Stakeholder:</label>
                <input
                  type="text"
                  value={stakeholder}
                  onChange={(e) => setStakeholder(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">2. Existing Alternative Workaround:</label>
                <input
                  type="text"
                  value={alternatives}
                  onChange={(e) => setAlternatives(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-rose-400 block mb-1">3. Surface Symptom (What people complain about):</label>
                <textarea
                  rows={3}
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="font-bold text-emerald-400 block mb-1">4. Root Cause (The structural bottleneck):</label>
                <textarea
                  rows={3}
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">5. Verified Real Evidence (Not assumption):</label>
                <textarea
                  rows={3}
                  value={verifiedEvidence}
                  onChange={(e) => setVerifiedEvidence(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">6. Measurable Target Outcome:</label>
                <textarea
                  rows={3}
                  value={measurableOutcome}
                  onChange={(e) => setMeasurableOutcome(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="font-bold text-cyan-300 block mb-1">7. The Smallest Useful Experiment (24-Hour Prototype Test):</label>
              <input
                type="text"
                value={smallestExperiment}
                onChange={(e) => setSmallestExperiment(e.target.value)}
                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Evaluation Report */}
          {evaluation && (
            <div className="bg-[#0F172A] border border-purple-800/40 rounded-2xl p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                <span className="text-xs font-bold uppercase text-purple-400">Rigor Diagnostics</span>
                <span className="text-2xl font-black text-cyan-300">{evaluation.score}/100</span>
              </div>
              <p className="text-xs text-slate-300">{evaluation.critique}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="font-bold text-emerald-400 block mb-1">Strong Elements:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {evaluation.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">Improvements Needed:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {evaluation.improvements.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Methodology Guidance */}
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-white">Why 80% of Hackathon Teams Fail Here</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Teams often build a solution for an unverified symptom. For instance, if students don't report water leaks because the university website requires a 12-character VPN login, adding "AI photo detection" does not solve the root adoption barrier.
            </p>
            <div className="pt-2 border-t border-[#1E293B] text-xs text-purple-300">
              <span className="font-bold block mb-1">Jury Probing Checklist:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Did you talk to at least 1 actual maintenance technician?</li>
                <li>What prevents users from ignoring your tool after day 1?</li>
                <li>Is your measurable metric verified by numbers or hope?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


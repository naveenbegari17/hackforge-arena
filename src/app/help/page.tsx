'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Trophy,
  Users2,
  KanbanSquare,
  Mic2,
  Cpu,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="border-b border-[#1E293B] pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span>Documentation & Guide</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">How HackForge Arena Works</h1>
        <p className="text-slate-400 text-xs mt-1">
          Train Like a Beginner. Compete Like a Champion. Complete operational guide for hackathon preparation.
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        {/* Section 1 */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span>1. The Core Competition Arena</span>
          </h2>
          <p>
            The Competition Arena simulates an authentic collegiate or national hackathon lifecycle. It walks you through 17 explicit steps from problem scoping to final jury defense.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li><strong>Guided Practice:</strong> Unlimited hints and progressive checkpoints.</li>
            <li><strong>Realistic Mode:</strong> Time-bounded countdown clock with submission lock.</li>
            <li><strong>Pressure Mode:</strong> Mid-competition crisis injections (API failure, scope reduction).</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Users2 className="w-4 h-4 text-cyan-400" />
            <span>2. Surviving the AI Jury Room</span>
          </h2>
          <p>
            The AI Jury Room features 10 distinct judge personas ranging from Principal Distributed Systems Architects to Ruthless YC Alumni.
            They will aggressively probe:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Unsubstantiated claims (e.g. "Our system is 100% secure" or "Everyone will buy this").</li>
            <li>Superficial AI or Blockchain buzzwords without architectural depth.</li>
            <li>Faked or hardcoded mockups masquerading as live databases.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Mic2 className="w-4 h-4 text-emerald-400" />
            <span>3. Pitch Arena & Technical Lab</span>
          </h2>
          <p>
            Use the Pitch Arena to refine your 60-second or 3-minute delivery cadence. Our heuristic pace analyzer calculates words-per-minute (optimal is 130–150 WPM) and highlights sentence-level improvements.
          </p>
          <p className="mt-2">
            In the Technical Lab, practice implementing idempotency keys, prompt injection guardrails, and optimistic state rollbacks without needing external servers.
          </p>
        </div>
      </div>
    </div>
  );
}


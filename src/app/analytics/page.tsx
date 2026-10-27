'use client';

import React from 'react';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  Award,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AnalyticsPage() {
  const { user, skills, jurySessions } = useApp();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <LineChartIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>Data-Driven Performance Diagnostics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Competitor Analytics & Trajectory</h1>
          <p className="text-slate-400 text-xs mt-1">
            Track quantifiable improvement across 10 skill vectors, jury cross-examinations, and pitch evaluations.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
          <p className="text-xs text-slate-400">Competition Readiness</p>
          <p className="text-3xl font-black text-white mt-1">{user.readinessScore}<span className="text-sm text-slate-500 font-normal">/100</span></p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12 pts from baseline diagnostic</span>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
          <p className="text-xs text-slate-400">Total Simulation Attempts</p>
          <p className="text-3xl font-black text-cyan-300 mt-1">{user.completedSimulationsCount + 2}</p>
          <p className="text-xs text-slate-500 mt-3">Across 3 distinct scenario domains</p>
        </div>

        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
          <p className="text-xs text-slate-400">Recorded Jury Sessions</p>
          <p className="text-3xl font-black text-purple-400 mt-1">{jurySessions.length + 3}</p>
          <p className="text-xs text-slate-500 mt-3">Avg jury score: 72%</p>
        </div>

        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
          <p className="text-xs text-slate-400">Data Confidence Level</p>
          <p className="text-xl font-bold text-emerald-400 mt-2">Calibrated (84%)</p>
          <p className="text-xs text-slate-500 mt-3">2 provisional skill ratings remaining</p>
        </div>
      </div>

      {/* Deep-Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: 10-Skill Breakdown */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-[#1E293B] pb-4">
            <div>
              <h3 className="text-base font-bold text-white">10-Vector Skill Competency Matrix</h3>
              <p className="text-xs text-slate-400">Evaluated through multi-turn jury defense and code submissions</p>
            </div>
            <span className="text-xs text-slate-400">Provisional = Need 5+ attempts</span>
          </div>

          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{skill.name}</span>
                    {skill.isProvisional && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                        Provisional ({skill.attemptCount} tests)
                      </span>
                    )}
                  </div>
                  <span className={`font-bold font-mono ${
                    skill.score >= 75 ? 'text-emerald-400' : skill.score >= 60 ? 'text-cyan-400' : 'text-amber-400'
                  }`}>
                    {skill.score}%
                  </span>
                </div>
                <div className="w-full bg-[#111827] rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      skill.score >= 75 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                      skill.score >= 60 ? 'bg-gradient-to-r from-purple-500 to-cyan-400' :
                      'bg-gradient-to-r from-amber-500 to-rose-400'
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Personalized Remediation Plan */}
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>Personalized Remediation Plan</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your lowest-performing vectors, our diagnostic engine recommends these targeted interventions:
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#111827] border border-rose-900/40 space-y-1">
                <span className="font-bold text-rose-300 block">1. Technical Defense (55/100)</span>
                <p className="text-slate-400 text-[11px]">
                  Focus on articulating failover mechanisms. Complete 2 sessions in AI Jury Room with Dr. Aris Thorne.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111827] border border-amber-900/40 space-y-1">
                <span className="font-bold text-amber-300 block">2. Pitch Storytelling (58/100)</span>
                <p className="text-slate-400 text-[11px]">
                  Practice 60-second idea pitches. Remove 100% of generic adjectives and lead with verified problem numbers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111827] border border-cyan-900/40 space-y-1">
                <span className="font-bold text-cyan-300 block">3. Time Pressure (64/100)</span>
                <p className="text-slate-400 text-[11px]">
                  Simulate the 60-minute CodeRed API Meltdown scenario in the Competition Arena.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


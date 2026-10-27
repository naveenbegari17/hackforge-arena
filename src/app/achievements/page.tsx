'use client';

import React from 'react';
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AchievementsPage() {
  const { achievements, user } = useApp();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Progression & Ranks</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Skill Badges & Arena Badges</h1>
          <p className="text-slate-400 text-xs mt-1">
            Merit-based unlocks earned through real code submissions, jury survival, and time-pressure tests.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800 text-purple-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Current Rank: {user.currentRank}</span>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const isUnlocked = ach.progress === 100;

          return (
            <div
              key={ach.id}
              className={`bg-[#0F172A] border rounded-2xl p-6 space-y-4 relative overflow-hidden transition-all ${
                isUnlocked ? 'border-purple-800/60 shadow-lg shadow-purple-950/30' : 'border-[#1E293B] opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#111827] border border-slate-800 flex items-center justify-center text-2xl shadow">
                  {ach.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  isUnlocked
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isUnlocked ? 'Unlocked' : `${ach.progress}%`}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{ach.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ach.description}</p>
              </div>

              <div className="w-full bg-[#111827] rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isUnlocked ? 'bg-gradient-to-r from-purple-500 to-cyan-400' : 'bg-slate-700'
                  }`}
                  style={{ width: `${ach.progress}%` }}
                />
              </div>

              {ach.unlockedAt && (
                <p className="text-[10px] text-slate-500 font-mono">Unlocked: {ach.unlockedAt}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SEEDED_TEAM_SCENARIOS } from '@/data/seedData';
import { TeamScenario } from '@/types';

export default function TeamSimulatorPage() {
  const { updateSkillScore } = useApp();
  const scenarios = SEEDED_TEAM_SCENARIOS;
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0].id);
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null);

  const scenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];
  const chosenOption = scenario.options.find((o) => o.id === chosenOptionId);

  const handleSelectOption = (optId: string) => {
    setChosenOptionId(optId);
    const opt = scenario.options.find((o) => o.id === optId);
    if (opt) {
      const avg = Math.round(
        (opt.scores.communication + opt.scores.prioritization + opt.scores.conflictResolution + opt.scores.technicalSoundness) / 4
      );
      updateSkillScore('Teamwork & Crisis Resolution', avg >= 4 ? 3 : -2);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Team Collaboration Simulator</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Hackathon Crisis & Conflict Lab</h1>
          <p className="text-slate-400 text-xs mt-1">
            Simulate realistic team breakdowns: 3:00 AM API rewrites, feature creep ambushes, and burnout mediation.
          </p>
        </div>

        <select
          value={selectedScenarioId}
          onChange={(e) => {
            setSelectedScenarioId(e.target.value);
            setChosenOptionId(null);
          }}
          className="bg-[#111827] border border-[#1E293B] text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
        >
          {scenarios.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title} ({s.conflictCategory})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Crisis Context */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-400 block mb-1">
                  Involved Roles: {scenario.involvedRoles.join(' & ')}
                </span>
                <h2 className="text-xl font-bold text-white">{scenario.title}</h2>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-purple-950 text-purple-300 text-xs font-semibold">
                {scenario.conflictCategory}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              <p><strong>Situation:</strong> {scenario.context}</p>
              <p className="text-rose-300"><strong>The Incident:</strong> {scenario.incident}</p>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-white block">How do you lead the team through this decision?</span>
              {scenario.options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    chosenOptionId === opt.id
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg shadow-purple-950/50'
                      : 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="font-medium leading-relaxed">{opt.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome & Evaluation */}
          {chosenOption && (
            <div className="bg-[#0F172A] border border-purple-800/40 rounded-2xl p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                <span className="text-xs font-bold uppercase text-purple-400">Simulation Outcome</span>
                <div className="flex gap-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-semibold">
                    Comm: {chosenOption.scores.communication}/5
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                    Priority: {chosenOption.scores.prioritization}/5
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    Tech: {chosenOption.scores.technicalSoundness}/5
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">{chosenOption.outcome}</p>
            </div>
          )}
        </div>

        {/* Right: Teamwork Principles */}
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white">Hackathon Leadership Principles</h3>
            <p className="text-slate-300 leading-relaxed">
              Winning teams don't avoid conflict; they resolve it in under 15 minutes without passive-aggressive code refactors.
            </p>
            <div className="pt-2 border-t border-[#1E293B] space-y-2 text-slate-400 text-[11px]">
              <p>• <strong>Never rewrite functioning code</strong> after 2:00 AM.</p>
              <p>• <strong>Protect the demo transaction</strong> above individual technical ego.</p>
              <p>• <strong>Write adapters</strong> instead of forcing full-stack refactors near deadlines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


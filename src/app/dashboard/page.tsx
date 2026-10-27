'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  Zap,
  Target,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
  Sparkles,
  ChevronRight,
  Award,
  Users2,
  KanbanSquare,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function DashboardPage() {
  const { user, skills, project, scenarios, activeScenarioId } = useApp();

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Hero Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#0F172A] to-cyan-950/50 border border-purple-800/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Hackathon Competition Simulator</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{user.name}</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Your competition readiness is calibrated at <strong className="text-cyan-300">{user.readinessScore}/100</strong>.
              Review your weak points in Technical Defense before heading into the AI Jury Room.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/competition"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Trophy className="w-4 h-4" />
              <span>Resume Active Arena</span>
            </Link>
            <Link
              href="/jury-room"
              className="px-4 py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 font-medium text-sm border border-slate-700/60 flex items-center gap-1.5 transition-colors"
            >
              <Users2 className="w-4 h-4 text-purple-400" />
              <span>AI Jury</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Readiness Score Card */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400">Readiness Score</p>
              <p className="text-3xl font-black text-white mt-1">{user.readinessScore}<span className="text-base text-slate-500 font-normal">/100</span></p>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="text-emerald-400 font-semibold">+4 pts</span>
            <span className="text-slate-500">from last jury defense</span>
          </div>
        </div>

        {/* Current Rank Card */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400">Current Rank</p>
              <p className="text-xl font-bold text-cyan-300 mt-1.5">{user.currentRank}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-400">
            Next: <strong className="text-slate-200">Technical Defender</strong> (Score 75+)
          </div>
        </div>

        {/* Completed Simulations Card */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400">Simulations Completed</p>
              <p className="text-3xl font-black text-white mt-1">{user.completedSimulationsCount}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-400">
            <span>2 guided, 1 realistic completed</span>
          </div>
        </div>

        {/* Active Project Card */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-400">Active Studio Project</p>
              <p className="text-sm font-bold text-white mt-1.5 truncate max-w-[160px]">{project.name}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <KanbanSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">{project.tasks.filter(t => t.status === 'done').length}/{project.tasks.length} tasks done</span>
            <Link href="/project-studio" className="text-purple-400 hover:text-purple-300 font-medium">Open Studio &rarr;</Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Arena Spotlight + Skill Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Simulation Spotlight (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Active Simulation Track</h2>
                  <p className="text-xs text-slate-400">Realistic competition challenge in progress</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                {activeScenario.difficulty} Track
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">{activeScenario.title}</h3>
                <p className="text-xs text-cyan-400 mt-0.5">{activeScenario.category}</p>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeScenario.problemStatement}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#111827] rounded-xl p-3 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Duration</span>
                  </div>
                  <p className="text-sm font-semibold text-white mt-1">{activeScenario.durationMinutes} simulated mins</p>
                </div>
                <div className="bg-[#111827] rounded-xl p-3 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Users2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Team Size</span>
                  </div>
                  <p className="text-sm font-semibold text-white mt-1">{activeScenario.recommendedTeamSize} Competitors</p>
                </div>
                <div className="bg-[#111827] rounded-xl p-3 border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Key Deliverable</span>
                  </div>
                  <p className="text-xs font-semibold text-white mt-1 truncate">Working Triage MVP</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/competition"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <span>Enter Competition Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/jury-room"
                  className="px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Users2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Defend before Judges</span>
                </Link>
                <Link
                  href="/problem-discovery"
                  className="px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#1E293B] text-slate-300 font-medium text-xs border border-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>Validate Problem Canvas</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Recommended Next Activities */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Recommended Next Training Steps</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/jury-room"
                className="p-4 rounded-xl bg-[#111827] border border-purple-900/30 hover:border-purple-600 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800">
                    High Priority
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-slate-200 mt-2">Simulated AI Jury: Technical Defense</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Your Technical Defense score is 55/100. Practice defending database indexing and failover with Dr. Thorne.
                </p>
              </Link>

              <Link
                href="/pitch-arena"
                className="p-4 rounded-xl bg-[#111827] border border-cyan-900/30 hover:border-cyan-600 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
                    Pitch Arena
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-slate-200 mt-2">60-Second Idea Pitch Rehearsal</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Trim vague phrases and test your opening hook against our AI delivery pace analyzer.
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Skill Diagnostic & Weaknesses (1 col) */}
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 mb-4">
              <h3 className="text-sm font-bold text-white">Skill Matrix</h3>
              <Link href="/analytics" className="text-xs text-purple-400 hover:text-purple-300">Detailed View &rarr;</Link>
            </div>

            <div className="space-y-3.5">
              {skills.slice(0, 6).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-300 font-medium">{skill.name}</span>
                    <span className={`font-bold ${
                      skill.score >= 75 ? 'text-emerald-400' : skill.score >= 60 ? 'text-cyan-400' : 'text-amber-400'
                    }`}>
                      {skill.score}%
                    </span>
                  </div>
                  <div className="w-full bg-[#111827] rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.score >= 75 ? 'bg-emerald-500' : skill.score >= 60 ? 'bg-cyan-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Focus Area:</strong> Technical Defense score is currently provisional based on 3 attempts. Complete 2 more jury rounds to finalize baseline.
              </p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-3">Simulation Modules</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/idea-lab" className="p-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-slate-300 font-medium transition-colors">
                💡 Idea Lab
              </Link>
              <Link href="/technical-lab" className="p-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-slate-300 font-medium transition-colors">
                ⚡ Tech Lab
              </Link>
              <Link href="/team-simulator" className="p-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-slate-300 font-medium transition-colors">
                👥 Team Simulator
              </Link>
              <Link href="/academy" className="p-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-slate-300 font-medium transition-colors">
                🎓 Academy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CompetitionScenario, CompetitionMode } from '@/types';

export default function CompetitionArenaPage() {
  const { scenarios, activeScenarioId, setActiveScenarioId, project, updateSkillScore } = useApp();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(activeScenarioId || scenarios[0].id);
  const [mode, setMode] = useState<CompetitionMode>('guided');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(90 * 60);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [milestonesDone, setMilestonesDone] = useState<Record<number, boolean>>({ 1: true });
  const [activeDisruption, setActiveDisruption] = useState<string | null>(null);

  const scenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  // Competition Workflow Steps (17 steps from spec)
  const WORKFLOW_STEPS = [
    { num: 1, title: 'Competition Briefing & Constraints', deliverable: 'Problem scope lock' },
    { num: 2, title: 'Problem Analysis & Pain Identification', deliverable: 'Pain point map' },
    { num: 3, title: 'Stakeholder & Persona Mapping', deliverable: 'Primary user profile' },
    { num: 4, title: 'Problem Validation & Assumptions', deliverable: 'Evidence checklist' },
    { num: 5, title: 'Idea Selection & Differentiation', deliverable: 'Value proposition' },
    { num: 6, title: 'Scope Definition & MoSCoW Filter', deliverable: '1-Feature MVP list' },
    { num: 7, title: 'Solution Architecture Design', deliverable: 'System component diagram' },
    { num: 8, title: 'Task Planning & Kanban Setup', deliverable: 'Task allocation board' },
    { num: 9, title: 'MVP Core Implementation', deliverable: 'Working prototype code' },
    { num: 10, title: 'Testing, Edge Cases & Bug Bash', deliverable: 'Test verification logs' },
    { num: 11, title: 'Security & Responsible AI Review', deliverable: 'Guardrail check' },
    { num: 12, title: 'Demo Flow & Fallback Preparation', deliverable: 'Live demo script' },
    { num: 13, title: 'Submission Artifacts Lock', deliverable: 'Code repo & deployment' },
    { num: 14, title: 'Pitch Rehearsal & Delivery', deliverable: '3-min competition pitch' },
    { num: 15, title: 'AI Jury Defense & Cross-Exam', deliverable: 'Jury score & report' },
    { num: 16, title: 'Final Rubric Scoring & Evaluation', deliverable: 'Consolidated podium score' },
    { num: 17, title: 'Post-Competition Retrospective', deliverable: 'Personalized growth plan' }
  ];

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsSimulating(false);
            alert('Simulated Competition Deadline Reached! Submissions are now locked.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, remainingSeconds]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStepComplete = (stepNum: number) => {
    setMilestonesDone((prev) => ({ ...prev, [stepNum]: true }));
    updateSkillScore('Time Management', 2);
    if (stepNum < 17) {
      setCurrentStep(stepNum + 1);
    }
  };

  const triggerPressureDisruption = () => {
    setActiveDisruption('External API down with HTTP 503! Decouple endpoints and switch to in-memory fallback now.');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Scenario Selection */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span>Hackathon Competition Simulator</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Active Competition Arena</h1>
          <p className="text-slate-400 text-xs mt-1">
            Full 17-step end-to-end competition simulator with realistic countdown clocks and pressure events.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-[#111827] p-1.5 rounded-xl border border-[#1E293B]">
          <button
            onClick={() => setMode('guided')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'guided' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Guided Practice
          </button>
          <button
            onClick={() => setMode('realistic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'realistic' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Realistic
          </button>
          <button
            onClick={() => {
              setMode('pressure');
              triggerPressureDisruption();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'pressure' ? 'bg-rose-600 text-white animate-pulse' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pressure Mode ⚡
          </button>
        </div>
      </div>

      {/* Pressure Disruption Banner */}
      {activeDisruption && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-600/80 text-rose-200 flex items-start justify-between gap-4 animate-bounce">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white">URGENT SIMULATED DISRUPTION (Pressure Mode Active)</p>
              <p className="text-xs text-rose-300 mt-0.5">{activeDisruption}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveDisruption(null)}
            className="text-xs bg-rose-900/60 hover:bg-rose-800 text-white px-3 py-1.5 rounded-lg border border-rose-500 font-semibold"
          >
            Acknowledge & Mitigate
          </button>
        </div>
      )}

      {/* Main Simulation View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Clock + Workflow Steps */}
        <div className="space-y-6">
          {/* Clock Card */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 text-center">
            <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Simulated Countdown Clock</p>
            <div className="text-4xl font-mono font-black text-cyan-300 my-3 tracking-widest">
              {formatTime(remainingSeconds)}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isSimulating ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isSimulating ? 'Pause Clock' : 'Start Simulation'}</span>
              </button>
              <button
                onClick={() => setRemainingSeconds(scenario.durationMinutes * 60)}
                className="px-3 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-slate-300 text-xs font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* 17-Step Milestone Tracker */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-3">17-Step Competition Pipeline</h3>
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-2">
              {WORKFLOW_STEPS.map((step) => {
                const isCompleted = milestonesDone[step.num];
                const isCurrent = currentStep === step.num;

                return (
                  <div
                    key={step.num}
                    onClick={() => setCurrentStep(step.num)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'bg-purple-950/60 border-purple-500 text-white'
                        : isCompleted
                        ? 'bg-[#111827] border-emerald-900/40 text-emerald-300'
                        : 'bg-[#111827] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {step.num}
                      </span>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="text-[10px] text-slate-500">{step.deliverable}</p>
                      </div>
                    </div>

                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center & Right Columns: Active Step Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Scenario Card */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  Scenario {scenario.id} &bull; {scenario.category}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{scenario.title}</h2>
              </div>
              <select
                value={selectedScenarioId}
                onChange={(e) => {
                  setSelectedScenarioId(e.target.value);
                  setActiveScenarioId(e.target.value);
                }}
                className="bg-[#111827] border border-[#1E293B] rounded-lg text-xs text-slate-200 px-3 py-1.5 focus:outline-none focus:border-purple-500"
              >
                {scenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.difficulty})
                  </option>
                ))}
              </select>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{scenario.briefing}</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">Constraints:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  {scenario.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1">Expected Deliverables:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  {scenario.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Current Step Interactive Workspace */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 mb-4">
              <div>
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                  Active Milestone #{currentStep}
                </span>
                <h3 className="text-lg font-bold text-white">{WORKFLOW_STEPS[currentStep - 1].title}</h3>
              </div>
              <button
                onClick={() => handleStepComplete(currentStep)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Step Completed</span>
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <p className="text-slate-300">
                Produce demonstrable evidence for milestone <strong>#{currentStep}</strong> ({WORKFLOW_STEPS[currentStep - 1].deliverable}).
              </p>

              {/* Step Context Guidance */}
              {mode === 'guided' && (
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-300">
                  <p className="font-semibold flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mentor Guidance (Guided Mode):</span>
                  </p>
                  <span>
                    Judges will specifically evaluate whether you solved the root cause or just built a generic form.
                    Head to the <strong>Problem Discovery Lab</strong> or <strong>Project Studio</strong> to lock your scope before coding.
                  </span>
                </div>
              )}

              {/* Interactive Quick Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Link
                  href="/problem-discovery"
                  className="p-3 rounded-xl bg-[#111827] border border-slate-800 hover:border-purple-500 transition-colors text-xs text-slate-200 font-medium flex items-center justify-between"
                >
                  <span>Problem Canvas</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                </Link>
                <Link
                  href="/project-studio"
                  className="p-3 rounded-xl bg-[#111827] border border-slate-800 hover:border-purple-500 transition-colors text-xs text-slate-200 font-medium flex items-center justify-between"
                >
                  <span>Project Kanban</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                </Link>
                <Link
                  href="/jury-room"
                  className="p-3 rounded-xl bg-[#111827] border border-slate-800 hover:border-purple-500 transition-colors text-xs text-slate-200 font-medium flex items-center justify-between"
                >
                  <span>AI Jury Room</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


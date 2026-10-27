'use client';

import React, { useState } from 'react';
import {
  Users2,
  Sparkles,
  Send,
  ShieldCheck,
  AlertTriangle,
  Award,
  Clock,
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SEEDED_JUDGE_PERSONAS } from '@/data/seedData';
import { JudgePersona, JuryTurn, JuryReport } from '@/types';
import { generateJuryQuestion, evaluateJuryAnswer } from '@/services/aiEngine';

export default function JuryRoomPage() {
  const { project, updateSkillScore, addJurySession, user } = useApp();

  const [selectedMode, setSelectedMode] = useState<string>('standard_panel');
  const [activeJudgeIndex, setActiveJudgeIndex] = useState<number>(0);
  const [currentTurn, setCurrentTurn] = useState<number>(1);
  const maxTurns = 5;

  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [turns, setTurns] = useState<JuryTurn[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [report, setReport] = useState<JuryReport | null>(null);

  const judges = SEEDED_JUDGE_PERSONAS;
  const currentJudge = judges[activeJudgeIndex % judges.length];

  // Start a new interactive jury session
  const startSession = async () => {
    setIsLoading(true);
    setSessionActive(true);
    setTurns([]);
    setCurrentTurn(1);
    setReport(null);

    const firstJudge = judges[0];
    const initialQ = await generateJuryQuestion(firstJudge, project, 1);

    const firstTurn: JuryTurn = {
      id: `turn-1`,
      judgeId: firstJudge.id,
      judgeName: firstJudge.name,
      judgeTitle: firstJudge.title,
      question: initialQ.question
    };

    setTurns([firstTurn]);
    setIsLoading(false);
  };

  // Submit answer and receive structured critique
  const submitAnswer = async () => {
    if (!currentAnswer.trim() || isLoading) return;

    setIsLoading(true);
    const activeTurnIndex = turns.length - 1;
    const currentQ = turns[activeTurnIndex].question;

    // Evaluate answer with rigorous AI/deterministic engine
    const feedback = await evaluateJuryAnswer(currentJudge, currentQ, currentAnswer);

    // Update skill scores based on answer quality
    const delta = feedback.technicalCorrectness >= 4 ? 3 : -2;
    updateSkillScore('Technical Defense', delta);

    const updatedTurn: JuryTurn = {
      ...turns[activeTurnIndex],
      userAnswer: currentAnswer,
      submittedAt: new Date().toISOString(),
      feedback
    };

    const newTurns = [...turns];
    newTurns[activeTurnIndex] = updatedTurn;
    setTurns(newTurns);
    setCurrentAnswer('');

    // Check if session concludes
    if (currentTurn >= maxTurns) {
      finalizeSession(newTurns);
    } else {
      // Pick next judge
      const nextTurnNum = currentTurn + 1;
      const nextJudgeIndex = (activeJudgeIndex + 1) % judges.length;
      setActiveJudgeIndex(nextJudgeIndex);
      setCurrentTurn(nextTurnNum);

      const nextJudge = judges[nextJudgeIndex];
      const nextQ = await generateJuryQuestion(nextJudge, project, nextTurnNum, currentAnswer);

      const nextTurn: JuryTurn = {
        id: `turn-${nextTurnNum}`,
        judgeId: nextJudge.id,
        judgeName: nextJudge.name,
        judgeTitle: nextJudge.title,
        question: nextQ.question
      };

      setTurns([...newTurns, nextTurn]);
    }

    setIsLoading(false);
  };

  const finalizeSession = (completedTurns: JuryTurn[]) => {
    // Calculate aggregate score
    let totalScore = 0;
    const unsupportedAll: string[] = [];
    const strongest: string[] = [];
    const weakest: string[] = [];

    completedTurns.forEach((t) => {
      if (t.feedback) {
        const turnTotal =
          t.feedback.technicalCorrectness * 4 +
          t.feedback.specificity * 4 +
          t.feedback.evidence * 4 +
          t.feedback.clarity * 4 +
          t.feedback.awarenessOfLimitations * 4;
        totalScore += turnTotal;

        if (t.feedback.unsupportedClaimsDetected.length > 0) {
          unsupportedAll.push(...t.feedback.unsupportedClaimsDetected);
        }
        if (turnTotal >= 80) {
          strongest.push(`Defense with ${t.judgeName}: Clear technical grounding.`);
        } else {
          weakest.push(`Defense with ${t.judgeName}: Vague details or ungrounded claims.`);
        }
      }
    });

    const averageScore = Math.round(totalScore / completedTurns.length);

    const finalReport: JuryReport = {
      overallScore: averageScore,
      summary: `You completed a ${maxTurns}-question grilling against senior judges covering architecture, product feasibility, and security.`,
      verdict: averageScore >= 75 ? 'Strong Contender' : averageScore >= 50 ? 'Approved for Presentation' : 'Needs Critical Revision',
      strongestAnswers: strongest.length > 0 ? strongest : ['Understood core user pain point accurately.'],
      weakestAnswers: weakest.length > 0 ? weakest : ['Struggled with high-concurrency database failover.'],
      unsupportedClaims: unsupportedAll.length > 0 ? unsupportedAll : ['No major ungrounded buzzwords detected.'],
      contradictions: [],
      missingEvidence: ['Live latency network inspector trace', 'WCAG color-contrast accessibility report'],
      technicalRisks: ['Database locking during sudden spike in concurrent reports.'],
      productRisks: ['Relying on voluntary student reporters without explicit incentive.'],
      suggestedImprovements: [
        'State exact database fallback mechanisms instead of generic retry terms.',
        'Proactively articulate 2 known limitations of your MVP to earn judge trust.'
      ],
      recommendedFollowUps: ['Technical Lab: Idempotent Webhook Handler', 'Knowledge Academy: Defending Before the Jury']
    };

    setReport(finalReport);
    addJurySession({
      id: `jury-sess-${Date.now()}`,
      userId: user.id,
      projectId: project.id,
      projectName: project.name,
      mode: selectedMode as any,
      judgeIds: judges.map((j) => j.id),
      status: 'completed',
      createdAt: new Date().toISOString(),
      currentTurn: maxTurns,
      maxTurns,
      turns: completedTurns,
      overallScore: averageScore,
      report: finalReport
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Users2 className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Jury Room & Defense Simulator</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Cross-Exam & AI Jury Room</h1>
          <p className="text-slate-400 text-xs mt-1">
            10 distinct judge personas, 8 evaluation modes, and evidence-based cross-examination.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            disabled={sessionActive}
            className="bg-[#111827] border border-[#1E293B] text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
          >
            <option value="friendly_mentor">Friendly Mentor Panel</option>
            <option value="standard_panel">Standard Hackathon Panel</option>
            <option value="ruthless_panel">Ruthless Panel (Marcus Sterling)</option>
            <option value="technical_defense">Deep Technical Defense (Dr. Thorne)</option>
            <option value="startup_investor">Startup Investor Panel</option>
            <option value="grand_finale">Grand Finale Championship Panel</option>
          </select>

          {!sessionActive ? (
            <button
              onClick={startSession}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs shadow-lg shadow-purple-900/30 flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Cross-Examination</span>
            </button>
          ) : (
            <button
              onClick={() => setSessionActive(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Exit Session</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Judge Profile & Turn Indicator */}
        <div className="space-y-6">
          {/* Active Judge Card */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-2">
              Current Questioner
            </span>
            <div className="flex items-center gap-4">
              <div className="text-4xl p-2 rounded-2xl bg-purple-950/60 border border-purple-800/50">
                {currentJudge.avatar}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{currentJudge.name}</h3>
                <p className="text-xs text-purple-300">{currentJudge.title}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                  Strictness: {currentJudge.strictness}/10
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1E293B] space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Evaluation Priority:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{currentJudge.evaluationPriority}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Questioning Style:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{currentJudge.questioningStyle}</p>
              </div>
            </div>
          </div>

          {/* Turn Counter & Defense Rules */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Question Round</span>
              <span className="text-cyan-400 font-bold">{currentTurn} of {maxTurns}</span>
            </div>
            <div className="w-full bg-[#111827] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentTurn / maxTurns) * 100}%` }}
              />
            </div>

            <div className="mt-4 p-3 rounded-xl bg-purple-950/30 border border-purple-800/30 text-xs text-purple-300 space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-purple-400" />
                <span>Golden Rules of Defense:</span>
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
                <li>Never claim 100% security or infinite scalability.</li>
                <li>Cite concrete metrics and tech stack components.</li>
                <li>Acknowledge prototype tradeoffs proactively.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Center & Right: Q&A Stream & Input */}
        <div className="lg:col-span-2 space-y-6">
          {!sessionActive && !report && (
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto text-3xl">
                ⚖️
              </div>
              <h2 className="text-xl font-bold text-white">The AI Jury Room is Ready</h2>
              <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
                Step up to defend your project <strong>"{project.name}"</strong>. Judges will test your architecture, MVP boundaries, evidence, and security safeguards.
              </p>
              <button
                onClick={startSession}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors"
              >
                Enter Cross-Examination
              </button>
            </div>
          )}

          {/* Active Q&A Stream */}
          {sessionActive && (
            <div className="space-y-4">
              {turns.map((turn, idx) => (
                <div key={turn.id} className="space-y-3">
                  {/* Judge Question Bubble */}
                  <div className="p-4 rounded-2xl bg-[#111827] border border-purple-900/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-purple-400">{turn.judgeName}</span>
                        <span className="text-[10px] text-slate-500">&bull; {turn.judgeTitle}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Q#{idx + 1}</span>
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">{turn.question}</p>
                  </div>

                  {/* Student Answer & Feedback */}
                  {turn.userAnswer && (
                    <div className="ml-6 p-4 rounded-2xl bg-[#0B0F19] border border-cyan-900/40 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-cyan-400">Your Defense Response:</span>
                        <span className="text-[10px] text-slate-500">Submitted</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">"{turn.userAnswer}"</p>

                      {/* Structured Feedback Card */}
                      {turn.feedback && (
                        <div className="mt-3 p-3.5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-300">Critique & Evaluation:</span>
                            <div className="flex gap-2 text-[10px]">
                              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-semibold">
                                Correctness: {turn.feedback.technicalCorrectness}/5
                              </span>
                              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                                Evidence: {turn.feedback.evidence}/5
                              </span>
                            </div>
                          </div>
                          <p className="text-slate-400 text-[11px] leading-relaxed">{turn.feedback.critique}</p>

                          {turn.feedback.unsupportedClaimsDetected.length > 0 && (
                            <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800/40 text-[11px] text-rose-300 flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                              <span>{turn.feedback.unsupportedClaimsDetected[0]}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Answer Input Field */}
              {turns.length > 0 && !turns[turns.length - 1].userAnswer && (
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Defend your design to <strong>{currentJudge.name}</strong></span>
                    <span>Be specific, humble, and cite metrics</span>
                  </div>
                  <textarea
                    rows={4}
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Articulate your technical rationale, architecture layer, or operational tradeoff..."
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-500">
                      {currentAnswer.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                    <button
                      onClick={submitAnswer}
                      disabled={isLoading || !currentAnswer.trim()}
                      className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {isLoading ? <span>Evaluating Defense...</span> : <span>Submit Defense</span>}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Final Judging Report */}
          {report && (
            <div className="bg-[#0F172A] border border-purple-800/40 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-purple-400">Jury Cross-Examination Complete</span>
                  <h2 className="text-2xl font-bold text-white mt-1">Official Jury Report</h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Consolidated Score</span>
                  <span className="text-3xl font-black text-cyan-300">{report.overallScore}<span className="text-base text-slate-500 font-normal">/100</span></span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40">
                <span className="text-xs font-bold text-purple-300 block mb-1">Verdict:</span>
                <p className="text-sm font-semibold text-white">{report.verdict}</p>
                <p className="text-xs text-slate-400 mt-1">{report.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400 block">Strongest Defense Elements:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {report.strongestAnswers.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400 block">Weakest Answers / Gaps:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {report.weakestAnswers.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-cyan-400 block">Actionable Next Steps:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {report.suggestedImprovements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={startSession}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Another Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


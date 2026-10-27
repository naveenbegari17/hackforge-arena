'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SEEDED_LESSONS } from '@/data/seedData';
import { KnowledgeLesson } from '@/types';

export default function AcademyPage() {
  const { updateSkillScore } = useApp();
  const lessons = SEEDED_LESSONS;
  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  const lesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];

  const handleOptionSelect = (qIdx: number, oIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx });
  };

  const handleCheckQuiz = () => {
    setSubmittedQuiz(true);
    let allCorrect = true;
    lesson.knowledgeCheck.forEach((q, idx) => {
      if (selectedAnswers[idx] !== q.correctIndex) allCorrect = false;
    });
    if (allCorrect) {
      updateSkillScore('Product Thinking', 3);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>Hackathon Knowledge Academy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Mastery Tracks & Playbooks</h1>
          <p className="text-slate-400 text-xs mt-1">
            Structured lessons from national winners, YC founders, and principal engineers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Lessons List */}
        <div className="space-y-4">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Curriculum Tracks
            </h3>
            <div className="space-y-2">
              {lessons.map((l) => (
                <div
                  key={l.id}
                  onClick={() => {
                    setSelectedLessonId(l.id);
                    setSelectedAnswers({});
                    setSubmittedQuiz(false);
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    l.id === selectedLessonId
                      ? 'bg-purple-950/60 border-purple-500 text-white'
                      : 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase">{l.track}</span>
                    <span className="text-[10px] text-slate-500">{l.timeMinutes}m read</span>
                  </div>
                  <p className="font-semibold">{l.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right: Lesson Body + Interactive Check */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 md:p-8 space-y-6">
            <div className="border-b border-[#1E293B] pb-4">
              <span className="text-[10px] font-bold uppercase text-purple-400">{lesson.track} Track</span>
              <h2 className="text-2xl font-bold text-white mt-1">{lesson.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{lesson.summary}</p>
            </div>

            {/* Core Explanation */}
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="whitespace-pre-wrap">{lesson.explanation}</div>

              <div className="p-4 rounded-xl bg-[#111827] border border-cyan-900/40 text-cyan-200 space-y-1">
                <span className="font-bold text-xs block text-cyan-300">Concrete Case Study:</span>
                <p className="text-[11px] leading-relaxed whitespace-pre-wrap">{lesson.practicalExample}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-2">
                <span className="font-bold text-xs text-rose-400 block">Common Pitfalls to Avoid:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                  {lesson.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Knowledge Check Quiz */}
            <div className="pt-4 border-t border-[#1E293B] space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>Knowledge Check</span>
              </h3>

              {lesson.knowledgeCheck.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2 text-xs">
                  <p className="font-semibold text-slate-200">{q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      const isCorrect = q.correctIndex === oIdx;

                      let btnStyle = 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700';
                      if (submittedQuiz) {
                        if (isCorrect) btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
                        else if (isSelected) btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                      } else if (isSelected) {
                        btnStyle = 'bg-purple-950/60 border-purple-500 text-white';
                      }

                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleOptionSelect(qIdx, oIdx)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${btnStyle}`}
                        >
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <p className="text-[11px] text-purple-300 mt-1 italic">
                      Rationale: {q.explanation}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleCheckQuiz}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify Answers</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import {
  KanbanSquare,
  Plus,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Code,
  FileText,
  AlertTriangle,
  Save
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { KanbanTask } from '@/types';

export default function ProjectStudioPage() {
  const { project, updateProject, updateSkillScore } = useApp();
  const [activeTab, setActiveTab] = useState<'kanban' | 'architecture' | 'security' | 'demo'>('kanban');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const COLUMNS: { id: KanbanTask['status']; title: string; color: string }[] = [
    { id: 'backlog', title: 'Backlog', color: 'border-slate-700' },
    { id: 'todo', title: 'To Do', color: 'border-cyan-800' },
    { id: 'in_progress', title: 'In Progress', color: 'border-purple-800' },
    { id: 'testing', title: 'Testing & QA', color: 'border-amber-800' },
    { id: 'done', title: 'Done', color: 'border-emerald-800' }
  ];

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      status: 'todo',
      priority: newTaskPriority,
      estimateMinutes: 30,
      assignedRole: 'Engineer'
    };
    updateProject({ tasks: [...project.tasks, newTask] });
    setNewTaskTitle('');
    triggerSaveToast();
  };

  const moveTask = (taskId: string, newStatus: KanbanTask['status']) => {
    const updated = project.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    updateProject({ tasks: updated });
    if (newStatus === 'done') {
      updateSkillScore('Technical Execution', 2);
    }
    triggerSaveToast();
  };

  const toggleSecurityItem = (itemId: string) => {
    const updated = project.securityChecklist.map((s) => (s.id === itemId ? { ...s, checked: !s.checked } : s));
    updateProject({ securityChecklist: updated });
    updateSkillScore('Security & Responsible AI', 2);
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <KanbanSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>Project Planning & Execution Studio</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">{project.name}</h1>
          <p className="text-slate-400 text-xs mt-1">
            Theme: <strong className="text-cyan-300">{project.theme}</strong> &bull; Complete MVP Roadmap & Task Board
          </p>
        </div>

        {saveToast && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Persisted to Local Storage</span>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2">
        <button
          onClick={() => setActiveTab('kanban')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'kanban' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <KanbanSquare className="w-3.5 h-3.5" />
          <span>Sprint Kanban Board</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'architecture' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>System Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'security' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security & Responsible AI Checklist</span>
        </button>

        <button
          onClick={() => setActiveTab('demo')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'demo' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Demo Script & Pitch Notes</span>
        </button>
      </div>

      {/* Tab 1: Kanban Board */}
      {activeTab === 'kanban' && (
        <div className="space-y-6">
          {/* Quick Add Task */}
          <div className="flex items-center gap-3 bg-[#0F172A] p-3 rounded-2xl border border-[#1E293B]">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add actionable MVP task (e.g. Implement fallback in-memory cache)..."
              className="flex-1 bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as any)}
              className="bg-[#111827] border border-[#1E293B] text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="critical">Critical (MVP Blocker)</option>
            </select>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COLUMNS.map((col) => {
              const colTasks = project.tasks.filter((t) => t.status === col.id);

              return (
                <div key={col.id} className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-4 flex flex-col min-h-[420px]">
                  <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 mb-3">
                    <span className="text-xs font-bold text-white">{col.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1 overflow-y-auto">
                    {colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-xl bg-[#111827] border border-slate-800 space-y-2 text-xs shadow hover:border-purple-500/50 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            task.priority === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                            task.priority === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-[10px] text-slate-500">{task.estimateMinutes}m</span>
                        </div>

                        <p className="font-medium text-slate-200">{task.title}</p>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">{task.assignedRole || 'Unassigned'}</span>
                          <select
                            value={task.status}
                            onChange={(e) => moveTask(task.id, e.target.value as any)}
                            className="bg-[#0B0F19] border border-slate-700 text-slate-400 rounded px-1.5 py-0.5 focus:outline-none"
                          >
                            <option value="backlog">Backlog</option>
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="testing">Testing</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: System Architecture */}
      {activeTab === 'architecture' && (
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <h2 className="text-lg font-bold text-white">Production System Architecture</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Defendable technology choices configured for the 24-hour MVP versus Phase 2 Scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-1">
              <span className="font-bold text-purple-400 block">Frontend Layer:</span>
              <p className="text-slate-200 font-medium">{project.architecture.frontend}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 block">Backend & Server Actions:</span>
              <p className="text-slate-200 font-medium">{project.architecture.backend}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 block">Persistence & Database:</span>
              <p className="text-slate-200 font-medium">{project.architecture.database}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 block">Session & Auth Strategy:</span>
              <p className="text-slate-200 font-medium">{project.architecture.auth}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Security & Responsible AI */}
      {activeTab === 'security' && (
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-4">
          <div className="border-b border-[#1E293B] pb-4">
            <h2 className="text-lg font-bold text-white">Pre-Flight Security & AI Checklist</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified safeguards to prevent disqualification from Judge 5 (Vikram Sethi) and Judge 6 (Marcus Sterling).
            </p>
          </div>

          <div className="space-y-3">
            {project.securityChecklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleSecurityItem(item.id)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                  item.checked
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                    : 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <span className="font-medium">{item.item}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase ${item.checked ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {item.checked ? 'Passed' : 'Pending Check'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Demo Script & Pitch Notes */}
      {activeTab === 'demo' && (
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-6">
          <div className="border-b border-[#1E293B] pb-4">
            <h2 className="text-lg font-bold text-white">Live Demo Script & Pitch Talking Points</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Keep your live demo tightly choreographed to under 90 seconds.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1.5">Live Demo Choreography:</label>
              <textarea
                rows={5}
                value={project.demoScript}
                onChange={(e) => updateProject({ demoScript: e.target.value })}
                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-300 block mb-1.5">Pitch Hook & Closing Metric:</label>
              <textarea
                rows={3}
                value={project.pitchNotes}
                onChange={(e) => updateProject({ pitchNotes: e.target.value })}
                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


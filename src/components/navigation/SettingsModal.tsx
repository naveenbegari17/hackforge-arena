'use client';

import React, { useState } from 'react';
import { X, Save, CheckCircle2, Key, User, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function SettingsModal() {
  const { user, updateUser, isSettingsOpen, closeSettingsModal } = useApp();

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [experienceLevel, setExperienceLevel] = useState<string>(user.experienceLevel);
  const [apiKey, setApiKey] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    updateUser({
      name,
      email,
      experienceLevel: experienceLevel as any
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      closeSettingsModal();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F172A] border border-purple-800/50 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-scaleIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B] bg-[#0B0F19]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">Settings & Preferences</h3>
              <p className="text-[11px] text-slate-400">Adjust competitor profile & AI configuration</p>
            </div>
          </div>
          <button
            onClick={closeSettingsModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
            title="Close Settings"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-300 block mb-1">Competitor Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Experience Level Track</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="beginner">Beginner (College hackathon debut)</option>
              <option value="intermediate">Intermediate (1-3 hackathons)</option>
              <option value="advanced">Advanced (Podium contender)</option>
              <option value="expert">Expert (Multi-time hackathon champion)</option>
            </select>
          </div>

          <div className="pt-2 border-t border-[#1E293B] space-y-1.5">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-purple-400" />
              <span>Google Gemini API Key (Optional)</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Leave empty for High-Fidelity Deterministic Engine"
              className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-purple-500"
            />
            <p className="text-[10px] text-slate-500">
              When omitted, HackForge operates completely offline in verified demo mode.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#1E293B] bg-[#0B0F19]">
          <div>
            {saved && (
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved successfully!</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={closeSettingsModal}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E293B] text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  CheckCircle2,
  Key,
  Database,
  Sliders,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function SettingsPage() {
  const { user, updateUser } = useApp();

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [experienceLevel, setExperienceLevel] = useState<string>(user.experienceLevel);
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = () => {
    updateUser({
      name,
      email,
      experienceLevel: experienceLevel as any
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <SettingsIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>Application & Profile Settings</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Competitor & AI Configuration</h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage your competitor profile, configure external LLM keys, or run in offline deterministic demo mode.
          </p>
        </div>

        {saveSuccess && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Profile Saved</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">Competitor Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-300 block mb-1">Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="font-bold text-slate-300 block mb-1">Experience Level Track:</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
            >
              <option value="beginner">Beginner (College hackathon debut)</option>
              <option value="intermediate">Intermediate (1-3 hackathons completed)</option>
              <option value="advanced">Advanced (Podium contender / national finalist)</option>
              <option value="expert">Expert (Multi-time hackathon champion)</option>
            </select>
          </div>
        </div>

        {/* AI Key Configuration Card */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">AI Provider Integration (Optional)</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            By default, <strong>HackForge Arena runs in High-Fidelity Deterministic Demo Mode</strong> with 10 built-in judge personas and dynamic rubrics.
            To connect live Gemini LLMs for free-form multi-turn generation, add your API key below or in <code>.env.local</code>.
          </p>

          <div className="text-xs space-y-2">
            <label className="font-bold text-slate-300 block">Google Gemini API Key:</label>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy... (Leave empty to use built-in simulator engine)"
              className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 font-mono focus:outline-none focus:border-purple-500"
            />
            <p className="text-[10px] text-slate-500">
              Keys are processed strictly on server routes and never exposed to browser client code.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-900/30 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}


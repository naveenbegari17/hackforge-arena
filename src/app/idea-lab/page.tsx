'use client';

import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface IdeaItem {
  id: string;
  name: string;
  oneLiner: string;
  mvpFeature: string;
  differentiator: string;
  noveltyScore: number;
  feasibilityScore: number;
  buzzwords: string[];
}

export default function IdeaLabPage() {
  const { updateSkillScore } = useApp();

  const [ideas, setIdeas] = useState<IdeaItem[]>([
    {
      id: 'idea-1',
      name: 'Campus LeakWatch Sentinel',
      oneLiner: 'Geospatially clustered water & HVAC leak reporting for dormitories.',
      mvpFeature: '50-meter proximity deduplication algorithm & triage dashboard.',
      differentiator: 'Auto-clusters redundant tickets into a single dispatch unit in under 200ms.',
      noveltyScore: 82,
      feasibilityScore: 92,
      buzzwords: []
    },
    {
      id: 'idea-2',
      name: 'Decentralized EcoToken Ledger',
      oneLiner: 'Blockchain-based carbon credit rewarding students for turning off lights.',
      mvpFeature: 'ERC-20 smart contract token minting on Solana testnet.',
      differentiator: 'Decentralized trustless student incentive platform.',
      noveltyScore: 54,
      feasibilityScore: 35,
      buzzwords: ['blockchain', 'decentralized', 'web3']
    }
  ]);

  const [newIdeaName, setNewIdeaName] = useState<string>('');
  const [newOneLiner, setNewOneLiner] = useState<string>('');
  const [newMVP, setNewMVP] = useState<string>('');
  const [newDiff, setNewDiff] = useState<string>('');

  const handleAddIdea = () => {
    if (!newIdeaName.trim() || !newOneLiner.trim()) return;

    const lower = (newOneLiner + ' ' + newMVP + ' ' + newDiff).toLowerCase();
    const buzzwords: string[] = [];
    if (lower.includes('blockchain') || lower.includes('web3')) buzzwords.push('Blockchain / Web3');
    if (lower.includes('100% accurate') || lower.includes('revolutionary')) buzzwords.push('Absolutist Claim');
    if (lower.includes('first of its kind')) buzzwords.push('Unverified "First of its kind"');

    const noveltyScore = buzzwords.length > 0 ? 50 : 80;
    const feasibilityScore = newMVP.length > 30 ? 85 : 60;

    const newIdea: IdeaItem = {
      id: `idea-${Date.now()}`,
      name: newIdeaName.trim(),
      oneLiner: newOneLiner.trim(),
      mvpFeature: newMVP.trim(),
      differentiator: newDiff.trim(),
      noveltyScore,
      feasibilityScore,
      buzzwords
    };

    setIdeas([...ideas, newIdea]);
    setNewIdeaName('');
    setNewOneLiner('');
    setNewMVP('');
    setNewDiff('');
    updateSkillScore('Innovation & Differentiation', 2);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E293B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
            <span>Idea Innovation Lab</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Idea Comparison & Anti-Buzzword Filter</h1>
          <p className="text-slate-400 text-xs mt-1">
            Evaluate up to 5 concepts side-by-side. Penalize vague claims, reward 24-hour demonstrable MVPs.
          </p>
        </div>
      </div>

      {/* Idea Input Card */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Submit Idea for Rigorous Feasibility Evaluation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <input
            type="text"
            value={newIdeaName}
            onChange={(e) => setNewIdeaName(e.target.value)}
            placeholder="Project Concept Name (e.g. CareRoute Rural Clinic Triage)..."
            className="bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            value={newOneLiner}
            onChange={(e) => setNewOneLiner(e.target.value)}
            placeholder="One-Liner Problem & Solution..."
            className="bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <input
            type="text"
            value={newMVP}
            onChange={(e) => setNewMVP(e.target.value)}
            placeholder="Single demonstrable MVP transaction in 24 hours..."
            className="bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            value={newDiff}
            onChange={(e) => setNewDiff(e.target.value)}
            placeholder="Technical differentiator vs existing alternatives..."
            className="bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleAddIdea}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Score & Compare Concept</span>
          </button>
        </div>
      </div>

      {/* Ideas Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`bg-[#0F172A] border rounded-2xl p-6 space-y-4 transition-all ${
              idea.buzzwords.length > 0 ? 'border-amber-800/50' : 'border-[#1E293B]'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-white">{idea.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{idea.oneLiner}</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-purple-950 text-purple-300 font-bold border border-purple-800">
                  Nov: {idea.noveltyScore}%
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                  Feas: {idea.feasibilityScore}%
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                <span className="font-bold text-slate-300 block mb-0.5">Core 24h MVP Feature:</span>
                <p className="text-slate-400">{idea.mvpFeature}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#111827] border border-slate-800">
                <span className="font-bold text-slate-300 block mb-0.5">Differentiator vs Alternatives:</span>
                <p className="text-slate-400">{idea.differentiator}</p>
              </div>
            </div>

            {idea.buzzwords.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Buzzword Warning Triggered:</span>
                  <p className="text-[11px] text-amber-400/90 mt-0.5">
                    Flagged: {idea.buzzwords.join(', ')}. Judges will challenge whether this adds real user utility or unnecessary complexity.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


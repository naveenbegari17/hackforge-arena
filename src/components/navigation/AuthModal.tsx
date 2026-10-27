'use client';

import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, loginUser } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>(authMode);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('alex.rivera@engineering.edu');
  const [password, setPassword] = useState<string>('••••••••');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      loginUser(email, mode === 'signup' ? name || 'HackForge Competitor' : undefined);
      setLoading(false);
      closeAuthModal();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F172A] border border-purple-800/50 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B] bg-[#0B0F19]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                {mode === 'login' ? 'Sign In to HackForge' : 'Create Competitor Account'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {mode === 'login' ? 'Access your saved simulations & jury logs' : 'Start your competition training record'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-[#0B0F19] border-b border-[#1E293B]">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login' ? 'bg-[#1E293B] text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-purple-400" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'signup' ? 'bg-[#1E293B] text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-[11px]">
              {errorMsg}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full bg-[#111827] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition-all"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : mode === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register Competitor</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-500">
              {mode === 'login' ? "Don't have an account? " : "Already registered? "}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-purple-400 hover:text-purple-300 font-semibold underline"
              >
                {mode === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

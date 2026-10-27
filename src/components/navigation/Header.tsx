'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles, BookOpen, Menu, Sliders } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Header() {
  const { isDemoMode, searchQuery, setSearchQuery, isSidebarOpen, toggleSidebar, openSettingsModal } = useApp();

  return (
    <header className={`h-16 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1E293B] sticky top-0 z-30 flex items-center justify-between px-6 transition-all duration-200 ${
      isSidebarOpen ? 'pl-72' : 'pl-6'
    }`}>
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button (Visible when closed or on any view) */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-[#111827] text-slate-300 hover:text-white border border-[#1E293B] transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Open Sidebar"
          >
            <Menu className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Menu</span>
          </button>
        )}

        {/* Search Input */}
        <div className="relative w-64 sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules, rubrics, personas..."
            className="w-full bg-[#111827] border border-[#1E293B] rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
          />
        </div>
      </div>

      {/* Action Badges & Adjust Settings */}
      <div className="flex items-center gap-3">
        {/* Environment Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{isDemoMode ? 'Demo Simulator (Deterministic Mode)' : 'AI Live Mode'}</span>
        </div>

        {/* Adjust Settings Quick Button */}
        <button
          onClick={openSettingsModal}
          className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-purple-950/50 border border-purple-800/60 hover:bg-purple-900/50 transition-colors font-medium shadow-sm"
          title="Adjust Settings"
        >
          <Sliders className="w-3.5 h-3.5 text-purple-400" />
          <span>Adjust Settings</span>
        </button>

        {/* Quick Docs & FAQs Links */}
        <Link
          href="/faqs"
          className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-[#111827] transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>FAQs</span>
        </Link>
        <Link
          href="/help"
          className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-[#111827] transition-colors"
        >
          <span>Guide</span>
        </Link>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#111827] transition-colors"
          title="Simulated Competition Notifications"
          onClick={() => alert('Simulator Alert: Upcoming mock evaluation round starts in 15 minutes!')}
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-violet-500 absolute top-1.5 right-1.5" />
        </button>
      </div>
    </header>
  );
}

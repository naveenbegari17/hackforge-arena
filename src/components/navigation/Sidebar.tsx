'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Trophy,
  Search,
  Lightbulb,
  KanbanSquare,
  Cpu,
  Users2,
  Mic2,
  Users,
  GraduationCap,
  LineChart,
  Award,
  Settings,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  X,
  HelpCircle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/competition', label: 'Competition Arena', icon: Trophy, badge: 'Core' },
  { href: '/problem-discovery', label: 'Problem Discovery', icon: Search },
  { href: '/idea-lab', label: 'Idea Lab', icon: Lightbulb },
  { href: '/project-studio', label: 'Project Studio', icon: KanbanSquare },
  { href: '/technical-lab', label: 'Technical Lab', icon: Cpu },
  { href: '/jury-room', label: 'AI Jury Room', icon: Users2, badge: 'Live AI' },
  { href: '/pitch-arena', label: 'Pitch Arena', icon: Mic2 },
  { href: '/team-simulator', label: 'Team Simulator', icon: Users },
  { href: '/academy', label: 'Knowledge Academy', icon: GraduationCap },
  { href: '/analytics', label: 'Performance Analytics', icon: LineChart },
  { href: '/achievements', label: 'Achievements', icon: Award },
  { href: '/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/settings', label: 'Settings', icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, isSidebarOpen, toggleSidebar, openSettingsModal } = useApp();

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-[#1E293B] flex flex-col h-screen fixed left-0 top-0 z-40 select-none transition-transform duration-200">
      {/* Brand Header with Close/Collapse Button */}
      <div className="p-4 border-b border-[#1E293B] flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-wider text-white block leading-tight">
              HACK<span className="text-[#06B6D4]">FORGE</span>
            </span>
            <span className="text-[9px] text-purple-400 font-medium tracking-widest uppercase">
              Arena Simulator
            </span>
          </div>
        </Link>

        {/* Close / Collapse button */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
          title="Close / Hide Sidebar"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          if (item.href === '/settings') {
            return (
              <button
                key={item.href}
                onClick={openSettingsModal}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-950/60 to-purple-900/30 text-white border-l-4 border-[#8B5CF6] shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#111827]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                  Adjust
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-950/60 to-purple-900/30 text-white border-l-4 border-[#8B5CF6] shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-[#111827]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#06B6D4]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                  item.badge === 'Live AI'
                    ? 'bg-purple-950 text-purple-300 border border-purple-800/60'
                    : 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Status Bar */}
      <div className="p-4 border-t border-[#1E293B] bg-[#090D16]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs shadow">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-medium truncate">{user.currentRank}</span>
              </div>
            </div>
          </div>
          <button
            onClick={openSettingsModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E293B]"
            title="Adjust Profile & Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="mt-3 bg-[#111827] rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] h-full rounded-full transition-all duration-500"
            style={{ width: `${user.readinessScore}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1.5 text-[10px] text-slate-400">
          <span>Readiness Score</span>
          <span className="font-bold text-cyan-400">{user.readinessScore}/100</span>
        </div>
      </div>
    </aside>
  );
}

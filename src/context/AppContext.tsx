'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, SkillScore, ProjectData, CompetitionScenario, Achievement, JurySession } from '@/types';
import { INITIAL_USER_PROFILE, INITIAL_SKILL_SCORES, INITIAL_PROJECT } from '@/data/initialState';
import { SEEDED_SCENARIOS, SEEDED_ACHIEVEMENTS } from '@/data/seedData';

interface AppContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  skills: SkillScore[];
  updateSkillScore: (category: string, delta: number) => void;
  project: ProjectData;
  updateProject: (updates: Partial<ProjectData>) => void;
  scenarios: CompetitionScenario[];
  activeScenarioId: string | null;
  setActiveScenarioId: (id: string | null) => void;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  jurySessions: JurySession[];
  addJurySession: (session: JurySession) => void;
  updateJurySession: (id: string, updates: Partial<JurySession>) => void;
  isDemoMode: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  isLoggedIn: boolean;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [skills, setSkills] = useState<SkillScore[]>(INITIAL_SKILL_SCORES);
  const [project, setProject] = useState<ProjectData>(INITIAL_PROJECT);
  const [scenarios] = useState<CompetitionScenario[]>(SEEDED_SCENARIOS);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>('scenario-1');
  const [achievements, setAchievements] = useState<Achievement[]>(SEEDED_ACHIEVEMENTS);
  const [jurySessions, setJurySessions] = useState<JurySession[]>([]);
  const [isDemoMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const openSettingsModal = () => setSettingsOpen(true);
  const closeSettingsModal = () => setSettingsOpen(false);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };
  const closeAuthModal = () => setAuthModalOpen(false);

  const loginUser = (email: string, name?: string) => {
    const updatedUser = {
      ...user,
      email,
      name: name || user.name
    };
    setUser(updatedUser);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('hackforge_user', JSON.stringify(updatedUser));
      localStorage.setItem('hackforge_logged_in', 'true');
    } catch {}
    closeAuthModal();
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    try {
      localStorage.setItem('hackforge_logged_in', 'false');
    } catch {}
  };

  // Persist state in localStorage for session resilience
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('hackforge_user');
      if (savedUser) setUser(JSON.parse(savedUser));
      const savedProject = localStorage.getItem('hackforge_project');
      if (savedProject) setProject(JSON.parse(savedProject));
      const savedSkills = localStorage.getItem('hackforge_skills');
      if (savedSkills) setSkills(JSON.parse(savedSkills));
      const savedJury = localStorage.getItem('hackforge_jury');
      if (savedJury) setJurySessions(JSON.parse(savedJury));
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      const next = { ...prev, ...updates };
      try { localStorage.setItem('hackforge_user', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const updateProject = (updates: Partial<ProjectData>) => {
    setProject(prev => {
      const next = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      try { localStorage.setItem('hackforge_project', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const updateSkillScore = (category: string, delta: number) => {
    setSkills(prev => {
      const next = prev.map(s => {
        if (s.category === category || s.name === category) {
          const newScore = Math.min(100, Math.max(0, s.score + delta));
          return { ...s, score: newScore, attemptCount: s.attemptCount + 1, isProvisional: false };
        }
        return s;
      });
      try { localStorage.setItem('hackforge_skills', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, progress: 100, unlockedAt: new Date().toISOString() } : a));
  };

  const addJurySession = (session: JurySession) => {
    setJurySessions(prev => {
      const next = [session, ...prev];
      try { localStorage.setItem('hackforge_jury', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const updateJurySession = (id: string, updates: Partial<JurySession>) => {
    setJurySessions(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...updates } : s);
      try { localStorage.setItem('hackforge_jury', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        skills,
        updateSkillScore,
        project,
        updateProject,
        scenarios,
        activeScenarioId,
        setActiveScenarioId,
        achievements,
        unlockAchievement,
        jurySessions,
        addJurySession,
        updateJurySession,
        isDemoMode,
        searchQuery,
        setSearchQuery,
        isSidebarOpen,
        toggleSidebar,
        setSidebarOpen,
        isSettingsOpen,
        openSettingsModal,
        closeSettingsModal,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        isLoggedIn,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}


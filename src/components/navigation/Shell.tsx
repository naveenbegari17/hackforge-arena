'use client';

import React from 'react';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/navigation/Header';
import { SettingsModal } from '@/components/navigation/SettingsModal';
import { AuthModal } from '@/components/navigation/AuthModal';
import { useApp } from '@/context/AppContext';

export function Shell({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useApp();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <SettingsModal />
      <AuthModal />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
        isSidebarOpen ? 'pl-64' : 'pl-0'
      }`}>
        <Header />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


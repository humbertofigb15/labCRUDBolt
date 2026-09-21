import type { ReactNode } from 'react';
import { ShieldCheck, Users } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">VERA</span>
        </div>
        <nav className="flex-1 py-4 px-3">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-900">
            <Users size={18} />
            Users
          </button>
        </nav>
        <div className="px-5 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-400">VERA Challenge 2026</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden flex items-center gap-2.5 h-16 px-4 bg-white border-b border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">VERA</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

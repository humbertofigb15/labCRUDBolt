import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  iconColor?: string;
}

export function StatCard({ label, value, icon, iconColor = 'text-slate-600' }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
      <div className={`w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center ${iconColor}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
        <p className="text-xs text-slate-500 mt-1 truncate">{label}</p>
      </div>
    </div>
  );
}

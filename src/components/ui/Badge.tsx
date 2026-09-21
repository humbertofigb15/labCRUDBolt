import type { ReactNode } from 'react';

type Color = 'slate' | 'green' | 'amber' | 'blue' | 'red';

interface BadgeProps {
  color?: Color;
  dot?: boolean;
  children: ReactNode;
}

const colorClasses: Record<Color, string> = {
  slate: 'bg-slate-100 text-slate-700',
  green: 'bg-green-50 text-green-700',
  amber: 'bg-amber-50 text-amber-700',
  blue: 'bg-blue-50 text-blue-700',
  red: 'bg-red-50 text-red-700',
};

const dotColors: Record<Color, string> = {
  slate: 'bg-slate-500',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500',
};

export function Badge({ color = 'slate', dot = false, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color]}`} />}
      {children}
    </span>
  );
}

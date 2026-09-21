import { useEffect, useRef, useState } from 'react';
import { Eye, Pencil, Trash2, MoreVertical } from 'lucide-react';
import type { User } from '@/types/user';
import { getInitials, formatDate } from '@/utils/formatting';
import { StatusBadge, RoleBadge } from '@/components/users/StatusBadge';

interface UserRowProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserRow({ user, onView, onEdit, onDelete }: UserRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideDesktop = desktopMenuRef.current?.contains(target) ?? false;
      const clickedInsideMobile = mobileMenuRef.current?.contains(target) ?? false;
      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <>
      {/* Desktop row */}
      <tr className="hidden md:table-row border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <td className="px-6 py-3.5 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 flex-shrink-0">
              {getInitials(user.name)}
            </div>
            <span className="text-sm font-medium text-slate-900">{user.name}</span>
          </div>
        </td>
        <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">{user.email}</td>
        <td className="px-6 py-3.5 whitespace-nowrap">
          <RoleBadge role={user.role} />
        </td>
        <td className="px-6 py-3.5 text-sm text-slate-600 whitespace-nowrap">{user.area}</td>
        <td className="px-6 py-3.5 whitespace-nowrap">
          <StatusBadge status={user.status} />
        </td>
        <td className="px-6 py-3.5 text-sm text-slate-500 whitespace-nowrap">
          {formatDate(user.createdAt)}
        </td>
        <td className="px-6 py-3.5 whitespace-nowrap text-right">
          <div className="relative inline-block" ref={desktopMenuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              aria-label="Actions"
            >
              <MoreVertical size={18} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg border border-slate-200 shadow-lg z-10 py-1">
                <button
                  onClick={() => { onView(user); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Eye size={15} /> View
                </button>
                <button
                  onClick={() => { onEdit(user); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Pencil size={15} /> Edit
                </button>
                <button
                  onClick={() => { onDelete(user); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>

      {/* Mobile card */}
      <tr className="md:hidden border-b border-slate-100">
        <td colSpan={7} className="px-4 py-3.5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 flex-shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-900 truncate">{user.name}</span>
                <div className="relative" ref={mobileMenuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1 rounded text-slate-400 hover:bg-slate-100"
                    aria-label="Actions"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg border border-slate-200 shadow-lg z-10 py-1">
                      <button
                        onClick={() => { onView(user); setMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Eye size={15} /> View
                      </button>
                      <button
                        onClick={() => { onEdit(user); setMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil size={15} /> Edit
                      </button>
                      <button
                        onClick={() => { onDelete(user); setMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <RoleBadge role={user.role} />
                <StatusBadge status={user.status} />
                <span className="text-xs text-slate-400">{user.area}</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

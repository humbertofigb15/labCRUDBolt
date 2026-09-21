import { Search, X } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import type { UserFilters } from '@/types/user';

interface UsersToolbarProps {
  filters: UserFilters;
  areas: string[];
  onChange: (filters: UserFilters) => void;
  onClear: () => void;
}

const roleOptions = [
  { value: 'all', label: 'All Roles' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'User', label: 'User' },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export function UsersToolbar({ filters, areas, onChange, onClear }: UsersToolbarProps) {
  const hasActiveFilters =
    filters.search !== '' || filters.role !== 'all' || filters.status !== 'all' || filters.area !== 'all';

  const areaOptions = [
    { value: 'all', label: 'All Areas' },
    ...areas.map((a) => ({ value: a, label: a })),
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-end">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-9 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ ...filters, search: '' })}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="flex gap-3 flex-wrap">
        <Select
          options={roleOptions}
          value={filters.role}
          onChange={(e) => onChange({ ...filters, role: e.target.value as UserFilters['role'] })}
          className="min-w-[130px]"
        />
        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as UserFilters['status'] })}
          className="min-w-[130px]"
        />
        <Select
          options={areaOptions}
          value={filters.area}
          onChange={(e) => onChange({ ...filters, area: e.target.value })}
          className="min-w-[130px]"
        />
      </div>
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="text-sm text-slate-600 hover:text-slate-900 font-medium whitespace-nowrap self-center"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

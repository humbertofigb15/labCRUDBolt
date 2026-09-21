import { Users } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { UserRow } from './UserRow';
import type { User, UserFilters } from '@/types/user';

interface UsersTableProps {
  users: User[];
  filters: UserFilters;
  hasActiveFilters: boolean;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onAddUser: () => void;
  onClearFilters: () => void;
}

export function UsersTable({
  users,
  hasActiveFilters,
  onView,
  onEdit,
  onDelete,
  onAddUser,
  onClearFilters,
}: UsersTableProps) {
  if (users.length === 0) {
    if (hasActiveFilters) {
      return (
        <EmptyState
          icon={<Users size={28} />}
          title="No users match your current filters"
          action={<Button variant="secondary" onClick={onClearFilters}>Clear filters</Button>}
        />
      );
    }
    return (
      <EmptyState
        icon={<Users size={28} />}
        title="No users found"
        description="Create your first user to start managing VERA access."
        action={<Button onClick={onAddUser}>+ Add User</Button>}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Area</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Created</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

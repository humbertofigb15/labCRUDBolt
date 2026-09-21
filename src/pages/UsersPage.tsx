import { useMemo, useState } from 'react';
import { Plus, Users as UsersIcon, UserCheck, UserX, ShieldCheck } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { StatCard } from '@/components/users/StatCard';
import { UsersToolbar } from '@/components/users/UsersToolbar';
import { UsersTable } from '@/components/users/UsersTable';
import { UserFormModal } from '@/components/users/UserFormModal';
import { UserDetailsModal } from '@/components/users/UserDetailsModal';
import { DeleteConfirmationModal } from '@/components/users/DeleteConfirmationModal';
import { useUsers } from '@/hooks/useUsers';
import type { User, UserFilters, UserFormData } from '@/types/user';

const emptyFilters: UserFilters = {
  search: '',
  role: 'all',
  status: 'all',
  area: 'all',
};

export function UsersPage() {
  const { users, createUser, updateUser, deleteUser } = useUsers();
  const [filters, setFilters] = useState<UserFilters>(emptyFilters);
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [toast, setToast] = useState('');

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === 'Active').length,
    inactive: users.filter((u) => u.status === 'Inactive').length,
    admins: users.filter((u) => u.role === 'Admin').length,
  }), [users]);

  const areas = useMemo(() => {
    const unique = [...new Set(users.map((u) => u.area))];
    return unique.sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!user.name.toLowerCase().includes(q) && !user.email.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (filters.role !== 'all' && user.role !== filters.role) return false;
      if (filters.status !== 'all' && user.status !== filters.status) return false;
      if (filters.area !== 'all' && user.area !== filters.area) return false;
      return true;
    });
  }, [users, filters]);

  const hasActiveFilters =
    filters.search !== '' || filters.role !== 'all' || filters.status !== 'all' || filters.area !== 'all';

  const handleAddUser = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setViewingUser(null);
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: UserFormData) => {
    if (editingUser) {
      updateUser(editingUser.id, data);
      setToast('User updated successfully');
    } else {
      createUser(data);
      setToast('User created successfully');
    }
    setFormOpen(false);
    setEditingUser(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingUser) return;
    deleteUser(deletingUser.id);
    setDeletingUser(null);
    setToast('User deleted successfully');
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-sm text-slate-500 mt-1">Manage platform users, roles and access status.</p>
          </div>
          <Button onClick={handleAddUser}>
            <Plus size={18} />
            Add User
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total Users" value={stats.total} icon={<UsersIcon size={20} />} />
          <StatCard label="Active Users" value={stats.active} icon={<UserCheck size={20} />} iconColor="text-green-600" />
          <StatCard label="Inactive Users" value={stats.inactive} icon={<UserX size={20} />} iconColor="text-slate-400" />
          <StatCard label="Administrators" value={stats.admins} icon={<ShieldCheck size={20} />} iconColor="text-blue-600" />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200">
            <UsersToolbar
              filters={filters}
              areas={areas}
              onChange={setFilters}
              onClear={() => setFilters(emptyFilters)}
            />
          </div>

          {/* Table */}
          <UsersTable
            users={filteredUsers}
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            onView={setViewingUser}
            onEdit={handleEditUser}
            onDelete={setDeletingUser}
            onAddUser={handleAddUser}
            onClearFilters={() => setFilters(emptyFilters)}
          />

          {/* Footer count */}
          {filteredUsers.length > 0 && (
            <div className="px-6 py-3 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <UserFormModal
        open={formOpen}
        editingUser={editingUser}
        onSubmit={handleFormSubmit}
        onClose={() => { setFormOpen(false); setEditingUser(null); }}
      />

      <UserDetailsModal
        open={viewingUser !== null}
        user={viewingUser}
        onEdit={() => viewingUser && handleEditUser(viewingUser)}
        onClose={() => setViewingUser(null)}
      />

      <DeleteConfirmationModal
        open={deletingUser !== null}
        userName={deletingUser?.name ?? ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingUser(null)}
      />

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </AppLayout>
  );
}

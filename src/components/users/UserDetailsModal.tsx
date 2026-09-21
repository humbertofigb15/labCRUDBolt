import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { getInitials, formatDate } from '@/utils/formatting';
import { StatusBadge, RoleBadge } from '@/components/users/StatusBadge';
import type { User } from '@/types/user';

interface UserDetailsModalProps {
  open: boolean;
  user: User | null;
  onEdit: () => void;
  onClose: () => void;
}

export function UserDetailsModal({ open, user, onEdit, onClose }: UserDetailsModalProps) {
  if (!user) return null;

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
      <Button onClick={onEdit}>
        <Pencil size={15} />
        Edit User
      </Button>
    </>
  );

  return (
    <Modal open={open} title="User Details" onClose={onClose} footer={footer}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-lg font-semibold text-slate-700">
            {getInitials(user.name)}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RoleBadge role={user.role} />
          <StatusBadge status={user.status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <DetailField label="Full Name" value={user.name} />
          <DetailField label="Email" value={user.email} />
          <DetailField label="Role" value={user.role} />
          <DetailField label="Area" value={user.area} />
          <DetailField label="Status" value={user.status} />
          <DetailField label="Created Date" value={formatDate(user.createdAt)} />
          <DetailField label="User ID" value={user.id} mono />
        </div>
      </div>
    </Modal>
  );
}

function DetailField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm text-slate-900 ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  );
}

import type { UserRole, UserStatus } from '@/types/user';
import { Badge } from '@/components/ui/Badge';

export function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <Badge color={status === 'Active' ? 'green' : 'slate'} dot>
      {status}
    </Badge>
  );
}

export function RoleBadge({ role }: { role: UserRole }) {
  const color = role === 'Admin' ? 'blue' : role === 'Manager' ? 'amber' : 'slate';
  return <Badge color={color}>{role}</Badge>;
}

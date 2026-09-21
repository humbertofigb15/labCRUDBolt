import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface DeleteConfirmationModalProps {
  open: boolean;
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationModal({
  open,
  userName,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  const footer = (
    <>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Delete User
      </Button>
    </>
  );

  return (
    <Modal open={open} title="Delete user?" onClose={onCancel} footer={footer}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle size={20} className="text-red-600" />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed pt-2">
          Are you sure you want to delete <span className="font-semibold text-slate-900">{userName}</span>?
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}

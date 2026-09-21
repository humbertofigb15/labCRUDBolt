import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { hasErrors, validateUserForm, type FormErrors } from '@/utils/validation';
import type { User, UserFormData, UserRole, UserStatus } from '@/types/user';

interface UserFormModalProps {
  open: boolean;
  editingUser: User | null;
  onSubmit: (data: UserFormData) => void;
  onClose: () => void;
}

const roleOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'User', label: 'User' },
];

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

const emptyForm: UserFormData = {
  name: '',
  email: '',
  role: 'User',
  area: '',
  status: 'Active',
};

export function UserFormModal({ open, editingUser, onSubmit, onClose }: UserFormModalProps) {
  const [formData, setFormData] = useState<UserFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) return;

    setFormData(
      editingUser
        ? {
            name: editingUser.name,
            email: editingUser.email,
            role: editingUser.role,
            area: editingUser.area,
            status: editingUser.status,
          }
        : { ...emptyForm }
    );
    setErrors({});
  }, [open, editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;
    onSubmit(formData);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const footer = (
    <>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button type="submit" form="user-form">
        {editingUser ? 'Save Changes' : 'Create User'}
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      title={editingUser ? 'Edit User' : 'Add User'}
      onClose={handleClose}
      footer={footer}
    >
      <form id="user-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Mariana López"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          autoFocus
        />
        <Input
          label="Email *"
          type="email"
          placeholder="e.g. name@vera.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Role *"
            options={roleOptions}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
            error={errors.role}
          />
          <Select
            label="Status *"
            options={statusOptions}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
            error={errors.status}
          />
        </div>
        <Input
          label="Area *"
          placeholder="e.g. Compliance"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          error={errors.area}
        />
      </form>
    </Modal>
  );
}

import { useCallback, useEffect, useState } from 'react';
import {
  createUser as createUserService,
  deleteUser as deleteUserService,
  getUsers,
  updateUser as updateUserService,
} from '@/services/userService';
import type { User, UserFormData } from '@/types/user';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(() => {
    setLoading(true);
    setUsers(getUsers());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const createUser = useCallback((data: UserFormData): User => {
    const newUser = createUserService(data);
    setUsers(getUsers());
    return newUser;
  }, []);

  const updateUser = useCallback((id: string, data: UserFormData): User | null => {
    const updated = updateUserService(id, data);
    setUsers(getUsers());
    return updated;
  }, []);

  const deleteUser = useCallback((id: string): void => {
    deleteUserService(id);
    setUsers(getUsers());
  }, []);

  return {
    users,
    loading,
    createUser,
    updateUser,
    deleteUser,
    reload: loadUsers,
  };
}

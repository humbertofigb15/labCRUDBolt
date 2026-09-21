import type { User, UserFormData } from "@/types/user";
import { mockUsers } from "@/data/mockUsers";
import { generateUserId } from "@/utils/id";

const STORAGE_KEY = "vera_users";

function readFromStorage(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
      return [...mockUsers];
    }
    return JSON.parse(raw) as User[];
  } catch {
    return [...mockUsers];
  }
}

function writeToStorage(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUsers(): User[] {
  return readFromStorage();
}

export function createUser(data: UserFormData): User {
  const users = readFromStorage();
  const newUser: User = {
    id: generateUserId(users.map((u) => u.id)),
    ...data,
    createdAt: new Date().toISOString().split("T")[0],
  };
  const updated = [newUser, ...users];
  writeToStorage(updated);
  return newUser;
}

export function updateUser(id: string, data: UserFormData): User | null {
  const users = readFromStorage();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const updatedUser: User = { ...users[index], ...data };
  users[index] = updatedUser;
  writeToStorage(users);
  return updatedUser;
}

export function deleteUser(id: string): boolean {
  const users = readFromStorage();
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length) return false;
  writeToStorage(filtered);
  return true;
}

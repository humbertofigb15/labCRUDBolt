export type UserRole = "Admin" | "Manager" | "User";

export type UserStatus = "Active" | "Inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  area: string;
  status: UserStatus;
  createdAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  area: string;
  status: UserStatus;
}

export interface UserFilters {
  search: string;
  role: UserRole | "all";
  status: UserStatus | "all";
  area: string | "all";
}

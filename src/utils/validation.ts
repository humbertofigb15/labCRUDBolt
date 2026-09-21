import type { UserFormData } from "@/types/user";

export interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
  area?: string;
  status?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUserForm(data: UserFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.role) {
    errors.role = "Role is required";
  }

  if (!data.area.trim()) {
    errors.area = "Area is required";
  }

  if (!data.status) {
    errors.status = "Status is required";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

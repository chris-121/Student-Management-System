export const ROLE_VALUES = {
  ADMIN: "admin",
  STUDENT: "student",
} as const;

export type Role = (typeof ROLE_VALUES)[keyof typeof ROLE_VALUES];

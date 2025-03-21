export const STATUS_VALUES = {
  PENDING: "pending",
  OVERDUE: "over-due",
  COMPLETED: "completed",
} as const;

export type Status = (typeof STATUS_VALUES)[keyof typeof STATUS_VALUES];

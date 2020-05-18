export enum NotificationType {
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
}

export interface Notification {
  type: NotificationType;
  message: string;
  duration?: number;
}

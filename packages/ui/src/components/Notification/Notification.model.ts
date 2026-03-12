export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationProps {
  message: string;
  type?: NotificationType;
  dismissible?: boolean;
  dismissLabel?: string;
}

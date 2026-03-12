export const NotificationStatus = {
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'error',
} as const;

export type NotificationStatus =
	(typeof NotificationStatus)[keyof typeof NotificationStatus];

export const ToastPosition = {
	TOP: 'top',
	BOTTOM: 'bottom',
	TOP_LEFT: 'top-left',
	TOP_RIGHT: 'top-right',
	BOTTOM_LEFT: 'bottom-left',
	BOTTOM_RIGHT: 'bottom-right',
} as const;
export type ToastPosition = (typeof ToastPosition)[keyof typeof ToastPosition];

export const ToastType = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning',
	INFO: 'info',
	DEFAULT: 'default',
} as const;
export type ToastType = (typeof ToastType)[keyof typeof ToastType];

export interface ToastConfig {
	id?: string;
	title?: string;
	message: string;
	type?: ToastType;
	position?: ToastPosition;
	duration?: number;
	dismissible?: boolean;
	icon?: string;
}

export type ToastOptions = ToastConfig;

export const ToastConfigDefault: ToastConfig = {
	message: '',
	type: ToastType.INFO,
	position: ToastPosition.TOP_RIGHT,
	duration: 5000,
	dismissible: true,
};

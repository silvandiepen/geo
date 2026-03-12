import { ToastOptions, toastService } from './Toast.service';

export { default as Toast } from './Toast.vue';
export { toastService } from './Toast.service';
export type {
	ToastService,
	ToastOptions,
	ToastInstance,
} from './Toast.service';
export { ToastType, ToastPosition } from './Toast.model';
export type { ToastConfig } from './Toast.model';

export const toast = (opts: ToastOptions) =>
	toastService.show({
		...opts,
	});

export const toastError = (opts: ToastOptions) =>
	toastService.show({
		...opts,
		type: 'error',
	});

export const toastWarning = (opts: ToastOptions) =>
	toastService.show({
		...opts,
		type: 'warning',
	});

export const toastInfo = (opts: ToastOptions) =>
	toastService.show({
		...opts,
		type: 'info',
	});

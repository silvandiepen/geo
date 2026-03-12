import { ref } from 'vue';
import type { ToastPosition, ToastType, ToastConfig } from './Toast.model';
import { ToastConfigDefault } from './Toast.model';

export interface ToastOptions {
	message: string;
	title?: string;
	icon?: string;
	duration?: number;
	position?: ToastPosition;
	type?: ToastType;
	dismissible?: boolean;
	onClose?: () => void;
	id?: string;
}

export interface ToastInstance extends ToastConfig {
	id: string;
	openedTime: number;
	state: {
		closing: boolean;
	};
	onClose?: () => void;
}

const useToastService = () => {
	const toasts = ref<ToastInstance[]>([]);

	const showToast = (opts: ToastOptions) => {
		const options = { ...ToastConfigDefault, ...opts };
		const id = options.id || crypto.randomUUID();

		const newToast: ToastInstance = {
			id,
			message: options.message,
			title: options.title,
			icon: options.icon,
			duration: options.duration,
			position: options.position,
			type: options.type,
			dismissible: options.dismissible,
			onClose: options.onClose,
			openedTime: Date.now(),
			state: {
				closing: false,
			},
		};

		toasts.value.push(newToast);

		if (options.duration && options.duration > 0) {
			setTimeout(() => {
				hideToast(id);
			}, options.duration);
		}

		return id;
	};

	const hideToast = (id: string) => {
		const toast = toasts.value.find((t) => t.id === id);
		if (toast) {
			toast.state.closing = true;
			setTimeout(() => {
				toast.onClose?.();
				toasts.value = toasts.value.filter((t) => t.id !== id);
			}, 300); // Short animation duration for closing
		}
	};

	const hideAllToasts = () => {
		toasts.value.forEach((toast) => hideToast(toast.id));
	};

	return {
		toasts,
		show: showToast,
		hide: hideToast,
		hideAll: hideAllToasts,
	};
};

export const toastService = useToastService();
export type ToastService = ReturnType<typeof useToastService>;

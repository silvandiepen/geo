// usePopup.ts
import {
	markRaw,
	reactive,
	ref,
	type ComponentPublicInstance,
	type Slot,
	type Component,
} from 'vue';
import PopupSlot from './PopupSlot.vue';
import type { PopupOptions, PopupInstance, PopupUpdate } from './Popup.model';
import { logger } from '@/utils/logger';
import { ConfirmDialog, ProgressDialog, InputDialog } from './components';

const defaulPopupOptions: Partial<PopupOptions> = {
	config: {
		background: true,
		position: 'center',
		canClose: true,
		width: 'fit-content',
		closingTimeout: 300,
	},
	closePopups: false,
};

export const popupRefs = reactive<
	Record<string, ComponentPublicInstance | null>
>({});

// Component registry for string-based component resolution
const componentRegistry: Record<string, Component> = {
	ConfirmDialog,
	ProgressDialog,
	InputDialog,
};

export interface PopupService {
	popups: { value: PopupInstance[] };
	show: (config: PopupOptions) => string;
	open: (config: PopupOptions) => string;
	showPopup: (config: PopupOptions) => string;
	showFormPopup: (config: PopupOptions) => string;
	hidePopup: (id: string) => void;
	closePopup: (options: { id: string }) => void;
	close: (id: string) => void;
	updatePopup: (id: string, updates: PopupUpdate) => void;
	updatePopupTitle: (id: string, title: string) => void;
	closeAllPopups: (excludeId?: string) => void;
	resetPopupState: () => void;
}

const usePopupService = (): PopupService => {
	const popups = ref<PopupInstance[]>([]);

	// Add a global popup state reset mechanism
	const resetPopupState = () => {
		popups.value = [];
	};

	const show = (opts: PopupOptions) => {
		// Ensure no stale popups are lingering
		if (popups.value.length > 5) {
			resetPopupState();
		}

		// Resolve string components
		if (typeof opts.component === 'string') {
			const resolvedComponent = componentRegistry[opts.component];
			if (!resolvedComponent) {
				logger.error(
					`Component "${opts.component}" not found in popup registry`
				);
				return '';
			}
			opts.component = markRaw(resolvedComponent);
		} else if (typeof opts.component === 'function') {
			const slotFn = opts.component as Slot<any>;
			opts = {
				...opts,
				component: markRaw(PopupSlot),
				slots: {
					...opts.slots,
					// @ts-expect-error
					default: slotFn,
				},
			};
		}

		const options = { ...defaulPopupOptions, ...opts };
		const id = options.id || crypto.randomUUID();

		if (options.closePopups) {
			closeAllPopups(id);
		}

		const wrappedProps = {
			...options.props,
			...(options.on &&
				Object.entries(options.on).reduce(
					(acc, [event, handler]) => ({
						...acc,
						[`onUpdate:${event}`]: handler,
						[`on${event.charAt(0).toUpperCase() + event.slice(1)}`]: handler,
					}),
					{}
				)),
		};

		const newPopup: PopupInstance = {
			id,
			component: options.component
				? markRaw(options.component)
				: markRaw(PopupSlot),
			footer: options.footer ? markRaw(options.footer) : undefined,
			header: options.header ? markRaw(options.header) : undefined,
			actions: options.actions,
			props: wrappedProps,
			title: options.title || '',
			description: options.description || '',
			config: {
				hasBackground: options.config?.background ?? true,
				position: options.config?.position || 'center',
				canClose: options.config?.canClose ?? true,
				width: options.config?.width || 'auto',
				overflow: options.config?.overflow || 'auto',
				closingTimeout: options.config?.closingTimeout || 300,
			},
			onCallback: options.onCallback,
			onClose: options.onClose,
			openedTime: Date.now(),
			slots: options.slots,
			events: options.on,
			state: {
				closing: false,
			},
		};

		Promise.resolve().then(() => {
			// Attempt to push popup with additional safety
			try {
				popups.value.push(newPopup);
			} catch (error) {
				logger.error('Failed to push popup', {
					error,
					popupId: id,
					popupsCount: popups.value.length,
				});
				resetPopupState();
			}
		});

		return id;
	};

	const close = (opts: { id?: string; callback?: Object } = {}) => {
		const { id, callback } = opts;

		if (id) {
			const popup = popups.value.find((p) => p.id === id);
			if (popup) {
				popup.state.closing = true;

				if (callback && popup.onCallback) {
					popup.onCallback(callback);
				}

				setTimeout(() => {
					popup.onClose?.();
					popups.value = popups.value.filter((p) => p.id !== id);
				}, popup.config.closingTimeout);
			}
		} else {
			// Close the last opened popup if no ID is provided
			const popup = popups.value[popups.value.length - 1];
			if (popup) {
				popup.state.closing = true;
				setTimeout(() => {
					popup.onClose?.();
					popups.value.pop();
				}, popup.config.closingTimeout);
			}
		}
	};

	const closeAllPopups = (excludeId?: string) => {
		popups.value
			.map((popup) => popup.id)
			.filter((popupId) => popupId !== excludeId)
			.forEach((id) => close({ id }));
	};

	const updatePopup = (id: string, updates: PopupUpdate) => {
		const popup = popups.value.find((p) => p.id === id);
		if (!popup) {
			return;
		}

		if (updates.title !== undefined) {
			popup.title = updates.title;
		}
		if (updates.description !== undefined) {
			popup.description = updates.description;
		}
		if (updates.actions !== undefined) {
			popup.actions = updates.actions;
		}
		if (updates.props !== undefined) {
			popup.props = {
				...popup.props,
				...updates.props,
			};
		}
		if (updates.config !== undefined) {
			popup.config = {
				...popup.config,
				...updates.config,
			};
		}
	};

	const updatePopupTitle = (id: string, title: string) => {
		updatePopup(id, { title });
	};

	return {
		popups,
		open: show,
		show,
		showPopup: show,
		showFormPopup: show,
		hidePopup: (id: string) => close({ id }),
		closePopup: close,
		close: (id: string) => close({ id }),
		updatePopup,
		updatePopupTitle,
		closeAllPopups,
		resetPopupState, // Expose reset method
	};
};

export const popupService: PopupService = usePopupService();

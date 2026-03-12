// ─── Components ──────────────────────────────────────────────────────────────
export { default as Button } from './components/Button/Button.vue';
export { default as ButtonGroup } from './components/Button/ButtonGroup.vue';
export { ButtonVariant, ButtonSize } from './components/Button/Button.model';

export { default as Card } from './components/Card/Card.vue';
export { default as CardGroup } from './components/Card/CardGroup.vue';
export { CardType, CardColor } from './components/Card/Card.model';

export { default as Icon } from './components/Icon/Icon.vue';

export { default as Input } from './components/Input/Input.vue';

export { default as Field } from './components/Field/Field.vue';

export { default as Toast } from './components/Toast/Toast.vue';
export { toastService } from './components/Toast/Toast.service';
export type { ToastOptions } from './components/Toast/Toast.model';

export { default as Popup } from './components/Popup/Popup.vue';
export { default as PopupSlot } from './components/Popup/PopupSlot.vue';
export { default as PopupWrapper } from './components/Popup/PopupWrapper.vue';
export { popupService } from './components/Popup/Popup.service';

export { default as Tooltip } from './components/Tooltip/Tooltip.vue';
export type { TooltipOptions } from './components/Tooltip/Tooltip.model';

export { default as Notification } from './components/Notification/Notification.vue';

export { default as AuthModal } from './components/AuthModal/AuthModal.vue';

// ─── Types ───────────────────────────────────────────────────────────────────
export type { Color, IconNameOrString } from './types';
export { Size, Status, NotificationStatus, Icons } from './types';

// ─── Icon setup ──────────────────────────────────────────────────────────────
export function setupIcons(_app: unknown): void {
  // Icons are loaded dynamically via open-icon-svg + vite-plugin-open-icon
  // No runtime registration needed
}

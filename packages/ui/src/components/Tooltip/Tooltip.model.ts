import type { Color } from '../../types';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' | 'manual';

export type TooltipAction = {
	key?: string | number;
	label: string;
	disabled?: boolean;
	color?: Color;
	action?: () => void;
};

export type TooltipOptions = {
	text?: string;
	html?: string;
	color?: Color | 'default';
	placement?: TooltipPlacement;
	trigger?: TooltipTrigger;
	multiline?: boolean;
	maxWidth?: number | string;
	openDelay?: number;
	closeDelay?: number;
	showArrow?: boolean;
	actions?: TooltipAction[];
	disabled?: boolean;
};

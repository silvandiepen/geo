import { Color } from '../../types';
import { Size } from '../../types';
import { NotificationStatus, Status } from '../../types';
import { Icons } from '../../types';
import type { IconNameOrString } from '../Icon/Icon.model';
import type { TooltipOptions } from '../Tooltip/Tooltip.model';
import type { RouteLocationRaw } from 'vue-router';

export type ButtonRouteLocation = RouteLocationRaw & {
	split?: boolean;
	splitBreakpoint?: number;
};

export const ButtonVariant = {
	DEFAULT: 'default',
	GHOST: 'ghost',
	OUTLINE: 'outline',
	NAKED: 'naked',
};
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = Size;
export type ButtonSize = Size;

export interface ButtonProps {
	label: string;
	to?: ButtonRouteLocation | null;
	color: Color;
	status: NotificationStatus | Status | null;
	variant: ButtonVariant;
	buttonType?: 'button' | 'submit' | 'reset';
	component: 'button' | 'a' | 'router-link';
	size: Size;
	fullWidth?: boolean;
	action?: () => void;
	disabled?: boolean;
	icon?: IconNameOrString;
	hoverIcon?: IconNameOrString;
	endIcon?: IconNameOrString;
	tooltip?: string | TooltipOptions;
}

export const ButtonIcon = Icons;

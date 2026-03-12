import { Color } from '@/types/color';
import { Size } from '@/types/size';
import { NotificationStatus, Status } from '@/types/status';
import { Icons } from '@/types/icons';
import type { IconNameOrString } from '../Icon/Icon.model';
import type { TooltipOptions } from '@/components/ui/Tooltip/Tooltip.model';
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

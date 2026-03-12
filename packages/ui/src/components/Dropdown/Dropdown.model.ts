import { Color, Status } from '@/types';
import type { IconType } from '@/components/ui/Icon/Icon.model';

export type DropdownItem = {
	label: string;
	value: string | number;
	type: 'item';
	active?: boolean;
	selected?: boolean;
	muted?: boolean;
	key?: string | number;
	icon?: IconType;
	color?: Color;
	status?: Status;
	disabled?: boolean;
	divider?: boolean;
	action?: (item: DropdownItem) => void;
};

export type DropdownDivider = {
	type: 'divider';
};

export type DropdownOption = DropdownItem | DropdownDivider;

export type DropdownAlign = 'left' | 'right';

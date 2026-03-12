import {
	Color,
	Size,
	type Color as ColorType,
} from '@/types';
import type { IconNameOrString } from '@/types';

export const CardType = {
	DEFAULT: 'default',
	RAISED: 'raised',
	OUTLINE: 'outline',
	GHOST: 'ghost',
	PLAIN: 'plain',
};

export const CardColor = Color;

type CardType = (typeof CardType)[keyof typeof CardType];

export interface BaseCardProps {
	/**
	 * The type of card to display
	 */
	type: CardType;

	/**
	 * The color theme of the card
	 */
	color: ColorType;

	/**
	 * The color theme of the card
	 */
	themeColor: ColorType;

	/**
	 * The title of the card
	 */
	title?: string;

	/**
	 * The subtitle of the card
	 */
	subTitle?: string;

	/**
	 * The description of the card
	 */
	description?: string;

	/**
	 * The category of the card
	 */
	category?: string;

	/**
	 ** Whether the card should be sticky
	 */
	sticky?: boolean;

	/**
	 * Whether the header should be sticky
	 **/
	stickyHeader?: boolean;

	/**
	 * The size of the card
	 */
	size: Size;

	/**
	 * The icon to display in the header
	 */
	icon?: IconNameOrString | null;
}

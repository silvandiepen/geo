import {
	OPEN_ICON_ALIAS_TO_NAME,
	OPEN_ICON_CATEGORIES,
	OPEN_ICON_CATEGORY_TO_NAMES,
	OPEN_ICON_KEY_TO_NAME,
	OPEN_ICON_NAME_TO_FILE,
	OPEN_ICON_NAMES,
} from 'open-icon-svg';
import type { OpenIconName } from 'open-icon-svg';

export {
	OPEN_ICON_ALIAS_TO_NAME,
	OPEN_ICON_CATEGORIES,
	OPEN_ICON_CATEGORY_TO_NAMES,
	OPEN_ICON_KEY_TO_NAME,
	OPEN_ICON_NAME_TO_FILE,
	OPEN_ICON_NAMES,
};

export type IconName = OpenIconName;
export type IconType = OpenIconName;
export type IconNameOrString = OpenIconName | string;

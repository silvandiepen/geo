import { popupService } from './Popup.service';

export const closeAllPopups = (excludeId?: string) => {
	popupService.closeAllPopups(excludeId);
};

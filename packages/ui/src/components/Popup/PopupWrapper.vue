<template>
	<div class="popup-wrapper">
		<div class="popup-trigger" @click="openModal">
			<slot name="trigger"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { popupService } from './Popup.service';
import type { PopupOptions } from './Popup.model';
import { useSlots } from 'vue';
import type { PropType } from 'vue';

const slots = useSlots();

const props = defineProps({
	id: {
		type: String,
		default: 'popup-wrapper',
	},
	title: {
		type: String,
		default: '',
	},
	config: {
		type: Object as PropType<Partial<PopupOptions>>,
		default: () => ({}),
	},
});

const openModal = () => {
	if (!(slots as any).content) {
		console.warn('No content slot provided for popup');
		return;
	}

	const popupSlots: Record<string, any> = {};

	// Pass through the footer slot if it exists
	if ((slots as any).footer) {
		popupSlots.footer = (slots as any).footer;
	}

	popupService.showPopup({
		id: props.id,
		title: props.title,
		...props.config,
		component: (slots as any).content
			? (slots as any).content
			: props.config.component,
		slots: popupSlots,
	});
};
</script>

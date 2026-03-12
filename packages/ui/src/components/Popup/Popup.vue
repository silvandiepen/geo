<!-- Popup.vue -->
<template>
	<Teleport to="body">
		<div
			v-for="popup in popups"
			:id="popup.id"
			:key="popup.id"
			:class="[
				bemm(''),
				bemm('', popup.config.position),
				bemm('', popup.config.hasBackground ? 'has-background' : ''),
				bemm('', `stack-${popup.id}`),
				bemm('', popup.state.closing ? 'closing' : ''),
			]"
		>
			<div
				v-if="popup.config.hasBackground"
				:class="bemm('background')"
				@click="
					popup.config.canClose
						? popupService.closePopup({ id: popup.id })
						: null
				"
			></div>
			<div :class="bemm('wrapper')">
				<div
					:class="bemm('container')"
					:style="{
						'--popup-width': popup.config.width,
						'--popup-overflow': popup.config.overflow || 'auto',
					}"
				>
					<div :class="bemm('popup')">
						<header
							v-if="hasSlot('header') || popup.title"
							:class="bemm('header')"
						>
							<h4 v-if="popup.title" :class="bemm('header-title')">
								{{ popup.title }}
							</h4>
							<p v-if="popup.description" :class="bemm('header-description')">
								{{ popup.description }}
							</p>
							<slot name="header"></slot>
							<Button
								v-if="popup.config.canClose"
								:class="bemm('close')"
								:icon="Icons.CLEAR"
								:iconOnly="true"
								:size="ButtonSize.SMALL"
								:variant="'ghost'"
								@click="popupService.close(popup.id)"
							/>
							<component :is="popup.header" v-if="popup.header" />
						</header>

						<div :class="bemm('content')">
							<component
								v-bind="popup.props"
								:is="popup.component"
								:key="popup.id"
								:popup-id="popup.id"
								:ref="
									(el: ComponentPublicInstance | null) =>
										(popupRefs[popup.id] = el)
								"
								@close="popupService.close(popup.id)"
							>
								<template
									v-for="(slot, name) in popup.slots"
									:key="name"
									#[name]
								>
									<component :is="slot" />
								</template>
							</component>
						</div>

						<footer
							v-if="hasSlot('footer') || popup.footer || popup.actions?.length"
							:class="bemm('footer')"
						>
							<slot name="footer"></slot>
							<component
								:is="popup.footer"
								v-if="popup.footer"
								v-bind="popup.props"
								@close="popupService.closePopup({ id: popup.id })"
							/>

							<!-- Render actions if provided -->
							<div
								v-if="popup.actions?.length && !popup.footer"
								:class="bemm('actions')"
							>
								<Button
									v-for="action in popup.actions"
									:key="action.id"
									:type="(action.type as any) || 'button'"
									:color="action.color || Color.PRIMARY"
									:icon="action.icon"
									:disabled="action.disabled"
									:loading="action.loading"
									@click="action.action"
									:class="bemm('action')"
								>
									{{ action.label }}
								</Button>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { useBemm } from 'bemm';
import { popupService, popupRefs } from './Popup.service';
import { Icons } from '@/types';
import { eventBus } from '@/utils/eventBus';
import { Button, ButtonSize } from '@/components/ui/Button';
import { Color } from '@/types';
import {
	type ComponentPublicInstance,
	computed,
	useSlots,
	onMounted,
	onUnmounted,
} from 'vue';

const bemm = useBemm('popup');

const popups = computed(() => {
	return popupService.popups.value;
});

// Event handlers
const handleKeyPress = (data: { key: string }) => {
	if (data.key !== 'Escape') {
		return;
	}
	const topPopup = popups.value[popups.value.length - 1];
	if (!topPopup || !topPopup.config.canClose) {
		return;
	}
	popupService.close(topPopup.id);
};

const handlePopupOpen = (data: {
	component: any;
	id?: string;
	[key: string]: any;
}) => {
	if (data.id) {
		popupService.showPopup({ ...data, component: data.component });
	}
};

const handlePopupClose = (data: { id?: string }) => {
	if (data.id) {
		popupService.closePopup({ id: data.id });
	}
};

const handlePopupForceClose = () => {
	popupService.closeAllPopups();
};

const handleDocumentKeydown = (event: KeyboardEvent) => {
	if (event.key !== 'Escape') {
		return;
	}
	const topPopup = popups.value[popups.value.length - 1];
	if (!topPopup || !topPopup.config.canClose) {
		return;
	}
	popupService.close(topPopup.id);
};

// Setup event listeners
onMounted(() => {
	// Listen for escape key press (using a generic key event)
	eventBus.on('app:key', handleKeyPress);
	document.addEventListener('keydown', handleDocumentKeydown);

	// Popup-specific events (these would need to be added to TikoEvents)
	// For now, using app-level events as placeholders
	eventBus.on('app:popup-open', handlePopupOpen);
	eventBus.on('app:popup-close', handlePopupClose);
	eventBus.on('app:popup-force-close', handlePopupForceClose);
});

// Cleanup event listeners
onUnmounted(() => {
	eventBus.off('app:key', handleKeyPress);
	document.removeEventListener('keydown', handleDocumentKeydown);
	eventBus.off('app:popup-open', handlePopupOpen);
	eventBus.off('app:popup-close', handlePopupClose);
	eventBus.off('app:popup-force-close', handlePopupForceClose);
});

const $slots = useSlots();
const hasSlot = (name: string): boolean => {
	return !!($slots as any)[name];
};
</script>

<style lang="scss">
.popup {
	$b: &;
	--popup-ease: var(--bezier, cubic-bezier(0.22, 1, 0.36, 1));
	--popup-border-radius: var(--border-radius);
	position: fixed;
	z-index: 100;
	margin: 0 auto;

	top: 0;
	left: 0;
	inset: 0;
	background-color: transparent;
	height: calc(100vh + 2em); // Fallback for browsers without svh support
	height: calc(100svh + 2em);
	width: calc(100vw + 2em); // Fallback for browsers without svw support
	width: calc(100svw + 2em);
	border: none;

	display: flex;
	overflow: scroll;

	// Stack popups using their unique IDs
	&--stack {
		z-index: calc(100 + var(--popup-stack-index, 0));
	}

	&__background {
		position: fixed;
		top: 0;
		inset: 0;
		background-color: color-mix(in srgb, var(--color-dark), transparent 80%);
		backdrop-filter: blur(5px);
		opacity: 0;
		animation: backgroundFadeIn 0.3s var(--popup-ease) both;
		height: 100vh; // Fallback
		height: 100svh;
		width: 100vw; // Fallback
		width: 100svw;
	}

	&__wrapper {
		width: 100vw; // Fallback
		width: 100svw;
		margin: auto;
		overflow: scroll;
		height: 100vh; // Fallback
		height: 100svh;
		max-height: 100vh; // Fallback
		max-height: 100svh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space);

		// iPad specific constraints
		@media (max-width: 1024px) and (orientation: landscape) {
			padding: var(--space-s);
		}
	}

	&__container {
		position: relative;
		margin: auto;
		z-index: var(--popup-container-z-index, 6);
		border-radius: var(--popup-border-radius, var(--border-radius-l));
		height: fit-content;
		max-height: calc(100vh - var(--space-xl) * 2); // Fallback
		max-height: calc(100svh - var(--space-xl) * 2);
		color: var(--popup-container-color, var(--color-foreground));
		max-width: min(
			var(--popup-width, 960px),
			calc(100vw - var(--spacing))
		); // Fallback
		max-width: min(var(--popup-width, 960px), calc(100svw - var(--spacing)));
		width: var(--popup-width, fit-content);
		min-width: 320px;
		animation: containerComeIn 0.3s var(--popup-ease) both;
		transform: scale(0.9) translateY(var(--spacing));
		opacity: 0;
		overflow: var(--popup-overflow, auto);
		display: flex;
		flex-direction: column;
		box-shadow: 0 10px 40px
			color-mix(in srgb, var(--color-dark), transparent 80%);

		scroll-behavior: smooth;
		-ms-overflow-style: -ms-autohiding-scrollbar;

		scrollbar-width: thin;
		scrollbar-gutter: 0;
		scrollbar-track-color: transparent;

		scrollbar-color: var(--color-primary)
			color-mix(in srgb, var(--color-foreground), transparent 90%);

		// @include g.mobile-only() {
		//   max-width: 100%;
		//   max-height: calc(100vh - var(--space-l) * 2); // Fallback
		//   max-height: calc(100svh - var(--space-l) * 2);
		// }

		// iPad specific
		@media (max-width: 1024px) {
			max-height: calc(100vh - var(--space-l) * 2); // Fallback
			max-height: calc(100svh - var(--space-l) * 2);
		}

		// iPad landscape
		@media (max-width: 1024px) and (orientation: landscape) {
			max-height: calc(100vh - var(--space) * 2); // Fallback
			max-height: calc(100svh - var(--space) * 2);
		}
	}

	&__popup {
		z-index: 5;
		border-radius: var(--popup-border-radius, var(--border-radius));
		padding: 1px;

		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: color-mix(in srgb, var(--color-foreground), transparent 90%);
			border-radius: 3px;
		}
	}

	&__content {
		padding: var(--popup-padding, var(--space-l));
		margin: auto;
		overflow-y: var(--popup-overflow, auto);
		flex: 1;
		min-height: 0;
		border-radius: var(--int-popup-content-border-radius-top-left)
			var(--int-popup-content-border-radius-top-right)
			var(--int-popup-content-border-radius-bottom-right)
			var(--int-popup-content-border-radius-bottom-left);
		background: var(--popup-container-background, var(--color-background));
	}

	&__header + #{$b} &__close {
		--button-background-color: transparent;
		--button-background-color--hover: var(--color-tertiary);
		position: absolute;
		z-index: 5;
		margin: 0 !important;
		top: calc(var(--popup-padding, var(--space)));
		right: calc(var(--popup-padding, var(--space)));
	}

	&--bottom {
		.popup__wrapper {
			align-items: flex-end;
		}
	}

	&--top {
		.popup__wrapper {
			align-items: flex-start;
		}
	}

	&__header {
		padding: var(--popup-padding, var(--space));
		border-radius: inherit;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		border-bottom: 1px solid
			color-mix(in srgb, var(--color-tertiary), transparent 80%);
		background-color: color-mix(
			in srgb,
			var(--color-tertiary),
			var(--color-background) 90%
		);
		z-index: 10;
		position: sticky;
		top: 0;
		display: flex;
		gap: var(--space);
		align-items: flex-start;
		flex-direction: row;
		justify-content: space-between;

		&:has(.popup__close) {
			padding-right: var(--space-xl);
		}
	}

	&__header-title {
		font-size: 1em;
		font-weight: 600;
		color: var(--color-tertiary);
	}

	&__close {
		margin: 0;
		position: absolute;
		right: var(--space);
		top: 50%;
		transform: translateY(-50%);
	}

	&__footer {
		padding: var(--popup-padding, var(--space));

		border-radius: inherit;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-top: 1px solid
			color-mix(in srgb, var(--color-tertiary), transparent 80%);

		background-color: color-mix(
			in srgb,
			var(--color-tertiary),
			var(--color-background) 90%
		);
		z-index: 10;
		position: sticky;
		bottom: 0;
		flex-shrink: 0;

		display: flex;
		gap: var(--space);
		align-items: center;
		justify-content: flex-end;

		&:has(.popup__close) {
			padding-right: var(--space-xl);
		}
	}

	&__actions {
		display: flex;
		gap: var(--space-s);
		align-items: center;
		justify-content: flex-end;
		width: 100%;

		@media (max-width: 480px) {
			flex-direction: column-reverse;
			gap: var(--space-xs);

			.popup__action {
				width: 100%;
			}
		}
	}

	&__action {
		// Individual action button styles if needed
	}

	&--closing {
		.popup__container {
			animation: containerGoAway 0.3s var(--popup-ease) forwards;
		}

		.popup__background {
			pointer-events: none;
			animation: backgroundFadeOut 0.3s var(--popup-ease) forwards;
		}
	}

	--int-popup-content-border-radius-top-left: var(--popup-border-radius);
	--int-popup-content-border-radius-top-right: var(--popup-border-radius);
	--int-popup-content-border-radius-bottom-left: var(--popup-border-radius);
	--int-popup-content-border-radius-bottom-right: var(--popup-border-radius);

	&:has(.popup__header) {
		--int-popup-content-border-radius-top-left: 0;
		--int-popup-content-border-radius-top-right: 0;
	}
	&:has(.popup__footer) {
		--int-popup-content-border-radius-bottom-left: 0;
		--int-popup-content-border-radius-bottom-right: 0;
	}
}

@media (prefers-reduced-motion: reduce) {
	.popup__container {
		animation: containerComeIn 0.15s linear both;
	}
	.popup__background {
		animation: backgroundFadeIn 0.15s linear both;
	}
}

@keyframes backgroundFadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes backgroundFadeOut {
	to {
		opacity: 0;
	}
}

@keyframes containerComeIn {
	from {
		transform: scale(0.9) translateY(var(--spacing));
		opacity: 0;
	}
	to {
		transform: scale(1) translateY(0);
		opacity: 1;
	}
}

@keyframes containerGoAway {
	to {
		transform: scale(0.75) translateY(100%);
		opacity: 0;
	}
}

// Just for in content use

.popup-content-footer {
	position: sticky;
	bottom: 0;
	padding: var(--space);
	left: 0;
	background-color: color-mix(in srgb, var(--color-dark), transparent 50%);
	border: 1px solid color-mix(in srgb, var(--color-primary), transparent 50%);
	backdrop-filter: blur(10px);

	border-radius: var(--border-radius);
	&:before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 100%;
		height: 100px;
		width: 100%;
		background-image: radial-gradient(
			50% 50% at 50% 100%,
			rgba(0, 0, 0, 0.5),
			transparent
		);
		pointer-events: none;
	}
}
.popup__content:has(.popup-content-footer) {
	max-height: 80vh;
	height: fit-content;
}
</style>

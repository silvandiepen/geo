<template>
	<Teleport to="body">
		<TransitionGroup name="toast" tag="div" class="toast-container">
			<div
				v-for="toast in toasts"
				:key="toast.id"
				:class="bemm('', ['', toast.type || '', toast.position || ''])"
				:role="getRole(toast.type)"
				:aria-live="getAriaLive(toast.type)"
				:style="`--toast-color: var(--color-${toast.type})`"
			>
				<div :class="bemm('content')">
					<Icon v-if="toast.icon" :class="bemm('icon')" :name="toast.icon" />
					<div :class="bemm('body')">
						<div v-if="toast.title" :class="bemm('title')">
							{{ toast.title }}
						</div>
						<div :class="bemm('message')">
							{{ toast.message }}
						</div>
					</div>
				</div>
				<button
					v-if="toast.dismissible"
					:class="bemm('close')"
					@click="dismiss(toast.id)"
					:aria-label="$t('common.aria.closeNotification')"
				>
					<Icon name="close" size="small" />
				</button>
			</div>
		</TransitionGroup>
	</Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBemm } from 'bemm';
import { ToastType } from './Toast.model';
import { toastService } from './Toast.service';

import { Icon } from '../Icon';

const { bemm } = useBemm('toast');

const toasts = computed(() => {
	return toastService.toasts.value;
});

const getRole = (type?: ToastType) => {
	return type === ToastType.ERROR ? 'alert' : 'status';
};

const getAriaLive = (type?: ToastType) => {
	return type === ToastType.ERROR ? 'assertive' : 'polite';
};

const dismiss = (id: string) => {
	toastService.hide(id);
};
</script>

<style lang="scss">
.toast-container {
	position: fixed;
	z-index: 9999;
	pointer-events: none;
	bottom: 0;
	left: 0;

	> * {
		pointer-events: auto;
	}
}

.toast {
	--toast-border-color: color-mix(
		in srgb,
		var(--toast-color),
		var(--color-background) 50%
	);
	--toast-background-color: color-mix(
		in srgb,
		var(--toast-color),
		var(--color-background) 90%
	);
	--toast-text-color: color-mix(
		in srgb,
		var(--toast-color),
		var(--color-foreground) 20%
	);

	position: fixed;
	display: flex;
	align-items: center;
	gap: var(--space-m);
	padding: var(--space-m);
	border-radius: var(--border-radius-m);
	max-width: 400px;
	width: fit-content;
	z-index: 9999;
	border: 1px solid var(--toast-border-color);
	background-color: var(--toast-background-color);
	color: var(--toast-text-color);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	margin: var(--space-m);

	&-enter-active,
	&-leave-active {
		transition: all 0.3s ease;
	}

	&-enter-from {
		opacity: 0;
		transform: translateY(-20px);
	}

	&-leave-to {
		opacity: 0;
		transform: translateX(20px);
	}

	&--top {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	&--bottom {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	&--top-left {
		top: 0;
		left: 0;
	}

	&--top-right {
		top: 0;
		right: 0;
	}

	&--bottom-left {
		bottom: 0;
		left: 0;
	}

	&--bottom-right {
		bottom: 0;
		right: 0;
	}

	&--success {
		--toast-color: var(--color-success);
	}

	&--error {
		--toast-color: var(--color-error);
	}

	&--warning {
		--toast-color: var(--color-warning);
	}

	&--info {
		--toast-color: var(--color-primary);
	}

	&--default {
		--toast-color: var(--color-primary);
	}

	&__content {
		display: flex;
		align-items: flex-start;
		gap: var(--space-m);
		flex: 1;
	}

	&__icon {
		font-size: 1.25rem;
		color: var(--toast-color);
		flex-shrink: 0;
		margin-top: 2px;
	}

	&__body {
		flex: 1;
	}

	&__title {
		font-weight: 600;
		margin-bottom: var(--space-xs);
		color: var(--color-foreground);
	}

	&__message {
		line-height: 1.5;
	}

	&__close {
		flex-shrink: 0;
		background: none;
		border: none;
		padding: var(--space-xs);
		cursor: pointer;
		color: var(--toast-text-color);
		opacity: 0.7;
		transition: opacity var(--transition-fast);
		border-radius: var(--border-radius-s);

		&:hover {
			opacity: 1;
			background: color-mix(in srgb, var(--toast-color), transparent 90%);
		}
	}
}

// Stack toasts vertically
.toast--top-right {
	&:not(:first-child) {
		margin-top: calc(var(--space-m) * 4);
	}
}

.toast--top-left {
	&:not(:first-child) {
		margin-top: calc(var(--space-m) * 4);
	}
}

.toast--bottom-right {
	&:not(:first-child) {
		margin-bottom: calc(var(--space-m) * 4);
	}
}

.toast--bottom-left {
	&:not(:first-child) {
		margin-bottom: calc(var(--space-m) * 4);
	}
}
</style>

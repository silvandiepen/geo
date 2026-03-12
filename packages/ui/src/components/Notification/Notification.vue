<template>
	<article
		:class="bemm('', [status])"
		:role="role"
		:aria-live="ariaLive"
		:style="`--notification-color: var(--color-${status})`"
	>
		<Icon :name="resolvedIcon" :class="bemm('icon')" />
		<div :class="bemm('content')">
			<p v-if="title" :class="bemm('title')">{{ title }}</p>
			<p :class="bemm('message')">
				<slot>{{ message }}</slot>
			</p>
		</div>
	</article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBemm } from 'bemm';
import { Icon } from '@/components/ui/Icon';
import { Icons, type IconNameOrString } from '@/types';
import {
	NotificationStatus,
	type NotificationStatus as NotificationStatusType,
} from './Notification.model';

const props = withDefaults(
	defineProps<{
		status?: NotificationStatusType;
		title?: string;
		message?: string;
		icon?: IconNameOrString | null;
	}>(),
	{
		status: NotificationStatus.INFO,
		title: '',
		message: '',
		icon: null,
	}
);

const bemm = useBemm('sil-notification', {
	return: 'string',
	includeBaseClass: true,
});

const statusIcons: Record<NotificationStatusType, IconNameOrString> = {
	[NotificationStatus.INFO]: Icons.INFO,
	[NotificationStatus.SUCCESS]: Icons.CHECK_CIRCLE,
	[NotificationStatus.WARNING]: Icons.EXCLAMATION,
	[NotificationStatus.ERROR]: Icons.CROSS,
};

const resolvedIcon = computed(
	() => props.icon || statusIcons[props.status] || Icons.INFO
);

const role = computed(() =>
	props.status === NotificationStatus.ERROR ? 'alert' : 'status'
);

const ariaLive = computed(() =>
	props.status === NotificationStatus.ERROR ? 'assertive' : 'polite'
);
</script>

<style lang="scss">
.sil-notification {
	--notification-color: var(--color-info);
	--notification-bg-color: color-mix(
		in srgb,
		var(--notification-color),
		transparent 90%
	);
	--notification-text-color: color-mix(
		in srgb,
		var(--notification-color),
		var(--color-foreground) 80%
	);

	display: flex;
	align-items: flex-start;
	gap: var(--space-s);
	padding: var(--space-s) var(--space-m);
	border: 1px solid var(--notification-color);
	border-radius: var(--border-radius);
	background: var(--notification-bg-color);
	color: var(--notification-text-color);

	&--info {
		--notification-color: var(--color-info);
	}

	&--success {
		--notification-color: var(--color-success);
	}

	&--warning {
		--notification-color: var(--color-warning);
	}

	&--error {
		--notification-color: var(--color-error);
	}

	&__icon {
		color: var(--notification-color);
		font-size: var(--font-size-m);
		margin-top: 2px;
		flex-shrink: 0;
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	&__title {
		margin: 0;
		font-size: var(--font-size-s);
		font-weight: var(--font-weight-bold);
	}

	&__message {
		margin: 0;
		font-size: var(--font-size-s);
		line-height: 1.4;
	}
}
</style>

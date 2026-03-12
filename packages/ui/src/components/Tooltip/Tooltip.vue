<template>
	<span
		v-if="!props.disabled && hasContent"
		ref="panelRef"
		role="tooltip"
		:class="tooltipClasses"
		:style="tooltipStyles"
		@click.stop
	>
		<span v-if="props.showArrow" :class="bemm('arrow')"></span>
		<span :class="bemm('content')">
			<slot v-if="$slots.content" name="content"></slot>
			<span v-else-if="props.html" v-html="props.html"></span>
			<span v-else>{{ props.text }}</span>
		</span>
		<span v-if="hasActions" :class="bemm('actions')">
			<button
				v-for="(action, index) in props.actions"
				:key="action.key ?? `${action.label}-${index}`"
				type="button"
				:class="bemm('action', [action.color ? `color-${action.color}` : ''])"
				:disabled="action.disabled"
				@click="onActionClick(action)"
			>
				{{ action.label }}
			</button>
		</span>
	</span>
</template>

<script lang="ts" setup>
import { computed, ref, watch, nextTick, useSlots } from 'vue';
import { useBemm } from 'bemm';
import type { Color } from '../../types';
import type { TooltipAction, TooltipOptions } from './Tooltip.model';

defineOptions({
	name: 'ArTooltip',
});

const props = withDefaults(
	defineProps<
		TooltipOptions & {
			open?: boolean;
			showOnParentHover?: boolean;
		}
	>(),
	{
		text: '',
		html: '',
		color: 'default',
		placement: 'top',
		multiline: false,
		maxWidth: 280,
		showArrow: true,
		actions: () => [],
		disabled: false,
		open: true,
		showOnParentHover: false,
	}
);

const emit = defineEmits<{
	(e: 'action-click', action: TooltipAction): void;
}>();
const slots = useSlots();

const bemm = useBemm('sil-tooltip', {
	return: 'string',
	includeBaseClass: true,
});

const hasActions = computed(
	() => Array.isArray(props.actions) && props.actions.length > 0
);
const isMultiline = computed(
	() => props.multiline || (props.text || '').includes('\n')
);
const hasContent = computed(() =>
	Boolean(props.text || props.html || hasActions.value || slots.content)
);

const tooltipClasses = computed(() =>
	bemm('panel', [
		props.placement,
		isMultiline.value ? 'multiline' : 'single',
		props.open ? 'open' : 'closed',
		props.showOnParentHover ? 'parent-hover' : 'manual',
	])
);

const resolvedColor = computed(() => {
	if (!props.color || props.color === 'default') {
		return {
			background: 'var(--color-foreground)',
			text: 'var(--color-background)',
		};
	}
	const tone = props.color as Color;
	return {
		background: `var(--color-${tone})`,
		text: `var(--color-${tone}-contrast)`,
	};
});

const tooltipStyles = computed(() => ({
	'--tooltip-bg': resolvedColor.value.background,
	'--tooltip-fg': resolvedColor.value.text,
	'--tooltip-max-width':
		typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
}));

const panelRef = ref<HTMLElement | null>(null);

watch(
	() => props.open,
	(open) => {
		if (!open) return;
		nextTick(() => {
			const el = panelRef.value;
			if (!el) return;
			el.style.marginLeft = '';
			const rect = el.getBoundingClientRect();
			const overflowRight = rect.right - window.innerWidth;
			const overflowLeft = -rect.left;
			if (overflowRight > 0) {
				el.style.marginLeft = `${-overflowRight - 8}px`;
			} else if (overflowLeft > 0) {
				el.style.marginLeft = `${overflowLeft + 8}px`;
			}
		});
	}
);

const onActionClick = (action: TooltipAction) => {
	if (action.disabled) return;
	action.action?.();
	emit('action-click', action);
};
</script>

<style lang="scss">
.sil-tooltip {
	&__panel {
		position: absolute;
		z-index: 100;
		background: var(--tooltip-bg);
		color: var(--tooltip-fg);
		border-radius: var(--border-radius);
		padding: var(--space-xs) var(--space-s);
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
		max-width: var(--tooltip-max-width);
		font-size: var(--font-size-xs);
		line-height: 1.35;
		white-space: nowrap;
		display: inline-flex;
		flex-direction: column;
		gap: var(--space-xs);
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 0.2s var(--bezier),
			transform 0.2s var(--bezier);

		&--open {
			pointer-events: auto;
			animation: showTooltip 0.2s var(--bezier) forwards;
		}

		&--parent-hover {
			opacity: 0;
			pointer-events: none;
		}

		&--parent-hover#{&}--open {
			animation: showTooltip 0.2s var(--bezier) forwards;
			pointer-events: auto;
		}

		:where(*:hover, *:focus-within, *:active) > &--parent-hover {
			animation: showTooltip 0.2s var(--bezier) forwards;
			pointer-events: auto;
		}

		&--multiline {
			white-space: pre-line;
			word-wrap: break-word;
			width: max-content;
			max-width: min(var(--tooltip-max-width), 90vw);
		}

		@keyframes showTooltip {
			to {
				opacity: 1;
				transform: var(--to, translate(-50%, -50%));
			}
		}

		&--top {
			bottom: calc(100% + var(--space-xs));
			left: 50%;
			transform: translate(-50%, 50%);
			--to: translate(-50%, 0%);
		}

		&--bottom {
			top: calc(100% + var(--space-xs));
			left: 50%;
			transform: translate(-50%, -50%);
			--to: translate(-50%, 0%);
		}

		&--left {
			right: calc(100% + var(--space-xs));
			top: 50%;
			transform: translate(50%, -50%);
			--to: translate(0%, -50%);
		}

		&--right {
			left: calc(100% + var(--space-xs));
			top: 50%;
			transform: translate(-50%, -50%);
			--to: translate(0%, -50%);
		}
	}

	&__arrow {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--tooltip-bg);
		transform: rotate(45deg);
	}

	&__panel--top &__arrow {
		left: 50%;
		bottom: -4px;
		transform: translateX(-50%) rotate(45deg);
	}

	&__panel--bottom &__arrow {
		left: 50%;
		top: -4px;
		transform: translateX(-50%) rotate(45deg);
	}

	&__panel--left &__arrow {
		right: -4px;
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
	}

	&__panel--right &__arrow {
		left: -4px;
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
	}

	&__content {
		display: block;
	}

	&__actions {
		display: inline-flex;
		gap: var(--space-xs);
	}

	&__action {
		border: 0;
		background: color-mix(in srgb, var(--tooltip-fg), transparent 88%);
		color: var(--tooltip-fg);
		padding: 2px var(--space-s);
		border-radius: var(--border-radius-s);
		cursor: pointer;
		font-size: var(--font-size-xs);

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
}
</style>

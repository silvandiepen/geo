<template>
	<div :class="cardClasses" :style="cardStyles">
		<header
			:class="bemm('header')"
			v-if="$slots.header || $slots.actions || title"
		>
			<div :class="bemm('header-container')" v-if="$slots.header || title">
				<slot name="header">
					<div :class="bemm('header-title')">
						<Icon v-if="icon" :name="icon" :class="bemm('icon')"></Icon>
						<h3 v-if="title" :class="bemm('title')">{{ title }}</h3>
					</div>
					<h4 v-if="subTitle" :class="bemm('category')">{{ subTitle }}</h4>
					<p v-if="description" :class="bemm('description')">
						{{ description }}
					</p>
				</slot>
			</div>

			<div :class="bemm('actions')" v-if="$slots.actions">
				<slot name="actions"></slot>
			</div>
		</header>

		<div v-if="$slots.default" :class="bemm('body')">
			<slot></slot>
		</div>

		<slot name="raw-content"></slot>

		<footer :class="bemm('footer')" v-if="$slots.footer">
			<slot name="footer"></slot>
		</footer>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';
import { CardType, type BaseCardProps } from './Card.model';
import { useBemm } from 'bemm';
import { Color, Size } from '../../types';
import { Icon } from '../Icon';

const props = defineProps({
	type: {
		type: String as PropType<BaseCardProps['type']>,
		default: CardType.DEFAULT,
	},
	color: {
		type: String as PropType<BaseCardProps['color']>,
		default: Color.BACKGROUND,
	},
	themeColor: {
		type: String as PropType<BaseCardProps['themeColor']>,
		default: Color.SECONDARY,
	},
	title: {
		type: String as PropType<BaseCardProps['title']>,
		default: '',
	},
	subTitle: {
		type: String as PropType<BaseCardProps['subTitle']>,
		default: '',
	},
	description: {
		type: String as PropType<BaseCardProps['description']>,
		default: '',
	},
	category: {
		type: String as PropType<BaseCardProps['category']>,
		default: '',
	},
	sticky: {
		type: Boolean as PropType<BaseCardProps['sticky']>,
		default: false,
	},
	stickyHeader: {
		type: Boolean as PropType<BaseCardProps['stickyHeader']>,
		default: false,
	},
	size: {
		type: String as PropType<BaseCardProps['size']>,
		default: Size.LARGE,
	},
	icon: {
		type: String as PropType<BaseCardProps['icon']>,
		default: null,
	},
});

const bemm = useBemm('sil-card', {
	return: 'string',
	includeBaseClass: true,
});

const cardClasses = computed(() =>
	bemm('', [
		props.type,
		props.size,
		props.sticky ? 'sticky' : '',
		props.stickyHeader ? 'sticky-header' : '',
	])
);

const cardStyles = computed((): Record<string, string> => {
	if (!props.color) return {};

	const styles: Record<string, string> = {
		'--card-color': `var(--color-${props.color})`,
		'--card-text-color': `var(--color-${props.color}-contrast)`,
	};

	if (props.themeColor) {
		styles['--color-theme'] = `var(--color-${props.themeColor})`;
		styles['--color-theme-contrast'] = `var(--color-${props.themeColor}-contrast)`;
	}

	return styles;
});
</script>

<style lang="scss">
.sil-card {
	$b: &;

	--int-border-width: 1px;
	--int-card-border-color: var(
		--card-border-color,
		var(--card-color, color-mix(in srgb, currentColor, transparent 80%))
	);

	--int-card-background-color: color-mix(
		in srgb,
		var(--int-card-color, var(--card-color)),
		var(--color-background) 95%
	);

	border-radius: var(--border-radius-l);
	border: var(--int-border-width) solid var(--int-card-border-color);
	background-color: var(--int-card-background-color);
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;
	position: relative;
	container-type: inline-size;

	&:has(:focus) {
		z-index: 5;
	}

	&--raised {
		border-radius: var(--border-radius-xl);

		@supports (animation-timeline: view()) {
			animation: headerOpacity linear both;
			animation-timeline: view();
			animation-range: exit 0% exit 70%;
		}

		@keyframes headerOpacity {
			0% {
				opacity: 1;
				transform: scale(1);
			}
			100% {
				opacity: 0;
				transform: scale(0.95);
			}
		}
	}

	&--full-width {
		width: 100%;
		max-width: calc(100vw - (var(--space) * 3));
	}

	// Variants

	&--raised {
		--int-border-width: 1px;
		--int-card-padding: var(--space-l);
		--int-card-title-size: var(--font-size-xl);
		--int-card-header-background-color: color-mix(
			in srgb,
			var(--color-primary),
			transparent 97.5%
		);

		border: none;
		box-shadow: var(--card-shadow, 4px 4px 12px 0px rgba(0, 0, 0, 0.05));
	}

	@container (max-width: 400px) {
		&--raised {
			--int-card-padding: var(--space);
			--int-card-title-size: var(--font-size-l);
		}
	}

	&--default {
		--int-card-padding: var(--space-l);
		--int-border-width: 0;
		--int-card-header-background-color: transparent;

		border: none;
		background-color: var(--card-color);
		color: var(--card-text-color, var(--color-foreground));
	}

	&--outline {
		--int-card-padding: var(--space);
		--int-card-header-background-color: transparent;
		--int-card-border-color: color-mix(in srgb, currentColor, transparent 80%);
		--int-card-header-border: 1px solid
			color-mix(in srgb, currentColor, transparent 90%);
	}

	&--ghost {
		--int-card-padding: 0;
		--int-card-header-background-color: transparent;
		--int-card-color: transparent;
		gap: var(--space);
	}

	&--plain {
		--int-card-padding: var(--space);
		--int-card-background-color: color-mix(
			in srgb,
			var(--card-color),
			var(--color-background) 95%
		);
		--int-card-header-background-color: transparent;
		--int-card-border-color: transparent;
		gap: var(--space);
	}

	// Sizes

	&--small {
		--int-card-title-size: var(--font-size-s);
		&#{$b}--outline {
			--int-card-title-font-weight: 600;
			--int-card-border-color_header: transparent;
		}
		--int-card-header-align: center;
		--int-card-header-padding: var(--space) var(--space);
		--int-card-icon-size: 2em;
	}

	&--medium {
		--int-card-title-size: var(--font-size-m);
		--int-card-header-align: center;
		--int-card-header-padding: var(--space) var(--space);
		--int-card-icon-size: 2em;
	}

	&--large {
		--int-card-title-size: var(--font-size-l);
		--int-card-header-align: center;
		--int-card-header-padding: var(--space) var(--space);
		--int-card-icon-size: 2.5em;
	}

	&__header {
		padding: var(
			--card-padding,
			var(--int-card-header-padding, var(--int-card-padding, var(--space)))
		);

		display: flex;
		justify-content: space-between;
		align-items: var(
			--card-header-align,
			var(--int-card-header-align, flex-start)
		);
		gap: var(--space);
		border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
		background-color: var(--int-card-header-background-color);
		border-bottom: var(--int-card-header-border, none);

		width: 100%;
		flex-wrap: wrap;
	}

	&__header-title {
		display: flex;
		align-items: center;
		gap: var(--space);
	}

	&__icon {
		font-size: var(--card-icon-size, var(--int-card-icon-size, 3em));
		color: var(--color-theme, currentColor);
		background-color: color-mix(in srgb, var(--color-theme), transparent 90%);
		padding: var(--space-xs);
		border-radius: var(--border-radius-s);
		opacity: 0.8;
	}

	&--sticky-header > #{$b}__header {
		position: sticky;
		top: 0;
		z-index: 5;
	}

	&__actions {
		display: flex;
		gap: var(--space);
		flex-shrink: 0;
		width: fit-content;
	}

	&__body {
		display: flex;
		flex-direction: column;
		gap: var(--space);
		padding: var(--card-padding, var(--int-card-padding, var(--space)));
		height: 100%;
	}

	&__footer {
		padding: var(--card-padding, var(--space));
		border-top: 1px solid
			var(
				--int-card-border-color,
				var(--int-card-border-color_header, transparent)
			);
		background-color: color-mix(
			in srgb,
			var(--int-card-border-color),
			transparent 75%
		);
		display: flex;
		align-items: center;
		flex-shrink: 0;
		height: var(--card-footer-height, fit-content);
	}

	&__title {
		font-size: var(
			--card-title-size,
			var(--int-card-title-size, var(--font-size-l))
		);
		text-align: left;
		margin: 0;
		font-weight: var(
			--card-title-font-weight,
			var(--int-card-title-font-weight, 500)
		);

		& + #{$b}__description {
			margin-top: var(--space-s);
		}
	}

	&__header-title {
		& + #{$b}__description {
			opacity: .5;
			margin-top: var(--space-s);
		}
	}

	&--sticky {
		position: sticky;
		top: 0;
		z-index: 10;
		height: fit-content;
	}
}
</style>

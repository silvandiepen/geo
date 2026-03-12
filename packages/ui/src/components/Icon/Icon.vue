<template>
	<span
		:class="iconClasses"
		role="img"
		:aria-label="name"
		:style="iconStyle"
		v-html="resolvedSvg"
	></span>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { IconNameOrString } from './Icon.model';
import { Color, Size } from '../../types';
import { getIconLoader } from './Icon.data';

defineOptions({
	name: 'Icon',
});

const props = withDefaults(
	defineProps<{
		name: IconNameOrString;
		size?: Size;
		color?: Color;
	}>(),
	{
		size: Size.MEDIUM,
	}
);

const resolvedSvg = ref<string>('');

const loadIcon = async (iconName: IconNameOrString) => {
	const primaryLoader = getIconLoader(iconName);
	const fallbackLoader = getIconLoader('wayfinding/cross');

	try {
		const primarySvg = await primaryLoader();
		if (primarySvg) {
			resolvedSvg.value = primarySvg;
			return;
		}

		resolvedSvg.value = await fallbackLoader();
		if (!resolvedSvg.value) {
			console.warn('[Icon] No loader found for icon', iconName);
		}
	} catch {
		resolvedSvg.value = await fallbackLoader();
		if (!resolvedSvg.value) {
			console.warn('[Icon] Failed to load icon', iconName);
		}
	}
};

watch(
	() => props.name,
	(newName) => loadIcon(newName),
	{ immediate: true }
);

const iconClasses = computed(() => [
	'sil-icon',
	`sil-icon--${props.size}`,
	props.name ? `sil-icon--${props.name}` : '',
]);

const iconStyle = computed(() =>
	props.color ? { color: `var(--color-${props.color})` } : {}
);
</script>

<style lang="scss">
.sil-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1em;
	height: 1em;

	svg {
		width: 1em;
		height: 1em;
		display: block;
		path,
		circle,
		rect,
		polygon,
		line,
		polyline {
			stroke: currentColor;
		}
	}

	&--xsmall {
		font-size: 0.6em;
	}
	&--small {
		font-size: 0.8em;
	}
	&--medium {
		font-size: 1em;
	}
	&--large {
		font-size: 1.25em;
	}
	&--xlarge {
		font-size: 1.5em;
	}
}
</style>

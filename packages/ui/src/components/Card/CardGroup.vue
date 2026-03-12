<template>
	<div
		:class="bemm('', [layout])"
		:style="`--card-group-columns: ${columns ?? 'auto-fit'}`"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { useBemm } from 'bemm';
import { CardGroupLayout } from './CardGroup.model';

const props = defineProps({
	layout: {
		type: String as PropType<CardGroupLayout>,
		default: CardGroupLayout.GRID,
	},
	columns: {
		type: [Number, String] as PropType<number | 'auto-fit'>,
		default: 0,
	},
});

const bemm = useBemm('sil-card-group', {
	return: 'string',
	includeBaseClass: true,
});
</script>

<style lang="scss">
.sil-card-group {
	gap: var(--space);

	& + & {
		margin-top: var(--space);
	}

	&--horizontal {
		display: flex;
		flex-direction: row;
		gap: var(--space);
	}

	&--vertical {
		flex-direction: column;
		display: block;
	}

	&--grid {
		display: grid;
		grid-template-columns: repeat(
			var(--card-group-columns),
			minmax(var(--card-min-width, 240px), 1fr)
		);
		@media screen and (max-width: 720px) {
			grid-template-columns: 1fr;
		}
		> * {
			min-width: 0;
		}
	}
}
</style>

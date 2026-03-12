<template>
	<div
		:class="
			bemm('', [
				align,
				wrap ? 'wrap' : '',
				fullWidth ? 'full-width' : '',
				variant,
				center ? 'force-center' : '',
			])
		"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { useBemm } from 'bemm';

const props = defineProps({
	align: {
		type: String as PropType<'left' | 'center' | 'right' | 'start' | 'end'>,
		default: 'left',
	},
	wrap: {
		type: Boolean,
		default: false,
	},
	fullWidth: {
		type: Boolean,
		default: false,
	},
	variant: {
		type: String as PropType<'default' | 'grouped'>,
		default: 'default',
	},
	center: {
		type: Boolean,
		default: false,
	},
});

const bemm = useBemm('sil-button-group', {
	return: 'string',
	includeBaseClass: true,
});
</script>

<style lang="scss">
.sil-button-group {
	display: inline-flex;
	gap: var(--space-s);

	> .sil-button {
		height: 100%;
	}

	&--full-width {
		width: 100%;
	}

	&--wrap {
		flex-wrap: wrap;
	}

	&--start,
	&--left {
		justify-content: flex-start;
	}

	&--center {
		justify-content: center;
		width: 100%;
	}

	&--end,
	&--right {
		justify-content: flex-end;
		width: 100%;
	}

	&--grouped {
		gap: 0;

		.sil-button {
			--button-border-radius: 0;
			&:first-child {
				--button-border-radius: var(--border-radius) 0 0 var(--border-radius);
			}
			&:last-child {
				--button-border-radius: 0 var(--border-radius) var(--border-radius) 0;
			}
		}
	}

	&--force-center {
		align-items: center;
	}
}
</style>

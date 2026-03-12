<template>
	<Tooltip :disabled="!hasTooltip" v-bind="tooltipBindings">
		<span v-bind="$attrs" :class="bemm('', [type])">
			<IdView
				v-if="type === FieldType.ID && stringValue"
				:id="stringValue"
				:pre="prefix"
				@copied="$emit('copied', $event)"
			/>
			<Chip
				:tooltip="prettyDate"
				v-else-if="type === FieldType.DATE"
				:color="Color.BACKGROUND"
			>
				{{ formattedDate }}
			</Chip>
			<Chip
				:tooltip="prettyDate"
				v-else-if="type === FieldType.DATE_AGO"
				:color="Color.BACKGROUND"
			>
				{{ timeAgo }}
			</Chip>
			<span
				v-else-if="type === FieldType.EMAIL && stringValue"
				:class="bemm('email')"
			>
				<Button
					:variant="'ghost'"
					:size="'small'"
					:icon="Icons.ENVELOPE"
					:href="`mailto:${stringValue}`"
					:hoverIcon="Icons.COPY"
					@click.native.stop="copyValue"
					:tooltip="'Copy email address'"
				/>
				<span :class="bemm('text')">
					{{ stringValue }}
				</span>
			</span>
			<span v-else-if="type === FieldType.CODE" :class="bemm('code')">
				<span>{{ stringValue }}</span>
				<Icon
					v-if="copyable && stringValue"
					:name="Icons.COPY"
					:class="bemm('copy')"
					@click.native.stop="copyValue"
				/>
			</span>
			<span v-else-if="type === FieldType.BOOLEAN">
				{{ booleanLabel }}
			</span>
			<span v-else-if="type === FieldType.YES_NO">
				<Icon
					v-if="props.value"
					:name="Icons.CHECK"
					:color="Color.SUCCESS"
					:size="Size.SMALL"
				/>
				<Icon
					v-else
					:name="Icons.CROSS"
					:color="Color.ERROR"
					:size="Size.SMALL"
				/>
				{{ props.value ? props.trueLabel : props.falseLabel }}
			</span>
			<Switch
				v-else-if="type === FieldType.SWITCH"
				:model-value="Boolean(props.value)"
				@update:model-value="onSwitchChange"
			/>
			<Chip v-else-if="type === FieldType.STATUS" :color="statusColor">
				{{ statusLabel }}
			</Chip>
			<Chip v-else-if="type === FieldType.NUMBER">
				{{ formattedNumber }}
			</Chip>
			<span v-else>
				{{ stringValue || empty }}
			</span>
		</span>
	</Tooltip>
</template>

<script lang="ts" setup>
import { computed, PropType, getCurrentInstance } from 'vue';
import { useBemm } from 'bemm';
import { FieldType } from './Field.model';
import { Icon, Icons } from '@/components/ui/Icon';
import IdView from '@/components/ui/Display/ID.vue';
import { Switch } from '@/components/ui/Form';
import { TooltipWrapper as Tooltip } from '@/components/ui/Tooltip';
import Utils from '@/common/Utils';
import { Chip } from '@/components/ui/Display';
import { Color, Size } from '@/types';
import { Button } from '@/components/ui/Button';
import { useFieldDisplay } from './useFieldDisplay';

defineOptions({
	inheritAttrs: false,
});

const props = defineProps({
	value: {
		type: [String, Number, Boolean, Date, Object] as PropType<
			string | number | boolean | Date | Record<string, unknown> | null
		>,
		default: null,
	},
	type: {
		type: String as PropType<FieldType>,
		default: FieldType.TEXT,
	},
	format: {
		type: [String, Function] as PropType<string | ((value: unknown) => string)>,
		default: null,
	},
	empty: {
		type: String,
		default: '-',
	},
	copyable: {
		type: Boolean,
		default: true,
	},
	trueLabel: {
		type: String,
		default: 'Yes',
	},
	falseLabel: {
		type: String,
		default: 'No',
	},
	prefix: {
		type: String,
		default: '',
	},
	tooltip: {
		type: [String, Object] as PropType<string | TooltipOptions>,
		default: null,
	},
});

const emit = defineEmits(['copied', 'update:value', 'change']);

const { proxy } = getCurrentInstance() as any;
const bemm = useBemm('sil-field-display', {
	return: 'string',
	includeBaseClass: true,
});

const stringValue = computed(() =>
	props.value === null || props.value === undefined ? '' : String(props.value)
);
const {
	formattedDate,
	timeAgo,
	prettyDate,
	formattedNumber,
	booleanLabel,
	statusLabel,
	statusColor,
	tooltipBindings,
	hasTooltip,
} = useFieldDisplay({
	value: props.value,
	format: props.format,
	empty: props.empty,
	trueLabel: props.trueLabel,
	falseLabel: props.falseLabel,
	tooltip: props.tooltip,
});

const copyValue = () => {
	if (!stringValue.value) return;
	Utils.copyStringToClipboard(stringValue.value);
	emit('copied', stringValue.value);
	proxy?.$message?.success?.('Copied to clipboard');
};

const onSwitchChange = (value: boolean) => {
	emit('update:value', value);
	emit('change', value);
};
</script>

<style lang="scss">
.sil-field-display {
	$b: &;
	display: inline-flex;
	align-items: center;
	gap: var(--space-xs);
	min-width: 0;
	width: 100%;

	&__code {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-family: 'Courier New', Courier, monospace;
		font-size: var(--font-size-s);
	}

	&__copy {
		cursor: pointer;
		color: var(--color-secondary);
		&:hover {
			color: var(--color-foreground);
		}
	}

	&__email {
		display: flex;
		gap: var(--space-xs);
		align-items: center;
		position: relative;
		width: 100%;

		#{$b}__text {
			white-space: nowrap;
			height: fit-content;
			overflow: hidden;
			text-overflow: ellipsis;
			display: block;
			width: auto;
		}
	}
}
</style>

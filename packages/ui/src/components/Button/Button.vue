<template>
<component
v-bind="$attrs"
:is="buttonComponent"
:class="buttonClasses"
:style="buttonStyles"
:to="resolvedTo"
:type="buttonComponent === 'button' ? $attrs.type || buttonType : null"
:disabled="buttonComponent === 'button' ? disabled || isLoading : null"
@click="onClick"
@mouseleave="onTooltipReset"
@blur="onTooltipReset"
>
<span :class="bemm('background')"></span>
<span :class="bemm('container')">
<span v-if="displayIconName" :class="bemm('icon')">
<Icon :name="displayIconName" />
</span>
<span v-if="hoverIcon" :class="bemm('icon', 'hover')">
<Icon :name="hoverIcon" />
</span>
<span :class="bemm('text')" v-if="showText">
<template v-if="isLoading">{{ t('common.loading.default') }}</template>
<slot v-else></slot>
</span>
<span v-if="endIcon" :class="bemm('icon', 'end')">
<Icon :name="endIcon" />
</span>
</span>
<Tooltip
v-if="hasTooltip"
v-bind="tooltipBindings"
:open="false"
:show-on-parent-hover="!isTooltipSuppressed"
:disabled="disabled || isLoading"
>
<template v-if="$slots.tooltip" #content>
<slot name="tooltip"></slot>
</template>
</Tooltip>
</component>
</template>

<script lang="ts" setup>
import {
Comment,
Fragment,
Text,
computed,
ref,
useSlots,
} from 'vue';
import type { PropType } from 'vue';
import type { VNode, VNodeArrayChildren } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ButtonProps, ButtonRouteLocation } from './Button.model';
import { useBemm } from 'bemm';
import { NotificationStatus, Size, Status } from '../../types';
import { RouterLink } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';
import { Icon } from '../Icon';
import { Icons } from '../../types';
import { Tooltip } from '../Tooltip';
import type { TooltipOptions } from '../Tooltip';

const props = defineProps({
component: {
type: String as PropType<ButtonProps['component']>,
default: 'button',
},
variant: {
type: String as PropType<ButtonProps['variant']>,
default: 'default',
},
buttonType: {
type: String as PropType<ButtonProps['buttonType']>,
default: 'button',
},
color: {
type: String as PropType<ButtonProps['color']>,
default: 'theme',
},
to: {
type: [String, Object] as PropType<ButtonProps['to']>,
default: null,
},
action: {
type: Function as PropType<ButtonProps['action']>,
default: null,
},
size: {
type: String as PropType<ButtonProps['size']>,
default: Size.MEDIUM,
},
fullWidth: {
type: Boolean,
default: false,
},
disabled: {
type: Boolean,
default: false,
},
status: {
type: String as PropType<ButtonProps['status']>,
default: null,
},
icon: {
type: String as PropType<ButtonProps['icon']>,
default: null,
},
hoverIcon: {
type: String as PropType<ButtonProps['hoverIcon']>,
default: null,
},
endIcon: {
type: String as PropType<ButtonProps['icon']>,
default: null,
},
tooltip: {
type: [String, Object] as PropType<ButtonProps['tooltip']>,
default: null,
},
});

const emit = defineEmits<{
(e: 'click', event: MouseEvent): void;
}>();

const { t } = useI18n();
const isTooltipSuppressed = ref(false);
const slots = useSlots();

const bemm = useBemm('sil-button', {
return: 'string',
includeBaseClass: true,
});

const iconName = computed(() => props.icon || null);
const isLoading = computed(() => props.status === Status.LOADING);

const displayIconName = computed(() => {
if (isLoading.value) return null;
if (props.status === NotificationStatus.SUCCESS) return Icons.CHECK;
if (props.status === NotificationStatus.ERROR) return Icons.EXCLAMATION;
return iconName.value;
});

const hasText = computed(() => {
const hasMeaningfulNode = (nodes: VNodeArrayChildren): boolean => {
if (!Array.isArray(nodes)) return false;
return nodes.some((node) => {
if (typeof node === 'string') return node.trim().length > 0;
if (typeof node === 'number') return true;
if (!node || typeof node !== 'object') return false;
const vnode = node as VNode;
if (vnode.type === Comment) return false;
if (vnode.type === Text) return String(vnode.children || '').trim().length > 0;
if (vnode.type === Fragment) return hasMeaningfulNode(vnode.children as VNodeArrayChildren);
return true;
});
};
return hasMeaningfulNode(slots.default?.() || []);
});

const showText = computed(() => isLoading.value || hasText.value);

const hasTooltipSlot = computed(() => {
const content = slots.tooltip?.();
return Boolean(content && content.length);
});

const tooltipBindings = computed<TooltipOptions>(() => {
if (typeof props.tooltip === 'string') return { text: props.tooltip };
return (props.tooltip || {}) as TooltipOptions;
});

const hasTooltip = computed(() => {
if (hasTooltipSlot.value) return true;
if (typeof props.tooltip === 'string') return props.tooltip.trim().length > 0;
if (!props.tooltip) return false;
const tooltip = props.tooltip as TooltipOptions;
return Boolean(tooltip.text || tooltip.html || tooltip.actions?.length);
});

const buttonClasses = computed(() =>
bemm('', {
[`${props.variant}`]: true,
'full-width': props.fullWidth,
[`${props.size}`]: true,
[`status-${props.status}`]: !!props.status,
'is-disabled': props.disabled,
'is-button': props.component === 'button',
'is-link': props.component === 'a' || props.component === 'router-link',
'has-icon': Boolean(displayIconName.value),
'has-icon-end': Boolean(props.endIcon),
'icon-only': Boolean(displayIconName.value && !showText.value),
[`icon-${props.icon}`]: Boolean(props.icon),
})
);

const normalizedTo = computed<RouteLocationRaw | null>(() => {
if (!props.to) return null;
if (typeof props.to !== 'object' || Array.isArray(props.to)) return props.to;
const routeTarget = Object.assign({}, props.to as Record<string, unknown>) as ButtonRouteLocation;
delete routeTarget.split;
delete routeTarget.splitBreakpoint;
return routeTarget as RouteLocationRaw;
});

const resolvedTo = computed(() => normalizedTo.value);

const buttonComponent = computed(() => {
if (resolvedTo.value) return RouterLink;
if (props.buttonType === 'submit') return 'button';
return props.component;
});

const buttonStyles = computed(() => ({
'--prop-button-color': `var(--color-${props.color})`,
'--prop-button-text': `var(--color-${props.color}-contrast)`,
}));

const onClick = (event: MouseEvent) => {
isTooltipSuppressed.value = true;
emit('click', event);
};

const onTooltipReset = () => {
isTooltipSuppressed.value = false;
};
</script>

<style lang="scss">
@use './Button.Animations';

.sil-button {
$b: &;

background-color: transparent;
border: none;
display: flex;
height: fit-content;
width: fit-content;
align-items: center;
justify-content: center;
padding: 0;
position: relative;
text-decoration: none !important;
cursor: pointer;

--int-button-color: var(--prop-button-color, var(--button-color, var(--color-secondary)));
--int-button-background-color: var(
--prop-button-background-color,
var(--prop-button-color, var(--button-color, var(--color-secondary)))
);
--int-button-text: var(--prop-button-text, var(--button-text, var(--color-secondary-contrast)));
--int-button-color--hover: color-mix(in srgb, var(--int-button-color), var(--color-background) 10%);
--int-button-background-color--hover: color-mix(in srgb, var(--int-button-background-color), var(--color-background) 50%);
--int-button-text--hover: color-mix(in srgb, var(--int-button-text), var(--color-background) 10%);
--int-button-icon-color: var(--button-icon-color, currentColor);
--int-button-icon-color--hover: var(--button-icon-color--hover, var(--int-button-icon-color));
--int-button-icon-only: var(--button-icon-only, 0);
--int-button-text-display: var(--button-text-display, inline);
--int-button-icon-margin-right: var(
--button-icon-margin-right,
calc((1 - var(--int-button-icon-only)) * var(--space-xs))
);

border-radius: var(--int-button-border-radius, var(--button-border-radius, var(--border-radius-xl)));

&__container {
border-radius: inherit;
padding: var(--int-button-padding, var(--button-padding, var(--space-s) var(--space-m)));
padding-inline-start: var(
--int-button-padding-start,
var(
--button-padding-start,
calc(
(1 - var(--int-button-icon-only)) * var(--space-m) +
var(--int-button-icon-only) * var(--space-s)
)
)
);
padding-inline-end: var(
--int-button-padding-end,
var(
--button-padding-end,
calc(
(1 - var(--int-button-icon-only)) * var(--space-m) +
var(--int-button-icon-only) * var(--space-s)
)
)
);
color: var(--int-button-text);
width: 100%;
position: relative;
z-index: 2;
white-space: nowrap;
line-height: 1;
gap: calc((1 - var(--int-button-icon-only)) * var(--space-s));
display: inline-flex;
box-shadow: var(--int-button-box-shadow, none);
border: var(--button-border-width, var(--int-button-border-width, 0)) solid
var(--int-button-border-color, var(--button-border-color, transparent));
}

&__background {
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 100%;
height: 100%;
border-radius: inherit;
z-index: 0;
background-color: var(--int-button-background-color, var(--int-button-color));
transform-origin: 50% 50%;
transition: 0.3s ease-in-out;
}

&__text {
display: var(--int-button-text-display);
min-width: 0;
max-width: calc((1 - var(--int-button-icon-only)) * 100rem);
overflow: hidden;
opacity: calc(1 - var(--int-button-icon-only));
text-decoration: none;
white-space: nowrap;
line-height: 1.5;
}

&__icon {
display: inline-flex;
align-items: center;
margin-right: var(--int-button-icon-margin-right);
color: var(--int-button-icon-color);
font-size: 1.25em;

&--hover {
position: absolute;
opacity: 0;
transition: opacity 0.3s var(--cubic-bezier);
}
}

&__status-icon {
font-size: 0.75em;
margin-right: var(--space);
}

&:hover {
text-decoration: none !important;

#{$b}__container {
color: var(--int-button-text--hover);
}

#{$b}__background {
background-color: var(--int-button-background-color--hover);
animation: bumpBackground 0.25s ease-in-out forwards;

@keyframes bumpBackground {
0%, 100% { transform: translate(-50%, -50%) scale(1, 1); }
50%       { transform: translate(-50%, -50%) scale(1.1, 1.05); }
}
}

#{$b}__icon {
color: var(--int-button-icon-color--hover);
}

&:has(#{$b}__icon--hover) {
#{$b}__icon--hover { opacity: 1; }
#{$b}__icon:not(#{$b}__icon--hover) { opacity: 0; }
}
}

&:focus {
outline: none;
box-shadow: 0 0 0 var(--border-width) var(--color-focus);
}

// Sizes
&--xsmall { font-size: 0.75em; }
&--small   { font-size: 0.875em; }
&--medium  { font-size: 1em; }
&--large   { font-size: 1.125em; }
&--xlarge  { font-size: 1.5em; }

// Icon-only
&--icon-only {
--int-button-icon-only: 1;
--int-button-padding: var(--space-s);
--int-button-padding-start: var(--space-s);
--int-button-padding-end: var(--space-s);
--int-button-text-display: none;
--int-button-icon-margin-right: 0;

border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
aspect-ratio: 1 / 1;
height: fit-content;

#{$b}__container {
display: flex;
align-items: center;
justify-content: center;
}
}

&--has-icon {
--int-button-padding-start: calc(
(1 - var(--int-button-icon-only)) * var(--space) +
var(--int-button-icon-only) * var(--space-s)
);
}

&--has-icon-end {
--int-button-padding-end: var(--space-s);
}

// Full width
&--full-width {
width: 100%;
justify-content: center;

#{$b}__container {
justify-content: space-between;
width: 100%;

#{$b}__text {
width: 100%;
text-align: left;
}
}
}

// Variants
&--ghost {
--int-button-background-color: var(
--button-background-color,
color-mix(in srgb, var(--int-button-color), transparent 90%)
);
--int-button-background-color--hover: var(
--button-background-color--hover,
color-mix(in srgb, var(--int-button-color), transparent 50%)
);
--int-button-border-color: var(--int-button-color);
--int-button-text: color-mix(in srgb, var(--int-button-color), var(--color-foreground) 33.33%);
--int-button-text--hover: color-mix(in srgb, var(--int-button-text), var(--color-foreground) 50%);
}

&--naked {
--int-button-background-color: color-mix(in srgb, var(--int-button-color), transparent 100%);
--int-button-background-color--hover: var(
--button-background-color--hover,
color-mix(in srgb, var(--int-button-color), transparent 75%)
);
--int-button-border-color: var(--button-border-color, var(--int-button-color));
--int-button-icon-color: var(--button-icon-color, var(--int-button-color));
--int-button-text: var(
--button-text,
color-mix(in srgb, var(--int-button-color), var(--color-foreground) 25%)
);
--int-button-text--hover: var(
--button-text--hover,
color-mix(in srgb, var(--int-button-text), var(--color-foreground) 33.33%)
);
}

&--outline {
--int-button-background-color: transparent;
--int-button-box-shadow: inset 0 0 0 1px var(--int-button-color);
--int-button-color--hover: color-mix(in srgb, var(--int-button-color), var(--color-background) 90%);
--int-button-text: var(--int-button-color);
--int-button-text--hover: var(--int-button-text);
}

// Disabled
&[disabled],
&--is-disabled {
cursor: not-allowed;
pointer-events: none;
opacity: 0.25;

#{$b}__background { transform: translate(-50%, -50%) !important; }
.sil-icon { animation: none !important; }
}

// Status variants
&--status-success {
--int-button-color: var(--color-success);
--int-button-background-color: var(--color-success);
--int-button-text: var(--color-success-contrast);
}

&--status-error,
&--status-danger {
--int-button-color: var(--color-error);
--int-button-background-color: var(--color-error);
--int-button-text: var(--color-error-contrast);
}

&--status-warning {
--int-button-color: var(--color-warning);
--int-button-background-color: var(--color-warning);
--int-button-text: var(--color-warning-contrast);
}

&--status-loading {
--int-button-background-color: var(--color-info);
--int-button-text: var(--color-info-contrast);

#{$b}__end-icon { display: none; }
}
}
</style>

# Input

A basic text input component using CSS custom properties.

## Usage

```vue
<Input v-model="value" placeholder="Type here..." />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | string \| number | '' | Bound value |
| type | string | 'text' | Input type |
| placeholder | string | — | Placeholder text |
| disabled | boolean | false | Disabled state |
| id | string | — | HTML id |

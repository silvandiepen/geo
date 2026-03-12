# Field

A form field wrapper providing label, hint text, and error message display.

## Usage

```vue
<Field label="Email" :error="emailError" required>
  <Input v-model="email" type="email" />
</Field>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | — | Field label |
| hint | string | — | Help text |
| error | string | — | Validation error message |
| required | boolean | false | Mark as required |
| disabled | boolean | false | Disable field |
| id | string | — | Links label to input |

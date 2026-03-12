# Button

A flexible button component supporting variants, icons, tooltips, loading states, and router links.

## Usage

```vue
<Button variant="ghost" color="primary" :icon="Icons.CHECK">Save</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'default' | Visual style: default, ghost, naked, outline |
| color | Color | 'theme' | Color theme |
| size | Size | 'medium' | Button size |
| icon | string | — | Leading icon name |
| endIcon | string | — | Trailing icon name |
| disabled | boolean | false | Disabled state |
| status | Status | — | Loading/success/error status |
| to | RouteLocationRaw | — | Router link target |
| tooltip | string \| TooltipOptions | — | Tooltip content |
| fullWidth | boolean | false | Stretch to container width |

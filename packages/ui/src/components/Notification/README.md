# Notification

An inline notification banner with type-based styling and optional dismiss.

## Usage

```vue
<Notification message="Upload complete" type="success" :dismissible="true" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | string | required | Notification text |
| type | NotificationType | 'info' | success, error, warning, info |
| dismissible | boolean | false | Show close button |
| dismissLabel | string | 'Dismiss' | Accessible label for close button |

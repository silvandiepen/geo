# Popup

A modal/overlay popup system driven by `popupService`.

## Usage

```typescript
popupService.openPopup({ title: 'Confirm', component: MyComponent });
```

Mount `<Popup />` and `<PopupWrapper />` in your app root.

## Components

- `Popup` — renders active popups via teleport
- `PopupSlot` — named slot container inside a popup
- `PopupWrapper` — wraps popup content

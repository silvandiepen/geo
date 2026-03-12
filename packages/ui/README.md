# @geo/ui

Shared UI package for the Geo platform. Re-exports all components and utilities from `@sil/ui` and provides icon registration via `open-icon`.

## Usage

### Import components

```typescript
import { Button, Card, Icon, TextInput, Toast, toastService, Popup, popupService } from '@geo/ui'
import '@sil/ui/style.css'
```

### Register platform icons

Call `setupIcons` once in your app's `main.ts`:

```typescript
import { createApp } from 'vue'
import { setupIcons } from '@geo/ui'
import App from './App.vue'

const app = createApp(App)
app.use(setupIcons)
app.mount('#app')
```

Then use icons in templates:

```vue
<Icon name="flag-m" />
<Icon name="globe-m" />
```

## Exported Components

`Button`, `ButtonGroup`, `Icon`, `Card`, `Container`, `Badge`, `ContextMenu`, `Tabs`, `Tab`, `TabPanel`, `CircularProgress`, `StatsCard`, `OptionItem`, `Progress`, `ThemeToggle`, `SearchInput`, `TextInput`, `SelectInput`, `TInputTextArea`, `Section`, `PageHeader`, `AppHeader`, `AppSidebar`, `SettingsLayout`, `Table`, `TableRow`, `TableCell`, `Popup`, `PopupSlot`, `Alert`, `EmptyState`, `Tooltip`, `Toast`

## Available Icons

`map-m`, `globe-m`, `flag-m`, `search-m`, `arrow-right-m`, `arrow-left-m`, `arrow-up-m`, `arrow-down-m`, `add-m`, `check-m`, `close-m`, `star-m`, `heart-m`, `settings-5`, `chevron-right`, `chevron-left`, `chevron-up`, `chevron-down`, `home-m`, `compass`, `trophy`, `lightbulb-m`, `border-all-m`, `map-pin-m`, `refresh-m`, `play-m`, `pause-m`, `timer-m`

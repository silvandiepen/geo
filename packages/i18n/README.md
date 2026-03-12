# @geo/i18n

Shared internationalization (i18n) package for the Geo platform.

Built on [vue-i18n v9](https://vue-i18n.intlify.dev/).

## Supported Locales

- `en` – English (default)
- `nl` – Dutch

## Usage

### Setup in app main.ts

```typescript
import { createApp } from 'vue'
import { createGeoI18n } from '@geo/i18n'
import App from './App.vue'

const app = createApp(App)
app.use(createGeoI18n('en'))
app.mount('#app')
```

### In components

```vue
<script setup lang="ts">
import { useI18n } from '@geo/i18n'
const { t } = useI18n()
</script>

<template>
  <Button>{{ t('common.play') }}</Button>
</template>
```

## Translation Keys

### common
`play`, `retry`, `next`, `skip`, `submit`, `correct`, `wrong`, `score`, `correct_count`, `streak`, `rounds`, `percentage`, `bestStreak`, `gameOver`, `playAgain`, `backToHome`, `settings`, `loading`, `search`

### platform
`title`, `subtitle`, `chooseGame`, `categories.*`

### games.*
Each game has its own namespace under `games`.

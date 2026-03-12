# AuthModal

A self-contained login/register modal that uses `@geo/auth`'s `useAuth` composable.

Games are fully playable without authentication — this modal is entirely opt-in.

## Usage

```vue
<AuthModal
  :open="showAuth"
  :loading="auth.loading.value"
  :auth-error="auth.error.value"
  @close="showAuth = false"
  @login="handleLogin"
  @register="handleRegister"
/>
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | — | User dismissed the modal |
| `login` | `{ email, password }` | User submitted the login form |
| `register` | `{ username, email, password }` | User submitted the register form |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | boolean | — | Whether the modal is visible |
| `loading` | boolean | false | Show loading state on submit button |
| `authError` | string | null | Server-side error message |

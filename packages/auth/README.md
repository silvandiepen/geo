# @geo/auth

Client-side auth composables for the geo platform.

Games are fully playable without authentication. Auth is opt-in — when a user is logged in, scores are saved to the Cloudflare Worker API.

## Usage

### Auth (`useAuth`)

```ts
import { useAuth } from '@geo/auth';

const { user, isLoggedIn, login, register, logout, fetchMe } = useAuth();

// Login
await login({ email: 'user@example.com', password: 'password123' });

// Register
await register({ username: 'Alice', email: 'alice@example.com', password: 'password123' });

// Logout
logout();
```

### Score saving (`useScores`)

```ts
import { useScores } from '@geo/auth';

const { saveScore, getLeaderboard, getMyScores, getMyBest } = useScores();

// Save after a game (skipped silently if not logged in)
await saveScore({
  game_id: 'guess-the-flag',
  score: 850,
  correct: 8,
  rounds: 10,
  streak: 5,
  duration: 120,
});

// Fetch leaderboard (works for all users, even unauthenticated)
const top10 = await getLeaderboard('guess-the-flag', 10);
```

## Environment

Set `VITE_API_URL` in each app's `.env` to point to the Cloudflare Worker:

```
VITE_API_URL=https://geo-platform-worker.your-subdomain.workers.dev
```

During development the worker runs at `http://localhost:8787`.

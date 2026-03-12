import { ref, computed, readonly } from 'vue';
import type { AuthUser, LoginPayload, RegisterPayload, AuthResponse } from './types';

const TOKEN_KEY = 'geo_access_token';
const USER_KEY = 'geo_user';

// ── Singleton state ───────────────────────────────────────────────────────────
const _user = ref<AuthUser | null>(null);
const _token = ref<string | null>(null);
const _loading = ref(false);
const _error = ref<string | null>(null);

// Hydrate from localStorage on first import
if (typeof localStorage !== 'undefined') {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);
  if (storedToken && storedUser) {
    _token.value = storedToken;
    try {
      _user.value = JSON.parse(storedUser) as AuthUser;
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }
}

// ── API base URL ──────────────────────────────────────────────────────────────
// In production this points to the Cloudflare Worker.
// During dev it falls back to localhost:8787.
function apiUrl(path: string): string {
  const base =
    typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.['VITE_API_URL']
      ? (import.meta as { env?: Record<string, string> }).env!['VITE_API_URL']
      : 'http://localhost:8787';
  return `${base}/api${path}`;
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ data: T | null; error: string | null }> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    };

    if (_token.value) {
      headers['Authorization'] = `Bearer ${_token.value}`;
    }

    const res = await fetch(apiUrl(path), { ...options, headers });
    const json = await res.json() as T & { error?: string };

    if (!res.ok) {
      return { data: null, error: (json as { error?: string }).error ?? 'Request failed' };
    }

    return { data: json, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : 'Network error' };
  }
}

function persist(user: AuthUser, token: string) {
  _user.value = user;
  _token.value = token;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clear() {
  _user.value = null;
  _token.value = null;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// ── Composable ────────────────────────────────────────────────────────────────
export function useAuth() {
  const user = readonly(_user);
  const token = readonly(_token);
  const loading = readonly(_loading);
  const error = readonly(_error);
  const isLoggedIn = computed(() => Boolean(_user.value && _token.value));

  async function login(payload: LoginPayload): Promise<boolean> {
    _loading.value = true;
    _error.value = null;

    const { data, error: err } = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    _loading.value = false;

    if (err || !data) {
      _error.value = err ?? 'Login failed';
      return false;
    }

    persist(data.user, data.accessToken);
    return true;
  }

  async function register(payload: RegisterPayload): Promise<boolean> {
    _loading.value = true;
    _error.value = null;

    const { data, error: err } = await apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    _loading.value = false;

    if (err || !data) {
      _error.value = err ?? 'Registration failed';
      return false;
    }

    persist(data.user, data.accessToken);
    return true;
  }

  async function fetchMe(): Promise<void> {
    if (!_token.value) return;

    const { data, error: err } = await apiFetch<{ user: AuthUser }>('/auth/me');

    if (err || !data) {
      clear();
      return;
    }

    _user.value = data.user;
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }

  function logout(): void {
    clear();
  }

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    login,
    register,
    logout,
    fetchMe,
  };
}

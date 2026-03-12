export const logger = {
  warn: (...args: unknown[]) => console.warn('[geo-ui]', ...args),
  error: (...args: unknown[]) => console.error('[geo-ui]', ...args),
  info: (...args: unknown[]) => console.info('[geo-ui]', ...args),
};

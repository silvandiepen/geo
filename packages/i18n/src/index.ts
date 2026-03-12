import { createI18n } from 'vue-i18n';
import { en } from './locales/en';
import { nl } from './locales/nl';

export type { AppTranslations } from './locales/en';
export { en } from './locales/en';
export { nl } from './locales/nl';

export type SupportedLocale = 'en' | 'nl';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'nl'];

/**
 * Create a configured vue-i18n instance with all platform translations.
 * Each app can pass additional game-specific messages.
 */
export function createGeoI18n(
  locale: SupportedLocale = 'en',
  additionalMessages?: Record<string, Record<string, unknown>>
) {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: {
      en: { ...en, ...additionalMessages?.en },
      nl: { ...nl, ...additionalMessages?.nl },
    },
  });
}

// Re-export vue-i18n composable for convenience
export { useI18n } from 'vue-i18n';

import type { App } from 'vue';
import { IconRegistryPlugin } from 'open-icon/vue';
import {
  IconMapM,
  IconGlobeM,
  IconFlagM,
  IconSearchM,
  IconArrowRightM,
  IconArrowLeftM,
  IconArrowUpM,
  IconArrowDownM,
  IconAddM,
  IconCheckM,
  IconCloseM,
  IconStarM,
  IconHeartM,
  IconSettings5,
  IconChevronRight,
  IconChevronLeft,
  IconChevronUp,
  IconChevronDown,
  IconHomeM,
  IconCompass,
  IconTrophy,
  IconLightbulbM,
  IconBorderAllM,
  IconMapPinM,
  IconRefreshM,
  IconPlayM,
  IconPauseM,
  IconTimerM,
} from 'open-icon/icons';

/**
 * Register all geo platform icons with the open-icon registry.
 * Call this once in main.ts: app.use(setupIcons)
 */
export function setupIcons(app: App): void {
  app.use(IconRegistryPlugin, {
    icons: {
      'map-m': IconMapM,
      'globe-m': IconGlobeM,
      'flag-m': IconFlagM,
      'search-m': IconSearchM,
      'arrow-right-m': IconArrowRightM,
      'arrow-left-m': IconArrowLeftM,
      'arrow-up-m': IconArrowUpM,
      'arrow-down-m': IconArrowDownM,
      'add-m': IconAddM,
      'check-m': IconCheckM,
      'close-m': IconCloseM,
      'star-m': IconStarM,
      'heart-m': IconHeartM,
      'settings-5': IconSettings5,
      'chevron-right': IconChevronRight,
      'chevron-left': IconChevronLeft,
      'chevron-up': IconChevronUp,
      'chevron-down': IconChevronDown,
      'home-m': IconHomeM,
      'compass': IconCompass,
      'trophy': IconTrophy,
      'lightbulb-m': IconLightbulbM,
      'border-all-m': IconBorderAllM,
      'map-pin-m': IconMapPinM,
      'refresh-m': IconRefreshM,
      'play-m': IconPlayM,
      'pause-m': IconPauseM,
      'timer-m': IconTimerM,
    },
  });
}

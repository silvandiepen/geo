export type Color =
  | 'primary'
  | 'secondary'
  | 'background'
  | 'foreground'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'theme';

export enum Size {
  XSMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  IDLE = 'idle',
}

export enum NotificationStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export const Icons = {
  CHECK: 'action/check',
  CLOSE: 'action/close',
  EXCLAMATION: 'notification/exclamation',
  ARROW_RIGHT: 'navigation/chevron-right',
  ARROW_LEFT: 'navigation/chevron-left',
  ARROW_UP: 'navigation/chevron-up',
  ARROW_DOWN: 'navigation/chevron-down',
  SEARCH: 'action/search',
  GLOBE: 'maps/globe',
  FLAG: 'maps/flag',
  MAP: 'maps/map',
  COMPASS: 'maps/compass',
  MAP_PIN: 'maps/pin',
  TROPHY: 'gaming/trophy',
  STAR: 'action/star',
  PLAY: 'media/play',
  PAUSE: 'media/pause',
  TIMER: 'time/timer',
  REFRESH: 'action/refresh',
  HOME: 'navigation/home',
  SETTINGS: 'action/settings',
} as const;

export type IconsType = typeof Icons;
export type IconName = (typeof Icons)[keyof typeof Icons];
export type IconNameOrString = IconName | string;

import { createLightTheme, type BrandVariants, type Theme } from '@fluentui/react-components';

export const basfBrandVariants: BrandVariants = {
  10: '#02132B',
  20: '#042247',
  30: '#073268',
  40: '#0A438C',
  50: '#0E55B3',
  60: '#1468DC',
  70: '#2A7CF2',
  80: '#4D92F5',
  90: '#75A9F7',
  100: '#9DC2FA',
  110: '#C4DCFC',
  120: '#E1EDFE',
  130: '#F0F6FE',
  140: '#F8FAFF',
  150: '#FFFFFF',
  160: '#FFFFFF',
};

export const appTheme: Theme = {
  ...createLightTheme(basfBrandVariants),
  colorBrandBackground: '#005A9E',
  colorBrandBackgroundHover: '#004578',
  colorBrandBackgroundPressed: '#00335A',
};

export const statusColors = {
  greenBg: '#DFF6DD',
  greenFg: '#107C41',
  greenBorder: '#107C41',
  amberBg: '#FFF4CE',
  amberFg: '#D97706',
  amberBorder: '#D97706',
  redBg: '#FDE7E9',
  redFg: '#D13438',
  redBorder: '#D13438',
  greyBg: '#F3F4F6',
  greyFg: '#687076',
  greyBorder: '#D1D5DB',
};

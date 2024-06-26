// types
import { DefaultConfigProps, MenuOrientation, ThemeDirection, ThemeMode } from 'types/config';

// ==============================|| THEME CONSTANT  ||============================== //

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_DEFAULT_PATH = '/';
export const APP_ADMIN_DEFAULT_PATH = '/admin';
export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;
export const WWW_HOST = process.env.NEXT_PUBLIC_WWW_HOST;

// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  menuOrientation: MenuOrientation.VERTICAL,
  miniDrawer: false,
  container: true,
  mode: ThemeMode.DARK,
  presetColor: 'theme2',
  themeDirection: ThemeDirection.LTR
};

export default config;

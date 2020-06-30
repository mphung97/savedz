import jsCookies from 'js-cookie';
import { atom, selector } from 'recoil';

const APP_STATE = 'appState';
const AUTH_SELECTOR = 'authSelector';
const LOCALE_SELECTOR = 'localeSelector';

export const appState = atom({
  key: APP_STATE,
  default: {
    locale: (navigator.language.slice(0, 2) === 'en' && 'en') || 'vi',
    auth: !!jsCookies.get('access-token') || false,
  },
});

export const authSelector = selector({
  key: AUTH_SELECTOR,
  get: ({ get }) => get(appState).auth,
  set: ({ get, set }, auth) =>
    set(appState, { ...get(appState), auth }),
});

export const localeSelector = selector({
  key: LOCALE_SELECTOR,
  get: ({ get }) => get(appState).locale,
});

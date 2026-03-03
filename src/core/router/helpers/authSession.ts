import Cookies from 'js-cookie';
import {
  AUTH_COOKIE_KEY,
  AUTH_SESSION_KEY,
  COOKIE_EXP_DAYS
} from "@modules/AuthModule/constants/constants.ts";


export const getAuthToken = (): string | null => {
  const tokenFromSession = window.sessionStorage.getItem(AUTH_SESSION_KEY);

  if (tokenFromSession) {
    return tokenFromSession;
  }

  return Cookies.get(AUTH_COOKIE_KEY) ?? null;
};

export const hasAuthToken = (): boolean => Boolean(getAuthToken());

export const saveAuthToken = (
  token: string,
  rememberMe: boolean
): void => {
  if (rememberMe) {
    Cookies.set(AUTH_COOKIE_KEY, token, {
      expires: COOKIE_EXP_DAYS,
      sameSite: 'lax',
      path: '/',
    });

    window.sessionStorage.removeItem(AUTH_SESSION_KEY);

    return;
  }

  Cookies.remove(AUTH_COOKIE_KEY, { path: '/' });

  window.sessionStorage.setItem(AUTH_SESSION_KEY, token);
};

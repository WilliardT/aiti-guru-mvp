export const AuthModuleConstants = {
  MODULE_NAME: 'AuthModule',
} as const;

// вынести в общий http или в ENV
export const AUTH_URL = 'https://dummyjson.com/auth/login';

export const AUTH_COOKIE_KEY = 'auth_token';
export const AUTH_SESSION_KEY = 'auth_token_session';
export const COOKIE_EXP_DAYS = 30;

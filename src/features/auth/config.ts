/**
 * Источник auth-запросов.
 *
 * Для перехода на backend:
 * 1. Поставьте AUTH_API_MODE = 'api'
 * 2. Реализуйте apiAuthService
 * 3. Удалите папку src/features/auth/api/demo
 */
export type AuthApiMode = 'demo' | 'api';

export const AUTH_API_MODE: AuthApiMode = 'demo';

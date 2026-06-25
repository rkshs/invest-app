/**
 * Источник сообщений в чате.
 *
 * Для перехода на backend:
 * 1. Поставьте CHAT_MESSAGING_MODE = 'api'
 * 2. Реализуйте apiChatMessagingService
 * 3. Удалите папку src/features/chat/demo
 */
export type ChatMessagingMode = 'demo' | 'api';

export const CHAT_MESSAGING_MODE: ChatMessagingMode = 'demo';

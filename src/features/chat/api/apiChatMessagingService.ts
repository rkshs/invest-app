import { getMessageForChat } from '../../../screens/ChatScreen/data/mockChatMessages';
import { ChatMessagingService, SendChatMessageParams } from '../types';

/**
 * Заглушка для реального backend.
 * TODO: заменить mock-загрузку и throw на HTTP-запросы.
 */
export const apiChatMessagingService: ChatMessagingService = {
  loadInitialMessages(chatId) {
    // TODO: GET /chats/:chatId/messages
    const initialMessage = getMessageForChat(chatId);

    return initialMessage ? [initialMessage] : [];
  },

  async sendMessage(_params: SendChatMessageParams) {
    // TODO: POST /chats/:chatId/messages
    throw new Error('Chat API is not connected yet.');
  },
};

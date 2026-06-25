import { CHAT_MESSAGING_MODE } from './config';
import { apiChatMessagingService } from './api/apiChatMessagingService';
import { demoChatMessagingService } from './demo/demoChatMessagingService';
import { ChatMessagingService } from './types';

export function getChatMessagingService(): ChatMessagingService {
  if (CHAT_MESSAGING_MODE === 'demo') {
    return demoChatMessagingService;
  }

  return apiChatMessagingService;
}

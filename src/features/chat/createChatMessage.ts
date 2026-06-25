import { formatChatTime } from '../../shared/lib/formatChatTime';
import { ChatMessage } from '../../types/chatMessage';

let messageCounter = 0;

export function createChatMessageId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}-${Date.now()}-${messageCounter}`;
}

export function createOwnChatMessage(chatId: string, text: string): ChatMessage {
  return {
    id: createChatMessageId('own'),
    chatId,
    text,
    senderName: 'Вы',
    isOwn: true,
    timestamp: formatChatTime(),
  };
}

export function createIncomingChatMessage(
  chatId: string,
  text: string,
  senderName: string,
): ChatMessage {
  return {
    id: createChatMessageId('reply'),
    chatId,
    text,
    senderName,
    isOwn: false,
    timestamp: formatChatTime(),
  };
}

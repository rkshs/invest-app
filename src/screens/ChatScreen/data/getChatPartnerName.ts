import { Chat } from '../../../types/chat';

function isClientTraderChatId(chatId: string): boolean {
  return chatId.startsWith('chat-client-trader-');
}

export function getChatPartnerName(chat: Chat): string {
  if (isClientTraderChatId(chat.id)) {
    return 'Execution';
  }

  if (chat.id === 'chat-4') {
    return 'Поддержка';
  }

  if (chat.lastMessagePrefix && chat.lastMessagePrefix !== 'Вы') {
    return chat.lastMessagePrefix;
  }

  return chat.title;
}

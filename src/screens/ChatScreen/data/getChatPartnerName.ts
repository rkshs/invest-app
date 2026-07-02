import { Chat } from '../../../types/chat';

export function getChatPartnerName(chat: Chat): string {
  if (chat.id === 'chat-client-trader') {
    return 'Александр';
  }

  if (chat.id === 'chat-4') {
    return 'Поддержка';
  }

  if (chat.lastMessagePrefix && chat.lastMessagePrefix !== 'Вы') {
    return chat.lastMessagePrefix;
  }

  return chat.title;
}

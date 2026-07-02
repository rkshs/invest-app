import { getChatById } from '../../screens/ChatScreen/data/mockChats';
import { getClientById } from './mockClients';
import { Client } from './types';

export function getClientByChatId(chatId: string): Client | undefined {
  const chat = getChatById(chatId);

  if (!chat?.clientId) {
    return undefined;
  }

  return getClientById(chat.clientId);
}

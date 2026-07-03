import { getChatById } from '../../screens/ChatScreen/data/mockChats';
import { getAccountById } from '../../screens/HomeScreen/data/mockAccounts';
import { Account } from '../../types';
import { getClientById } from './mockClients';

export function getAccountForClientChat(chatId: string): Account | undefined {
  const chat = getChatById(chatId);

  if (!chat?.clientId) {
    return undefined;
  }

  if (chat.accountId) {
    return getAccountById(chat.accountId);
  }

  const client = getClientById(chat.clientId);

  if (!client || client.kind !== 'direct') {
    return undefined;
  }

  return getAccountById(client.accountId);
}

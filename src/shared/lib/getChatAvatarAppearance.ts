import { Chat } from '../../types/chat';
import { getTickerAppearance } from './getTickerAppearance';

const CLIENT_TRADER_CHAT_PREFIX = 'chat-client-trader-';

export function getChatAvatarAppearance(chat: Pick<Chat, 'id' | 'avatarSeed'>) {
  if (chat.id.startsWith(CLIENT_TRADER_CHAT_PREFIX)) {
    return {
      ...getTickerAppearance('EX'),
      label: 'EX',
    };
  }

  return getTickerAppearance(chat.avatarSeed);
}

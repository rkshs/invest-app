import { Chat } from '../../../types/chat';

export function syncTrustedPersonChats(chats: Chat[]): Chat[] {
  const trustedEntries = chats.filter((chat) => chat.isTrustedPersonEntry);

  if (trustedEntries.length === 0) {
    return chats;
  }

  return chats.map((chat) => {
    if (!chat.isTrustedPersonEntry) {
      return chat;
    }

    const subChats = chats.filter((subChat) => subChat.parentChatId === chat.id);

    if (subChats.length === 0) {
      return chat;
    }

    const latestSubChat = subChats.reduce((latest, current) =>
      current.lastMessageAt > latest.lastMessageAt ? current : latest,
    );
    const totalUnread = subChats.reduce(
      (total, subChat) => total + (subChat.unreadCount ?? 0),
      0,
    );

    return {
      ...chat,
      lastMessage: latestSubChat.lastMessage,
      lastMessagePrefix: latestSubChat.lastMessagePrefix,
      timestamp: latestSubChat.timestamp,
      lastMessageAt: latestSubChat.lastMessageAt,
      unreadCount: totalUnread > 0 ? totalUnread : undefined,
    };
  });
}

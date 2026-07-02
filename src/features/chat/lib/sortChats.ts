import { Chat } from '../../../types/chat';

function hasUnread(chat: Chat): boolean {
  return (chat.unreadCount ?? 0) > 0;
}

export function sortChats(chats: Chat[]): Chat[] {
  return [...chats].sort((left, right) => {
    const leftUnread = hasUnread(left);
    const rightUnread = hasUnread(right);

    if (leftUnread !== rightUnread) {
      return leftUnread ? -1 : 1;
    }

    return right.lastMessageAt - left.lastMessageAt;
  });
}

export function markChatAsRead(chats: Chat[], chatId: string): Chat[] {
  return chats.map((chat) =>
    chat.id === chatId ? { ...chat, unreadCount: undefined } : chat,
  );
}

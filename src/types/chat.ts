export type Chat = {
  id: string;
  title: string;
  lastMessage: string;
  lastMessagePrefix?: string;
  timestamp: string;
  lastMessageAt: number;
  unreadCount?: number;
  avatarSeed: string;
  clientId?: string;
  accountId?: string;
  parentChatId?: string;
  isTrustedPersonEntry?: boolean;
};

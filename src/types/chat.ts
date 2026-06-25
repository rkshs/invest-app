export type Chat = {
  id: string;
  title: string;
  lastMessage: string;
  lastMessagePrefix?: string;
  timestamp: string;
  unreadCount?: number;
  avatarSeed: string;
};

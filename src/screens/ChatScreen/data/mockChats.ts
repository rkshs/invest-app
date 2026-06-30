import { Chat } from '../../../types/chat';

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    title: 'Инвесторы PRO',
    lastMessagePrefix: 'Алексей',
    lastMessage: 'Как думаете по SBER после отчёта?',
    timestamp: '1 ч',
    unreadCount: 4,
    avatarSeed: 'IPRO',
  },
  {
    id: 'chat-2',
    title: 'Анна К.',
    lastMessagePrefix: 'Вы',
    lastMessage: 'Отправлю дивидендный календарь',
    timestamp: '3 ч',
    avatarSeed: 'AK',
  },
  {
    id: 'chat-3',
    title: 'Трейдинг и идеи',
    lastMessagePrefix: 'Михаил',
    lastMessage: 'Лонг по NVDA всё ещё актуален',
    timestamp: '3 ч',
    unreadCount: 1,
    avatarSeed: 'TI',
  },
  {
    id: 'chat-4',
    title: 'Поддержка Clearvest',
    lastMessage: 'Ваш запрос №1001 принят в работу',
    timestamp: '1 д',
    avatarSeed: 'SUP',
  },
  {
    id: 'chat-5',
    title: 'Дмитрий В.',
    lastMessage: 'Спасибо за ссылку на отчёт',
    timestamp: '1 д',
    unreadCount: 2,
    avatarSeed: 'DV',
  },
  {
    id: 'chat-6',
    title: 'Дивидендный клуб',
    lastMessagePrefix: 'Елена',
    lastMessage: 'Кто держит MOEX в портфеле?',
    timestamp: '2 д',
    avatarSeed: 'DK',
  },
];

export function getChatById(chatId: string): Chat | undefined {
  return mockChats.find((chat) => chat.id === chatId);
}

export function getTotalUnreadCount(chats: Chat[] = mockChats): number {
  return chats.reduce((total, chat) => total + (chat.unreadCount ?? 0), 0);
}

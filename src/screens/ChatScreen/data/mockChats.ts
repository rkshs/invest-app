import { Chat } from '../../../types/chat';

export const CLIENT_TRADER_CHAT_ID = 'chat-client-trader';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const NOW = Date.now();

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    title: 'Инвесторы PRO',
    lastMessagePrefix: 'Алексей',
    lastMessage: 'Как думаете по SBER после отчёта?',
    timestamp: '1 ч',
    lastMessageAt: NOW - HOUR_MS,
    unreadCount: 4,
    avatarSeed: 'IPRO',
  },
  {
    id: 'chat-2',
    title: 'Анна К.',
    lastMessagePrefix: 'Вы',
    lastMessage: 'Отправлю дивидендный календарь',
    timestamp: '3 ч',
    lastMessageAt: NOW - 3 * HOUR_MS,
    avatarSeed: 'AK',
    clientId: 'client-2',
  },
  {
    id: 'chat-3',
    title: 'Трейдинг и идеи',
    lastMessagePrefix: 'Михаил',
    lastMessage: 'Лонг по NVDA всё ещё актуален',
    timestamp: '3 ч',
    lastMessageAt: NOW - 3 * HOUR_MS,
    unreadCount: 1,
    avatarSeed: 'TI',
  },
  {
    id: 'chat-4',
    title: 'Поддержка Clearvest',
    lastMessage: 'Ваш запрос №1001 принят в работу',
    timestamp: '1 д',
    lastMessageAt: NOW - DAY_MS,
    avatarSeed: 'SUP',
  },
  {
    id: 'chat-5',
    title: 'Дмитрий В.',
    lastMessage: 'Спасибо за ссылку на отчёт',
    timestamp: '1 д',
    lastMessageAt: NOW - DAY_MS,
    unreadCount: 2,
    avatarSeed: 'DV',
    clientId: 'client-5',
  },
  {
    id: 'chat-6',
    title: 'Дивидендный клуб',
    lastMessagePrefix: 'Елена',
    lastMessage: 'Кто держит MOEX в портфеле?',
    timestamp: '2 д',
    lastMessageAt: NOW - 2 * DAY_MS,
    avatarSeed: 'DK',
  },
  {
    id: 'chat-trader-3',
    title: 'Образец В.В.',
    lastMessage: 'Подскажите по диверсификации портфеля',
    timestamp: '10 мин',
    lastMessageAt: NOW - 10 * 60 * 1000,
    unreadCount: 1,
    avatarSeed: 'OV',
    clientId: 'client-3',
  },
  {
    id: CLIENT_TRADER_CHAT_ID,
    title: 'Александр М.',
    lastMessagePrefix: 'Александр',
    lastMessage: 'Добрый день! Готов ответить на ваши вопросы по портфелю.',
    timestamp: '15 мин',
    lastMessageAt: NOW - 15 * 60 * 1000,
    unreadCount: 2,
    avatarSeed: 'AM',
    clientId: 'client-1',
  },
];

export function getChatById(chatId: string): Chat | undefined {
  return mockChats.find((chat) => chat.id === chatId);
}

export function getTraderChats(): Chat[] {
  return mockChats.filter((chat) => chat.clientId);
}

export function getClientTraderChat(): Chat | undefined {
  return getChatById(CLIENT_TRADER_CHAT_ID);
}

export function getClientUnreadCount(): number {
  return getClientTraderChat()?.unreadCount ?? 0;
}

export function getTotalUnreadCount(chats: Chat[] = mockChats): number {
  return chats.reduce((total, chat) => total + (chat.unreadCount ?? 0), 0);
}

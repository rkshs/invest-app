import { getClientByAccountId } from '../../../entities/client';
import { Chat } from '../../../types/chat';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const NOW = Date.now();

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    title: 'Инвесторы PRO',
    lastMessagePrefix: 'Алексей',
    lastMessage: 'Как думаете по AAPL после отчёта?',
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
    id: 'chat-client-trader-1',
    title: 'Execution',
    lastMessagePrefix: 'Execution',
    lastMessage: 'Добрый день! Готов ответить на ваши вопросы по портфелю.',
    timestamp: '15 мин',
    lastMessageAt: NOW - 15 * 60 * 1000,
    unreadCount: 2,
    avatarSeed: 'EXE',
    clientId: 'client-1',
    accountId: '1',
  },
  {
    id: 'chat-client-trader-2',
    title: 'Execution',
    lastMessagePrefix: 'Execution',
    lastMessage: 'Пришлю обновлённый дивидендный календарь по вашему счёту.',
    timestamp: '1 ч',
    lastMessageAt: NOW - HOUR_MS,
    unreadCount: 1,
    avatarSeed: 'EXE',
    clientId: 'client-2',
    accountId: '2',
  },
  {
    id: 'chat-client-trader-3',
    title: 'Execution',
    lastMessagePrefix: 'Execution',
    lastMessage: 'Подскажите по диверсификации портфеля',
    timestamp: '5 мин',
    lastMessageAt: NOW - 5 * 60 * 1000,
    unreadCount: 3,
    avatarSeed: 'EXE',
    clientId: 'client-3',
    isTrustedPersonEntry: true,
  },
  {
    id: 'chat-client-trader-3-700103',
    title: 'Execution',
    lastMessagePrefix: 'Execution',
    lastMessage: 'Подскажите по диверсификации портфеля',
    timestamp: '10 мин',
    lastMessageAt: NOW - 10 * 60 * 1000,
    unreadCount: 1,
    avatarSeed: 'EXE',
    clientId: 'client-3',
    accountId: '3',
    parentChatId: 'chat-client-trader-3',
  },
  {
    id: 'chat-client-trader-3-700104',
    title: 'Execution',
    lastMessagePrefix: 'Execution',
    lastMessage: 'Нужно купить BND на 5 000 USD по счёту 700104',
    timestamp: '5 мин',
    lastMessageAt: NOW - 5 * 60 * 1000,
    unreadCount: 2,
    avatarSeed: 'EXE',
    clientId: 'client-3',
    accountId: '4',
    parentChatId: 'chat-client-trader-3',
  },
  {
    id: 'chat-client-trader-3-700105',
    title: 'Execution',
    lastMessagePrefix: 'Execution',
    lastMessage: 'Проверьте, пожалуйста, лимитные заявки по TSLA',
    timestamp: '2 ч',
    lastMessageAt: NOW - 2 * HOUR_MS,
    avatarSeed: 'EXE',
    clientId: 'client-3',
    accountId: '5',
    parentChatId: 'chat-client-trader-3',
  },
];

export function getChatById(chatId: string): Chat | undefined {
  return mockChats.find((chat) => chat.id === chatId);
}

export function getAllTraderChats(): Chat[] {
  return mockChats.filter((chat) => chat.clientId);
}

export function getTraderChats(): Chat[] {
  return getAllTraderChats().filter((chat) => !chat.parentChatId);
}

export function getSubChatsForParentChat(parentChatId: string): Chat[] {
  return mockChats.filter((chat) => chat.parentChatId === parentChatId);
}

export function getClientTraderChatId(accountId: string): string | undefined {
  const client = getClientByAccountId(accountId);

  if (!client) {
    return undefined;
  }

  return mockChats.find(
    (chat) => chat.clientId === client.id && chat.accountId === accountId,
  )?.id;
}

export function getClientUnreadCountForAccount(accountId: string): number {
  const chatId = getClientTraderChatId(accountId);

  if (!chatId) {
    return 0;
  }

  return getChatById(chatId)?.unreadCount ?? 0;
}

export function getTotalUnreadCount(chats: Chat[] = mockChats): number {
  return chats.reduce((total, chat) => total + (chat.unreadCount ?? 0), 0);
}


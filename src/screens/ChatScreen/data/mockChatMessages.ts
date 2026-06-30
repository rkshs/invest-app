import { ChatMessage } from '../../../types/chatMessage';

const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    chatId: 'chat-1',
    text: 'Как думаете по SBER после отчёта?',
    senderName: 'Алексей',
    isOwn: false,
    timestamp: '14:32',
  },
  {
    id: 'msg-2',
    chatId: 'chat-2',
    text: 'Отправлю дивидендный календарь',
    senderName: 'Вы',
    isOwn: true,
    timestamp: '12:05',
  },
  {
    id: 'msg-3',
    chatId: 'chat-3',
    text: 'Лонг по NVDA всё ещё актуален',
    senderName: 'Михаил',
    isOwn: false,
    timestamp: '11:48',
  },
  {
    id: 'msg-4',
    chatId: 'chat-4',
    text: 'Ваш запрос №1001 принят в работу',
    senderName: 'Поддержка',
    isOwn: false,
    timestamp: '09:15',
  },
  {
    id: 'msg-5',
    chatId: 'chat-5',
    text: 'Спасибо за ссылку на отчёт',
    senderName: 'Дмитрий',
    isOwn: false,
    timestamp: '18:40',
  },
  {
    id: 'msg-6',
    chatId: 'chat-6',
    text: 'Кто держит MOEX в портфеле?',
    senderName: 'Елена',
    isOwn: false,
    timestamp: '16:20',
  },
];

export function getMessageForChat(chatId: string): ChatMessage | undefined {
  return mockChatMessages.find((message) => message.chatId === chatId);
}

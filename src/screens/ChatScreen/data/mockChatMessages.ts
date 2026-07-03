import { ChatMessage } from '../../../types/chatMessage';

const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    chatId: 'chat-1',
    text: 'Как думаете по AAPL после отчёта?',
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
  {
    id: 'msg-client-trader-1',
    chatId: 'chat-client-trader-1',
    text: 'Добрый день! Готов ответить на ваши вопросы по портфелю.',
    senderName: 'Александр',
    isOwn: false,
    timestamp: '10:45',
  },
  {
    id: 'msg-client-trader-2',
    chatId: 'chat-client-trader-2',
    text: 'Пришлю обновлённый дивидендный календарь по вашему счёту.',
    senderName: 'Александр',
    isOwn: false,
    timestamp: '09:30',
  },
  {
    id: 'msg-client-trader-3-700103',
    chatId: 'chat-client-trader-3-700103',
    text: 'Подскажите по диверсификации портфеля',
    senderName: 'Александр',
    isOwn: false,
    timestamp: '11:10',
  },
  {
    id: 'msg-client-trader-3-700104',
    chatId: 'chat-client-trader-3-700104',
    text: 'Нужно купить BND на 5 000 USD по счёту 700104',
    senderName: 'Александр',
    isOwn: false,
    timestamp: '11:25',
  },
  {
    id: 'msg-client-trader-3-700105',
    chatId: 'chat-client-trader-3-700105',
    text: 'Проверьте, пожалуйста, лимитные заявки по TSLA',
    senderName: 'Александр',
    isOwn: false,
    timestamp: '09:40',
  },
];

export function getMessageForChat(chatId: string): ChatMessage | undefined {
  return mockChatMessages.find((message) => message.chatId === chatId);
}

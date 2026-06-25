import { ChatMessage } from '../../types/chatMessage';

export type SendChatMessageParams = {
  chatId: string;
  text: string;
  chatTitle: string;
  partnerName: string;
};

export type ChatIncomingReply = {
  chatId: string;
  text: string;
  senderName: string;
};

export type ChatMessagingService = {
  loadInitialMessages: (chatId: string) => ChatMessage[];
  sendMessage: (params: SendChatMessageParams) => Promise<ChatIncomingReply>;
};

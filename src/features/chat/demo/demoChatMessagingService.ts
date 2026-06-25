import { getMessageForChat } from '../../../screens/ChatScreen/data/mockChatMessages';
import { ChatIncomingReply, ChatMessagingService, SendChatMessageParams } from '../types';
import { generateDemoChatReply, waitForDemoReply } from './demoChatResponder';

export const demoChatMessagingService: ChatMessagingService = {
  loadInitialMessages(chatId) {
    const initialMessage = getMessageForChat(chatId);

    return initialMessage ? [initialMessage] : [];
  },

  async sendMessage(params: SendChatMessageParams): Promise<ChatIncomingReply> {
    await waitForDemoReply();

    const text = generateDemoChatReply(params.text, {
      chatId: params.chatId,
      chatTitle: params.chatTitle,
      partnerName: params.partnerName,
    });

    return {
      chatId: params.chatId,
      text,
      senderName: params.partnerName,
    };
  },
};

import { useCallback, useMemo, useState } from 'react';

import { getChatPartnerName } from '../../screens/ChatScreen/data/getChatPartnerName';
import { getChatById } from '../../screens/ChatScreen/data/mockChats';
import { ChatMessage } from '../../types/chatMessage';
import {
  createIncomingChatMessage,
  createOwnChatMessage,
} from './createChatMessage';
import { getChatMessagingService } from './getChatMessagingService';

export function useChatConversation(chatId: string) {
  const messagingService = useMemo(() => getChatMessagingService(), []);
  const chat = getChatById(chatId);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    messagingService.loadInitialMessages(chatId),
  );
  const [isReplyPending, setIsReplyPending] = useState(false);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!chat || isReplyPending) {
        return;
      }

      const trimmedText = text.trim();

      if (!trimmedText) {
        return;
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createOwnChatMessage(chatId, trimmedText),
      ]);
      setIsReplyPending(true);

      try {
        const reply = await messagingService.sendMessage({
          chatId,
          text: trimmedText,
          chatTitle: chat.title,
          partnerName: getChatPartnerName(chat),
        });

        setMessages((currentMessages) => [
          ...currentMessages,
          createIncomingChatMessage(chatId, reply.text, reply.senderName),
        ]);
      } finally {
        setIsReplyPending(false);
      }
    },
    [chat, chatId, isReplyPending, messagingService],
  );

  return {
    chat,
    messages,
    sendMessage,
    isReplyPending,
  };
}

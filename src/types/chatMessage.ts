export type ChatMessage = {
  id: string;
  chatId: string;
  text: string;
  senderName: string;
  isOwn: boolean;
  timestamp: string;
};

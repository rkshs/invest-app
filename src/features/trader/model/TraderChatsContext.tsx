import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { markChatAsRead, sortChats } from '../../chat/lib/sortChats';
import { getTraderChats } from '../../../screens/ChatScreen/data/mockChats';
import { Chat } from '../../../types/chat';

type TraderChatsContextValue = {
  chats: Chat[];
  markChatRead: (chatId: string) => void;
};

const TraderChatsContext = createContext<TraderChatsContextValue | null>(null);

type TraderChatsProviderProps = {
  children: ReactNode;
};

export function TraderChatsProvider({ children }: TraderChatsProviderProps) {
  const [chats, setChats] = useState<Chat[]>(() => sortChats(getTraderChats()));

  const markChatRead = useCallback((chatId: string) => {
    setChats((current) => sortChats(markChatAsRead(current, chatId)));
  }, []);

  const value = useMemo(
    () => ({
      chats,
      markChatRead,
    }),
    [chats, markChatRead],
  );

  return (
    <TraderChatsContext.Provider value={value}>{children}</TraderChatsContext.Provider>
  );
}

export function useTraderChats(): TraderChatsContextValue {
  const context = useContext(TraderChatsContext);

  if (!context) {
    throw new Error('useTraderChats must be used within TraderChatsProvider');
  }

  return context;
}

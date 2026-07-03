import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { syncTrustedPersonChats } from '../../chat/lib/syncTrustedPersonChats';
import { markChatAsRead, sortChats } from '../../chat/lib/sortChats';
import { getAllTraderChats } from '../../../screens/ChatScreen/data/mockChats';
import { Chat } from '../../../types/chat';

type TraderChatsContextValue = {
  chats: Chat[];
  listChats: Chat[];
  markChatRead: (chatId: string) => void;
  getSubChats: (parentChatId: string) => Chat[];
};

const TraderChatsContext = createContext<TraderChatsContextValue | null>(null);

type TraderChatsProviderProps = {
  children: ReactNode;
};

function buildTraderChatsState(chats: Chat[]): Chat[] {
  return sortChats(syncTrustedPersonChats(chats));
}

export function TraderChatsProvider({ children }: TraderChatsProviderProps) {
  const [chats, setChats] = useState<Chat[]>(() =>
    buildTraderChatsState(getAllTraderChats()),
  );

  const markChatRead = useCallback((chatId: string) => {
    setChats((current) => buildTraderChatsState(markChatAsRead(current, chatId)));
  }, []);

  const listChats = useMemo(
    () => chats.filter((chat) => !chat.parentChatId),
    [chats],
  );

  const getSubChats = useCallback(
    (parentChatId: string) =>
      sortChats(chats.filter((chat) => chat.parentChatId === parentChatId)),
    [chats],
  );

  const value = useMemo(
    () => ({
      chats,
      listChats,
      markChatRead,
      getSubChats,
    }),
    [chats, getSubChats, listChats, markChatRead],
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

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TraderStackParamList } from '../../../app/navigation';
import { ChatMessageBubble } from '../../../components/ChatMessageBubble';
import { ChatMessageInput } from '../../../components/ChatMessageInput';
import {
  getAccountForClientChat,
  getClientByChatId,
} from '../../../entities/client';
import { useChatConversation } from '../../chat';
import { colors, spacing, typography } from '../../../shared/theme';
import { ChatMessage } from '../../../types/chatMessage';
import { useTraderChats } from '../model/TraderChatsContext';
import { TraderChatDetailHeader } from './TraderChatDetailHeader';

type TraderChatDetailRouteProp = RouteProp<TraderStackParamList, 'TraderChatDetail'>;
type TraderChatDetailNavigationProp = NativeStackNavigationProp<
  TraderStackParamList,
  'TraderChatDetail'
>;

export function TraderChatDetailScreen() {
  const route = useRoute<TraderChatDetailRouteProp>();
  const navigation = useNavigation<TraderChatDetailNavigationProp>();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const { markChatRead } = useTraderChats();
  const { chat, messages, sendMessage, isReplyPending } = useChatConversation(
    route.params.chatId,
  );
  const client = chat ? getClientByChatId(chat.id) : undefined;
  const account = chat ? getAccountForClientChat(chat.id) : undefined;

  useEffect(() => {
    markChatRead(route.params.chatId);
  }, [markChatRead, route.params.chatId]);

  const scrollToLatestMessage = () => {
    listRef.current?.scrollToEnd({ animated: true });
  };

  const handlePortfolioPress = () => {
    if (!client || !account) {
      return;
    }

    navigation.navigate('TraderClientPortfolio', {
      accountId: account.id,
      clientName: client.name,
    });
  };

  if (!chat) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>Чат не найден</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TraderChatDetailHeader
        clientName={client?.name ?? chat.title}
        accountId={account?.id}
        onBackPress={() => navigation.goBack()}
        onPortfolioPress={client && account ? handlePortfolioPress : undefined}
      />

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessageBubble message={item} />}
        contentContainerStyle={styles.messagesContent}
        ItemSeparatorComponent={MessageSeparator}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToLatestMessage}
        onLayout={scrollToLatestMessage}
      />

      <ChatMessageInput
        bottomInset={insets.bottom}
        disabled={isReplyPending}
        onSendPress={sendMessage}
      />
    </View>
  );
}

function MessageSeparator() {
  return <View style={styles.messageSeparator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  messageSeparator: {
    height: spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  emptyStateText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
});

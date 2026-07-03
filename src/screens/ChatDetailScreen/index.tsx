import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ClientStackParamList } from '../../app/navigation';
import { ChatDetailHeader } from '../../components/ChatDetailHeader';
import { ChatMessageBubble } from '../../components/ChatMessageBubble';
import { ChatMessageInput } from '../../components/ChatMessageInput';
import { getAccountForClientChat } from '../../entities/client';
import { ClientChatPortfolioBar } from '../../features/client/ui/ClientChatPortfolioBar';
import { colors, spacing, typography } from '../../shared/theme';
import { ChatMessage } from '../../types/chatMessage';
import { useChatConversation } from '../../features/chat';

type ChatDetailRouteProp = RouteProp<ClientStackParamList, 'ChatDetail'>;
type ChatDetailNavigationProp = NativeStackNavigationProp<
  ClientStackParamList,
  'ChatDetail'
>;

export function ChatDetailScreen() {
  const route = useRoute<ChatDetailRouteProp>();
  const navigation = useNavigation<ChatDetailNavigationProp>();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const { chat, messages, sendMessage, isReplyPending } = useChatConversation(
    route.params.chatId,
  );
  const chatAccount = getAccountForClientChat(route.params.chatId);

  const scrollToLatestMessage = () => {
    listRef.current?.scrollToEnd({ animated: true });
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
      <View style={styles.headerSection}>
        <ChatDetailHeader
          chat={chat}
          onBackPress={() => navigation.goBack()}
        />

        {chatAccount ? (
          <ClientChatPortfolioBar cpid={chatAccount.cpid} />
        ) : null}
      </View>

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
  headerSection: {
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

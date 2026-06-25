import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../app/navigation';
import { ChatFab } from '../../components/ChatFab';
import { ChatListItem } from '../../components/ChatListItem';
import { ChatScreenHeader } from '../../components/ChatScreenHeader';
import { colors, spacing } from '../../shared/theme';
import { Chat } from '../../types/chat';
import { mockChats } from './data/mockChats';

type ChatNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

const FAB_CLEARANCE = 96;

export function ChatScreen() {
  const navigation = useNavigation<ChatNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleChatPress = (chat: Chat) => {
    navigation.navigate('ChatDetail', { chatId: chat.id });
  };

  return (
    <View style={styles.screen}>
      <ChatScreenHeader
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem chat={item} onPress={handleChatPress} />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: FAB_CLEARANCE + Math.max(insets.bottom, spacing.md) },
        ]}
        showsVerticalScrollIndicator={false}
      />

      <ChatFab bottomInset={insets.bottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingTop: spacing.xs,
  },
});

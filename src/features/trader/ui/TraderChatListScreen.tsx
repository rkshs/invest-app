import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TraderStackParamList } from '../../../app/navigation';
import { getClientByChatId } from '../../../entities/client';
import { ChatListItem } from '../../../components/ChatListItem';
import { colors, spacing } from '../../../shared/theme';
import { Chat } from '../../../types/chat';
import { useTraderChats } from '../model/TraderChatsContext';
import { TraderChatListHeader } from './TraderChatListHeader';

type TraderChatListNavigationProp = NativeStackNavigationProp<
  TraderStackParamList,
  'TraderChatList'
>;

export function TraderChatListScreen() {
  const navigation = useNavigation<TraderChatListNavigationProp>();
  const insets = useSafeAreaInsets();
  const { chats } = useTraderChats();

  const handleChatPress = (chat: Chat) => {
    navigation.navigate('TraderChatDetail', { chatId: chat.id });
  };

  return (
    <View style={styles.screen}>
      <TraderChatListHeader
        onSettingsPress={() => navigation.navigate('TraderSettings')}
      />

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            title={getClientByChatId(item.id)?.name ?? item.title}
            onPress={handleChatPress}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: Math.max(insets.bottom, spacing.xl) },
        ]}
        showsVerticalScrollIndicator={false}
      />
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

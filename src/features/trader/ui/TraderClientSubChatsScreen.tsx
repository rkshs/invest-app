import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TraderStackParamList } from '../../../app/navigation';
import { getAccountById } from '../../../screens/HomeScreen/data/mockAccounts';
import { ChatListItem } from '../../../components/ChatListItem';
import { colors, spacing } from '../../../shared/theme';
import { Chat } from '../../../types/chat';
import { useTraderChats } from '../model/TraderChatsContext';
import { TraderClientSubChatsHeader } from './TraderClientSubChatsHeader';

type TraderClientSubChatsRouteProp = RouteProp<
  TraderStackParamList,
  'TraderClientSubChats'
>;
type TraderClientSubChatsNavigationProp = NativeStackNavigationProp<
  TraderStackParamList,
  'TraderClientSubChats'
>;

function getSubChatTitle(chat: Chat): string {
  const account = chat.accountId ? getAccountById(chat.accountId) : undefined;

  if (!account) {
    return chat.title;
  }

  return `CPID ${account.cpid}`;
}

export function TraderClientSubChatsScreen() {
  const route = useRoute<TraderClientSubChatsRouteProp>();
  const navigation = useNavigation<TraderClientSubChatsNavigationProp>();
  const insets = useSafeAreaInsets();
  const { getSubChats } = useTraderChats();
  const subChats = getSubChats(route.params.parentChatId);

  const handleChatPress = (chat: Chat) => {
    navigation.navigate('TraderChatDetail', { chatId: chat.id });
  };

  return (
    <View style={styles.screen}>
      <TraderClientSubChatsHeader
        clientName={route.params.clientName}
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={subChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            title={getSubChatTitle(item)}
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

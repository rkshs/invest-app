import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TraderChatsProvider } from '../../features/trader/model/TraderChatsContext';
import { TraderChatDetailScreen } from '../../features/trader/ui/TraderChatDetailScreen';
import { TraderChatListScreen } from '../../features/trader/ui/TraderChatListScreen';
import { TraderClientSubChatsScreen } from '../../features/trader/ui/TraderClientSubChatsScreen';
import { TraderClientPortfolioScreen } from '../../features/trader/ui/TraderClientPortfolioScreen';
import { TraderSettingsScreen } from '../../features/trader/ui/TraderSettingsScreen';
import { TraderStackParamList } from './types';

const Stack = createNativeStackNavigator<TraderStackParamList>();

export function TraderNavigator() {
  return (
    <TraderChatsProvider>
      <Stack.Navigator initialRouteName="TraderChatList">
        <Stack.Screen
          name="TraderChatList"
          component={TraderChatListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TraderClientSubChats"
          component={TraderClientSubChatsScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="TraderChatDetail"
          component={TraderChatDetailScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="TraderClientPortfolio"
          component={TraderClientPortfolioScreen}
          options={{
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="TraderSettings"
          component={TraderSettingsScreen}
          options={{
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </TraderChatsProvider>
  );
}

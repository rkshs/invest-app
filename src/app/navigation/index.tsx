import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountScreen } from '../../screens/AccountScreen';
import { ChatDetailScreen } from '../../screens/ChatDetailScreen';
import { ChatScreen } from '../../screens/ChatScreen';
import { HomeScreen } from '../../screens/HomeScreen';
import { MarketsScreen } from '../../screens/MarketsScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { colors } from '../../shared/theme';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surfaceElevated,
    text: colors.text,
    border: colors.border,
    primary: colors.blue,
  },
};

export type RootStackParamList = {
  Home: undefined;
  Account: { accountId: string };
  Markets: undefined;
  Chat: undefined;
  ChatDetail: { chatId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigation() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            title: 'Счёт',
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="Markets"
          component={MarketsScreen}
          options={{ title: 'Рынки' }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="ChatDetail"
          component={ChatDetailScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

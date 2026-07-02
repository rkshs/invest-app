import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountScreen } from '../../screens/AccountScreen';
import { ChatDetailScreen } from '../../screens/ChatDetailScreen';
import { HomeScreen } from '../../screens/HomeScreen';
import { MarketsScreen } from '../../screens/MarketsScreen';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { ClientStackParamList } from './types';

const Stack = createNativeStackNavigator<ClientStackParamList>();

export function ClientNavigator() {
  return (
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
  );
}

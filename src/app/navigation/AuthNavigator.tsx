import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RoleSelectScreen } from '../../features/auth/ui/RoleSelectScreen';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
    </Stack.Navigator>
  );
}

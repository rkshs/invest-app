import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthFlow } from '../../features/auth/model/AuthFlowContext';
import { AuthBiometricScreen } from '../../features/auth/ui/screens/AuthBiometricScreen';
import { AuthCreatePasswordScreen } from '../../features/auth/ui/screens/AuthCreatePasswordScreen';
import { AuthIdentifierScreen } from '../../features/auth/ui/screens/AuthIdentifierScreen';
import { AuthLoginPinScreen } from '../../features/auth/ui/screens/AuthLoginPinScreen';
import { AuthLoginScreen } from '../../features/auth/ui/screens/AuthLoginScreen';
import { AuthOtpScreen } from '../../features/auth/ui/screens/AuthOtpScreen';
import { AuthPinCodeScreen } from '../../features/auth/ui/screens/AuthPinCodeScreen';
import { AuthRecoveryMethodScreen } from '../../features/auth/ui/screens/AuthRecoveryMethodScreen';
import { AuthSecondFactorScreen } from '../../features/auth/ui/screens/AuthSecondFactorScreen';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const authScreenOptions = {
  animation: 'slide_from_right' as const,
  animationDuration: 300,
  gestureEnabled: true,
};

function AuthStackNavigator() {
  const { hasCompletedOnboarding } = useAuthFlow();

  return (
    <Stack.Navigator
      initialRouteName={hasCompletedOnboarding ? 'AuthLogin' : 'AuthIdentifier'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthIdentifier" component={AuthIdentifierScreen} />
      <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={authScreenOptions} />
      <Stack.Screen
        name="AuthSecondFactor"
        component={AuthSecondFactorScreen}
        options={authScreenOptions}
      />
      <Stack.Screen name="AuthOtp" component={AuthOtpScreen} options={authScreenOptions} />
      <Stack.Screen
        name="AuthCreatePassword"
        component={AuthCreatePasswordScreen}
        options={authScreenOptions}
      />
      <Stack.Screen name="AuthPinCode" component={AuthPinCodeScreen} options={authScreenOptions} />
      <Stack.Screen
        name="AuthBiometric"
        component={AuthBiometricScreen}
        options={authScreenOptions}
      />
      <Stack.Screen
        name="AuthLoginPin"
        component={AuthLoginPinScreen}
        options={authScreenOptions}
      />
      <Stack.Screen
        name="AuthRecoveryMethod"
        component={AuthRecoveryMethodScreen}
        options={authScreenOptions}
      />
    </Stack.Navigator>
  );
}

export function AuthNavigator() {
  return <AuthStackNavigator />;
}

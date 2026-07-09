import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../../../app/navigation';
import { AuthPrimaryButton } from '../components/AuthPrimaryButton';
import { AuthScreenLayout } from '../layout/AuthScreenLayout';

type AuthRecoveryMethodNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthRecoveryMethod'
>;

export function AuthRecoveryMethodScreen() {
  const navigation = useNavigation<AuthRecoveryMethodNavigationProp>();

  return (
    <AuthScreenLayout
      title="Восстановление пароля"
      subtitle="Выберите способ получения кода"
      showLogo={false}
      backLinkLabel="Назад"
      onBackLinkPress={() => navigation.goBack()}
    >
      <AuthPrimaryButton label="Продолжить" onPress={() => undefined} disabled />
    </AuthScreenLayout>
  );
}

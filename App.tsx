import { StatusBar } from 'expo-status-bar';

import { AppNavigation } from './src/app/navigation';
import { AppProviders } from './src/app/providers';

export default function App() {
  return (
    <AppProviders>
      <AppNavigation />
      <StatusBar style="light" />
    </AppProviders>
  );
}

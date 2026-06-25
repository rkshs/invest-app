import { StyleSheet, Text, View } from 'react-native';

export function MarketsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Рынки</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
});

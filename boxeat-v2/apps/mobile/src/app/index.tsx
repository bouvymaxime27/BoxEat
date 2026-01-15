import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BoxEat V2</Text>
      <Text style={styles.subtitle}>Bienvenue sur la cantine digitale.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A'
  },
  title: {
    fontSize: 32,
    color: '#F8FAFC',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5F5',
    marginTop: 8
  }
});

import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>DISCOVERY POMPEII</Text>
        <Text style={styles.tagline}>
          Arriva al punto. Alza il telefono.{'\n'}Guarda Pompei ricostruirsi.
        </Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push('/map')}
      >
        <Text style={styles.buttonText}>ESPLORA LA MAPPA</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171310',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 140,
    paddingBottom: 56,
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    color: '#F5EFE6',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 4,
    textAlign: 'center',
  },
  tagline: {
    color: '#B8AFA3',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#B5651D',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#F5EFE6',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

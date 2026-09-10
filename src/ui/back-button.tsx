import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function BackButton() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={() => router.back()}
      style={[styles.button, { top: insets.top + 12, left: insets.left + 16 }]}
      hitSlop={8}
    >
      <Text style={styles.glyph}>‹</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#171310',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    color: '#F5EFE6',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
});

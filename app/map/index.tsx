import { StyleSheet, Text, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mappa — in arrivo (Milestone 3)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171310',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#F5EFE6',
    fontSize: 16,
  },
});

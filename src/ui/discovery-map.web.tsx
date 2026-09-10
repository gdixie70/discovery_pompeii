import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { buildings, discoveryPoints } from '@/content/pompeii';
import { useUserLocation, type UserLocationState } from '@/core/services/use-user-location';

function locationStatusText(state: UserLocationState): string {
  switch (state.status) {
    case 'idle':
    case 'requesting':
      return 'Richiesta posizione in corso…';
    case 'granted':
      return state.coords
        ? `La tua posizione: ${state.coords.latitude.toFixed(4)}, ${state.coords.longitude.toFixed(4)}`
        : 'Posizione non disponibile.';
    case 'denied':
      return 'Permesso di posizione negato.';
    case 'error':
      return `Errore posizione: ${state.errorMessage ?? 'sconosciuto'}`;
  }
}

/**
 * react-native-maps non supporta il web. Su questa piattaforma mostriamo
 * un elenco dei Discovery Point invece della mappa interattiva.
 */
export function DiscoveryMap() {
  const userLocation = useUserLocation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.notice}>
        Mappa interattiva disponibile su iOS/Android. Discovery Point:
      </Text>
      <Text style={styles.locationStatus}>{locationStatusText(userLocation)}</Text>
      {discoveryPoints.map((point) => {
        const building = buildings.find((b) => b.id === point.buildingId);
        return (
          <View key={point.id} style={styles.card}>
            <Text style={styles.cardTitle}>{building?.name.it ?? point.id}</Text>
            <Text style={styles.cardMeta}>
              {point.latitude.toFixed(4)}, {point.longitude.toFixed(4)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171310',
  },
  content: {
    padding: 24,
    gap: 12,
  },
  notice: {
    color: '#B8AFA3',
    fontSize: 14,
    marginBottom: 8,
  },
  locationStatus: {
    color: '#E8C39E',
    fontSize: 13,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#241E19',
    borderRadius: 8,
    padding: 16,
  },
  cardTitle: {
    color: '#F5EFE6',
    fontSize: 16,
    fontWeight: '600',
  },
  cardMeta: {
    color: '#B8AFA3',
    fontSize: 13,
    marginTop: 4,
  },
});

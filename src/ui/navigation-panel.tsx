import { StyleSheet, Text, View } from 'react-native';
import { buildings, discoveryPoints } from '@/content/pompeii';
import { bearingDegrees, formatDistance, haversineDistanceMeters } from '@/core/services/geo';
import { useHeading } from '@/core/services/use-heading';
import { useUserLocation } from '@/core/services/use-user-location';

interface NavigationPanelProps {
  buildingId: string;
}

export function NavigationPanel({ buildingId }: NavigationPanelProps) {
  const building = buildings.find((b) => b.id === buildingId);
  const point = discoveryPoints.find((p) => p.buildingId === buildingId);
  const userLocation = useUserLocation();
  const heading = useHeading();

  if (!building || !point) {
    return (
      <View style={styles.container}>
        <Text style={styles.status}>Discovery Point non trovato.</Text>
      </View>
    );
  }

  if (!userLocation.coords) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{building.name.it}</Text>
        <Text style={styles.status}>
          {userLocation.status === 'denied'
            ? 'Permesso di posizione negato.'
            : 'Ricerca posizione in corso…'}
        </Text>
      </View>
    );
  }

  const target = { latitude: point.latitude, longitude: point.longitude };
  const distanceMeters = haversineDistanceMeters(userLocation.coords, target);
  const bearing = bearingDegrees(userLocation.coords, target);
  const arrowRotation = heading.headingDegrees !== null ? bearing - heading.headingDegrees : bearing;

  const arrived = distanceMeters <= point.targetDistance;
  const nearby = !arrived && distanceMeters <= point.radius;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{building.name.it}</Text>
      <Text style={styles.distance}>{formatDistance(distanceMeters)}</Text>

      <View style={styles.arrowWrapper}>
        <Text style={[styles.arrowGlyph, { transform: [{ rotate: `${arrowRotation}deg` }] }]}>
          ↑
        </Text>
      </View>

      {arrived && <Text style={styles.status}>Sei arrivato</Text>}
      {nearby && (
        <Text style={styles.status}>Discovery Point a {Math.round(distanceMeters)} metri</Text>
      )}

      {heading.status !== 'active' && (
        <Text style={styles.hint}>
          {heading.status === 'unsupported'
            ? 'Bussola non disponibile su web — freccia orientata al nord.'
            : 'In attesa della bussola…'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171310',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    color: '#F5EFE6',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  distance: {
    color: '#F5EFE6',
    fontSize: 32,
    fontWeight: '700',
  },
  arrowWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#241E19',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  arrowGlyph: {
    color: '#B5651D',
    fontSize: 48,
    fontWeight: '700',
  },
  status: {
    color: '#E8C39E',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  hint: {
    color: '#B8AFA3',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});

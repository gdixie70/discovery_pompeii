import { Pressable, StyleSheet, Text, View } from 'react-native';
import { buildings, discoveryPoints, models } from '@/content/pompeii';
import { bearingDegrees, formatDistance, haversineDistanceMeters } from '@/core/services/geo';
import { useHeading } from '@/core/services/use-heading';
import { useModelDownload, type ModelDownloadState } from '@/core/services/use-model-download';
import { useUserLocation } from '@/core/services/use-user-location';

interface NavigationPanelProps {
  buildingId: string;
}

function modelStatusText(state: ModelDownloadState): string {
  switch (state.status) {
    case 'checking':
      return 'Verifica cache modello…';
    case 'idle':
      return 'Modello non ancora scaricato.';
    case 'downloading':
      return `Download modello: ${Math.round(state.progress * 100)}%`;
    case 'downloaded':
      return 'Modello scaricato.';
    case 'cached':
      return 'Modello gia in cache.';
    case 'unsupported':
      return 'Cache modello non disponibile su web.';
    case 'error':
      return `Errore download: ${state.errorMessage ?? 'sconosciuto'}`;
  }
}

export function NavigationPanel({ buildingId }: NavigationPanelProps) {
  const building = buildings.find((b) => b.id === buildingId);
  const point = discoveryPoints.find((p) => p.buildingId === buildingId);
  const model = models.find((m) => m.id === point?.modelId) ?? null;

  const userLocation = useUserLocation();
  const heading = useHeading();
  const modelDownload = useModelDownload(model);

  if (!building || !point) {
    return (
      <View style={styles.container}>
        <Text style={styles.status}>Discovery Point non trovato.</Text>
      </View>
    );
  }

  const target = { latitude: point.latitude, longitude: point.longitude };
  const distanceMeters = userLocation.coords
    ? haversineDistanceMeters(userLocation.coords, target)
    : null;
  const bearing = userLocation.coords ? bearingDegrees(userLocation.coords, target) : null;
  const arrowRotation =
    bearing === null ? null : heading.headingDegrees !== null ? bearing - heading.headingDegrees : bearing;

  const arrived = distanceMeters !== null && distanceMeters <= point.targetDistance;
  const nearby = distanceMeters !== null && !arrived && distanceMeters <= point.radius;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{building.name.it}</Text>

      {distanceMeters !== null && arrowRotation !== null ? (
        <>
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
        </>
      ) : (
        <Text style={styles.status}>
          {userLocation.status === 'denied'
            ? 'Permesso di posizione negato.'
            : 'Ricerca posizione in corso…'}
        </Text>
      )}

      <View style={styles.modelSection}>
        <Text style={styles.hint}>{modelStatusText(modelDownload)}</Text>
        {modelDownload.status === 'idle' && (
          <Pressable style={styles.downloadButton} onPress={modelDownload.download}>
            <Text style={styles.downloadButtonText}>Scarica modello</Text>
          </Pressable>
        )}
      </View>
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
  modelSection: {
    marginTop: 24,
    alignItems: 'center',
    gap: 10,
  },
  downloadButton: {
    backgroundColor: '#B5651D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: '#F5EFE6',
    fontSize: 13,
    fontWeight: '600',
  },
});

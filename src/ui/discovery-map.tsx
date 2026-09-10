import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { buildings, discoveryPoints, pompeiiSite } from '@/content/pompeii';
import { formatDistance, haversineDistanceMeters } from '@/core/services/geo';
import { useHeading } from '@/core/services/use-heading';
import { useUserLocation } from '@/core/services/use-user-location';

export function DiscoveryMap() {
  const userLocation = useUserLocation();
  const heading = useHeading();

  return (
    <View style={styles.container}>
      {heading.status === 'active' && heading.headingDegrees !== null && (
        <View style={styles.headingBadge}>
          <Text style={styles.headingText}>{Math.round(heading.headingDegrees)}°</Text>
        </View>
      )}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: pompeiiSite.location.latitude,
          longitude: pompeiiSite.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={userLocation.status === 'granted'}
        showsMyLocationButton
      >
        {discoveryPoints.map((point) => {
          const building = buildings.find((b) => b.id === point.buildingId);
          const distance = userLocation.coords
            ? formatDistance(
                haversineDistanceMeters(userLocation.coords, {
                  latitude: point.latitude,
                  longitude: point.longitude,
                }),
              )
            : null;
          return (
            <Marker
              key={point.id}
              coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{building?.name.it ?? point.id}</Text>
                  <Text style={styles.calloutDescription}>{point.description.it}</Text>
                  {distance && <Text style={styles.calloutDistance}>{distance}</Text>}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  headingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: '#171310',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  headingText: {
    color: '#F5EFE6',
    fontSize: 14,
    fontWeight: '700',
  },
  callout: {
    width: 220,
    padding: 4,
  },
  calloutTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  calloutDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  calloutDistance: {
    fontWeight: '700',
    fontSize: 13,
    marginTop: 6,
    color: '#B5651D',
  },
});

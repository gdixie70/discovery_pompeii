import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { buildings, discoveryPoints, pompeiiSite } from '@/content/pompeii';
import { formatDistance, haversineDistanceMeters } from '@/core/services/geo';
import { useUserLocation } from '@/core/services/use-user-location';

export function DiscoveryMap() {
  const userLocation = useUserLocation();

  return (
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
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
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

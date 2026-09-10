import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
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
        const distanceLabel = userLocation.coords
          ? ` — ${formatDistance(
              haversineDistanceMeters(userLocation.coords, {
                latitude: point.latitude,
                longitude: point.longitude,
              }),
            )}`
          : '';
        return (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={building?.name.it ?? point.id}
            description={`${point.description.it}${distanceLabel}`}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

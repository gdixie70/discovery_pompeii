import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { buildings, discoveryPoints, pompeiiSite } from '@/content/pompeii';

export function DiscoveryMap() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: pompeiiSite.location.latitude,
        longitude: pompeiiSite.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {discoveryPoints.map((point) => {
        const building = buildings.find((b) => b.id === point.buildingId);
        return (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={building?.name.it ?? point.id}
            description={point.description.it}
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

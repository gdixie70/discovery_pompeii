import { View } from 'react-native';
import { BackButton } from '@/ui/back-button';
import { DiscoveryMap } from '@/ui/discovery-map';

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <DiscoveryMap />
      <BackButton />
    </View>
  );
}

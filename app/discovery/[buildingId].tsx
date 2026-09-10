import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { BackButton } from '@/ui/back-button';
import { NavigationPanel } from '@/ui/navigation-panel';

export default function DiscoveryScreen() {
  const { buildingId } = useLocalSearchParams<{ buildingId: string }>();
  return (
    <View style={{ flex: 1 }}>
      <NavigationPanel buildingId={buildingId} />
      <BackButton />
    </View>
  );
}

import { useLocalSearchParams } from 'expo-router';
import { NavigationPanel } from '@/ui/navigation-panel';

export default function DiscoveryScreen() {
  const { buildingId } = useLocalSearchParams<{ buildingId: string }>();
  return <NavigationPanel buildingId={buildingId} />;
}

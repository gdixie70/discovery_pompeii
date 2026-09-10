import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export interface UserLocationState {
  coords: { latitude: number; longitude: number } | null;
  status: 'idle' | 'requesting' | 'granted' | 'denied' | 'error';
  errorMessage?: string;
}

/**
 * Richiede il permesso di posizione e ottiene la posizione corrente
 * dell'utente. Precisione "Balanced": adatta alla modalita Explore, non
 * alla precisione richiesta in Approach/Discovery (vedi ARCHITECTURE.md).
 */
export function useUserLocation(): UserLocationState {
  const [state, setState] = useState<UserLocationState>({ coords: null, status: 'idle' });

  useEffect(() => {
    let isMounted = true;

    async function requestLocation() {
      setState((prev) => ({ ...prev, status: 'requesting' }));

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (isMounted) setState({ coords: null, status: 'denied' });
        return;
      }

      try {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (isMounted) {
          setState({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            status: 'granted',
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            coords: null,
            status: 'error',
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }

    requestLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}

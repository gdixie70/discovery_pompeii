import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export interface HeadingState {
  headingDegrees: number | null;
  status: 'idle' | 'unsupported' | 'requesting' | 'active' | 'denied' | 'error';
  errorMessage?: string;
}

/**
 * Orientamento del dispositivo (bussola), via magnetometro. Non
 * disponibile su web: expo-location non espone watchHeadingAsync su
 * quella piattaforma.
 */
export function useHeading(): HeadingState {
  const [state, setState] = useState<HeadingState>({ headingDegrees: null, status: 'idle' });

  useEffect(() => {
    if (Platform.OS === 'web') {
      setState({ headingDegrees: null, status: 'unsupported' });
      return;
    }

    let subscription: Location.LocationSubscription | null = null;
    let isMounted = true;

    async function start() {
      setState((prev) => ({ ...prev, status: 'requesting' }));

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (isMounted) setState({ headingDegrees: null, status: 'denied' });
        return;
      }

      try {
        subscription = await Location.watchHeadingAsync((heading) => {
          if (!isMounted) return;
          const degrees = heading.trueHeading >= 0 ? heading.trueHeading : heading.magHeading;
          setState({ headingDegrees: degrees, status: 'active' });
        });
      } catch (error) {
        if (isMounted) {
          setState({
            headingDegrees: null,
            status: 'error',
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }

    start();

    return () => {
      isMounted = false;
      subscription?.remove();
    };
  }, []);

  return state;
}

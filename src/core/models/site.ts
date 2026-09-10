import type { LocalizedText } from './localized-text';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Site {
  id: string;
  name: string;
  location: Coordinates;
  description: LocalizedText;
}

export interface Building {
  id: string;
  siteId: string;
  name: LocalizedText;
  period: string;
  description: LocalizedText;
}

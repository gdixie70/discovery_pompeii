import type { LocalizedText } from './localized-text';

export interface Source {
  id: string;
  type: 'book' | 'article' | 'archive' | 'other';
  citation: string;
  url?: string;
}

export interface HistoricalContent {
  id: string;
  buildingId: string;
  title: LocalizedText;
  body: LocalizedText;
  sources: Source[];
}

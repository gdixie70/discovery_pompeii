import type { LocalizedText } from './localized-text';

export interface AROffset {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
}

export interface DiscoveryPoint {
  id: string;
  siteId: string;
  buildingId: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  /** Orientamento atteso dell'utente, in gradi (0-360). */
  heading: number;
  /** Distanza in metri considerata "arrivato" al Discovery Point. */
  targetDistance: number;
  /** Raggio in metri di attivazione della modalita Approach. */
  radius: number;
  modelId: string;
  arOffset: AROffset;
  scale: number;
  /** Asset immagine/sagoma usato per l'allineamento manuale. */
  visualReference?: string;
  active: boolean;
  description: LocalizedText;
}

export interface ARConfiguration {
  discoveryPointId: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  opacity: number;
  /** ISO date della calibrazione. */
  calibratedAt: string;
  calibratedBy: string;
}

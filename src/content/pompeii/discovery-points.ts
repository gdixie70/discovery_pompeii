import type { DiscoveryPoint } from '@/core/models';

/**
 * Coordinate approssimative: da rilevare e ricalibrare sul campo
 * (Milestone 14 — Test sul campo a Pompei).
 */
export const houseOfFaunDiscoveryPoint: DiscoveryPoint = {
  id: 'dp_house_of_faun_01',
  siteId: 'pompeii',
  buildingId: 'house_of_faun',
  latitude: 40.7503,
  longitude: 14.4886,
  heading: 90,
  targetDistance: 10,
  radius: 40,
  modelId: 'house_of_faun_model',
  arOffset: { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0 },
  scale: 1,
  active: true,
  description: {
    it: 'Ingresso principale della Casa del Fauno, su Via della Fortuna.',
    en: 'Main entrance of the House of the Faun, on Via della Fortuna.',
  },
};

export const discoveryPoints: DiscoveryPoint[] = [houseOfFaunDiscoveryPoint];

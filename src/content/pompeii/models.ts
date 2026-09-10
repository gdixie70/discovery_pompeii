import type { Model3D } from '@/core/models';

/**
 * Placeholder: nessun modello Blender reale ancora disponibile.
 * Verra sostituito alla Milestone 13 (primo modello Blender reale) e
 * collegato al download/cache alla Milestone 8.
 */
export const houseOfFaunModel: Model3D = {
  id: 'house_of_faun_model',
  buildingId: 'house_of_faun',
  formats: {
    glb: '',
  },
  lodLevels: [],
  sizeBytes: 0,
  version: '0.0.0-placeholder',
};

export const models: Model3D[] = [houseOfFaunModel];

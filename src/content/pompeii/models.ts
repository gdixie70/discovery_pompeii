import type { Model3D } from '@/core/models';

/**
 * Placeholder: nessun modello Blender reale ancora disponibile (Milestone 13).
 * Per testare davvero il meccanismo di download/cache (Milestone 8) puntiamo
 * a un GLB pubblico minimale del repo glTF-Sample-Assets di Khronos, invece
 * di un URL vuoto.
 */
export const houseOfFaunModel: Model3D = {
  id: 'house_of_faun_model',
  buildingId: 'house_of_faun',
  formats: {
    glb: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb',
  },
  lodLevels: [],
  sizeBytes: 120484,
  version: '0.0.1-placeholder',
};

export const models: Model3D[] = [houseOfFaunModel];

export interface LODLevel {
  level: number;
  /** Distanza in metri dalla camera sotto la quale questo LOD si applica. */
  distanceThreshold: number;
  glbUrl: string;
  sizeBytes: number;
}

export interface Model3D {
  id: string;
  buildingId: string;
  formats: {
    glb: string;
    usdz?: string;
  };
  lodLevels: LODLevel[];
  sizeBytes: number;
  version: string;
}

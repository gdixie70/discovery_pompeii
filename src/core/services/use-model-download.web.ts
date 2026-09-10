import { useCallback } from 'react';
import type { Model3D } from '@/core/models';
import type { ModelDownloadState } from './use-model-download';

/**
 * Su web, expo-file-system non offre un filesystem persistente reale
 * (il modulo nativo e uno stub). Cache/download del modello 3D restano
 * disponibili solo su iOS/Android.
 */
export function useModelDownload(_model: Model3D | null) {
  const state: ModelDownloadState = {
    status: 'unsupported',
    progress: 0,
    localUri: null,
  };

  const download = useCallback(() => {}, []);

  return { ...state, download };
}

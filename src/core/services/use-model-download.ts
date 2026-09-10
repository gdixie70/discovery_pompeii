import { Directory, File, Paths } from 'expo-file-system';
import { useCallback, useEffect, useState } from 'react';
import type { Model3D } from '@/core/models';

export interface ModelDownloadState {
  status: 'idle' | 'checking' | 'cached' | 'downloading' | 'downloaded' | 'unsupported' | 'error';
  progress: number;
  localUri: string | null;
  errorMessage?: string;
}

const MODELS_DIR_NAME = 'models';

function getModelsDirectory(): Directory {
  const dir = new Directory(Paths.cache, MODELS_DIR_NAME);
  if (!dir.exists) {
    dir.create({ intermediates: true, idempotent: true });
  }
  return dir;
}

function getModelFileName(model: Model3D): string {
  return `${model.id}-${model.version}.glb`;
}

/**
 * Verifica se il modello e gia in cache locale e, se richiesto, lo scarica.
 * Non disponibile su web: expo-file-system non espone un vero filesystem
 * persistente su quella piattaforma (vedi use-model-download.web.ts).
 */
export function useModelDownload(model: Model3D | null) {
  const [state, setState] = useState<ModelDownloadState>({
    status: 'checking',
    progress: 0,
    localUri: null,
  });

  useEffect(() => {
    if (!model) {
      setState({ status: 'idle', progress: 0, localUri: null });
      return;
    }
    const dir = getModelsDirectory();
    const file = new File(dir, getModelFileName(model));
    if (file.exists) {
      setState({ status: 'cached', progress: 1, localUri: file.uri });
    } else {
      setState({ status: 'idle', progress: 0, localUri: null });
    }
  }, [model]);

  const download = useCallback(async () => {
    if (!model || !model.formats.glb) {
      setState({
        status: 'error',
        progress: 0,
        localUri: null,
        errorMessage: 'Nessun URL modello disponibile.',
      });
      return;
    }

    const dir = getModelsDirectory();
    const destination = new File(dir, getModelFileName(model));
    setState({ status: 'downloading', progress: 0, localUri: null });

    try {
      const task = File.createDownloadTask(model.formats.glb, destination, {
        onProgress: ({ bytesWritten, totalBytes }) => {
          setState((prev) => ({
            ...prev,
            status: 'downloading',
            progress: totalBytes > 0 ? bytesWritten / totalBytes : 0,
          }));
        },
      });
      const downloadedFile = await task.downloadAsync();
      if (downloadedFile) {
        setState({ status: 'downloaded', progress: 1, localUri: downloadedFile.uri });
      } else {
        setState({ status: 'error', progress: 0, localUri: null, errorMessage: 'Download interrotto.' });
      }
    } catch (error) {
      setState({
        status: 'error',
        progress: 0,
        localUri: null,
        errorMessage: error instanceof Error ? error.message : 'Errore sconosciuto',
      });
    }
  }, [model]);

  return { ...state, download };
}

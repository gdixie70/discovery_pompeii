# Discovery Point — Data Model

Modello data-driven: aggiungere un edificio non deve richiedere modifiche
strutturali al codice, solo nuovi dati.

```ts
Site {
  id: string
  name: string
  location: { latitude: number; longitude: number }
  description: LocalizedText
}

Building {
  id: string
  siteId: string
  name: LocalizedText
  period: string
  description: LocalizedText
}

DiscoveryPoint {
  id: string
  siteId: string
  buildingId: string
  latitude: number
  longitude: number
  altitude?: number
  heading: number            // orientamento atteso dell'utente, in gradi
  targetDistance: number     // distanza in metri considerata "arrivato"
  radius: number             // raggio di attivazione della modalità Approach
  modelId: string
  arOffset: {
    x: number; y: number; z: number
    rotX: number; rotY: number; rotZ: number
  }
  scale: number
  visualReference?: string   // asset immagine/sagoma per l'allineamento manuale
  active: boolean
  description: LocalizedText
}

Model3D {
  id: string
  buildingId: string
  formats: { glb: string; usdz?: string }
  lodLevels: LODLevel[]
  sizeBytes: number
  version: string
}

ARConfiguration {
  discoveryPointId: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: number
  opacity: number
  calibratedAt: string        // ISO date
  calibratedBy: string
}

HistoricalContent {
  id: string
  buildingId: string
  title: LocalizedText
  body: LocalizedText
  sources: Source[]
}

Source {
  id: string
  type: 'book' | 'article' | 'archive' | 'other'
  citation: string
  url?: string
}

LocalizedText = Record<'it' | 'en' | string, string>
```

## Export calibrazione (Developer Mode)

Formato di esportazione usato dalla modalità di calibrazione manuale sul campo:

```json
{
  "buildingId": "house_of_faun",
  "discoveryPointId": "dp01",
  "position": { "x": 0, "y": 0, "z": 0 },
  "rotation": { "x": 0, "y": 0, "z": 0 },
  "scale": 1.0
}
```

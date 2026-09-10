# Architettura

## Principio guida

Il **Discovery Engine** (motore generico: siti, edifici, discovery point, cache,
navigazione, AR) è separato dal **Pompeii Content** (dati specifici di Pompei). Il
core non deve dipendere da nulla che sia specifico di Pompei, per permettere in
futuro di riusarlo su altri siti (Roma, Ercolano, Atene, Egitto...).

## Diagramma logico

```
React Native / Expo (Development Build)
│
├── App Shell (Expo Router, i18n, theming)
├── Home / Content / Offline / Downloads   ← puro JS/Expo SDK, gira in Expo Go
├── Map + Discovery Points                 ← puro JS/Expo SDK, gira in Expo Go
├── Navigation to Discovery Point          ← puro JS/Expo SDK, gira in Expo Go
│
└── AR Module (Expo Config Plugin + Native Module)
    ├── iOS: ARKit session bridge (Swift)
    ├── Android: ARCore session bridge (Kotlin)
    └── JS interface: startSession(), getPose(), placeAnchor(), stopSession()
       → rendering modello via expo-gl / three.js, alimentato dai dati nativi
```

## Struttura cartelle

```
Discovery_Pompeii/
├── app/                        # expo-router screens
│   ├── index.tsx                # Home
│   ├── map/index.tsx            # Mappa + marker
│   ├── discovery/[buildingId].tsx  # Navigazione verso un Discovery Point
│   └── _layout.tsx
├── src/
│   ├── core/                   # Discovery Engine (site-agnostic)
│   │   ├── models/              # Site, Building, DiscoveryPoint, ARConfiguration...
│   │   ├── services/            # geo, use-user-location, use-heading, cache, download
│   │   └── state/
│   ├── content/pompeii/         # Pompeii-specific data/content
│   ├── ar/                      # AR module JS interface + fallback
│   ├── ui/                      # componenti condivisi (DiscoveryMap, NavigationPanel...)
│   └── i18n/
├── modules/
│   └── discovery-ar/            # Expo native module (Swift/Kotlin) - da Milestone 9
├── assets/models/                # placeholder in dev, poi download runtime
└── docs/
```

Nota: le route dinamiche a segmento singolo usano un file piatto
(`discovery/[buildingId].tsx`), non una cartella con `index.tsx` —
il generatore di typed routes di Expo Router non tipizza correttamente
quest'ultima forma (registra il percorso letterale invece del segmento
dinamico). Vedi [DECISIONS.md](DECISIONS.md).

## Stati dell'app (gestione batteria)

- **Explore**: GPS normale, mappa, camera OFF, AR OFF.
- **Approach**: quando l'utente si avvicina a un Discovery Point — GPS più
  preciso, bussola, direzione.
- **Discovery**: solo dopo pressione esplicita di "Avvia Discovery" — fotocamera,
  AR, tracking, rendering 3D attivi. Disattivati all'uscita dalla schermata.

## Confine Expo Go / Development Build

Tutto ciò che precede l'attivazione della fotocamera AR (stati Explore/Approach,
mappa, navigazione, cache, download — Milestone 0-8) girava in Expo Go. Da
Milestone 9 (`@reactvision/react-viro`) il progetto richiede una Expo
Development Build (EAS Build); Expo Go non è più sufficiente per testare
l'intera app. Vedi [AR_RESEARCH.md](AR_RESEARCH.md) per il dettaglio.

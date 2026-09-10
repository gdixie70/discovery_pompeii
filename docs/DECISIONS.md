# Decision Log

Formato: data, decisione, motivazione. Aggiungere una voce ogni volta che si
prende una decisione architetturale importante.

## 2026-09-10 — Repository Git dedicato

Il progetto vive in un repository Git indipendente, creato dentro
`Discovery_Pompeii` e collegato a `https://github.com/gdixie70/discovery_pompeii`.

**Perché**: la cartella di progetto si trovava annidata sotto un repository Git
a livello dell'intera home directory dell'utente (nessun remote configurato).
Continuare a usarlo avrebbe rischiato di tracciare file estranei o sensibili di
altri progetti/di sistema. Git supporta repository annidati: quello creato dentro
`Discovery_Pompeii` ha precedenza per quell'albero di cartelle.

## 2026-09-10 — Expo Go per l'MVP non-AR, Development Build per l'AR

**Decisione**: sviluppare Home, mappa, Discovery Point, navigazione, cache e
download interamente in Expo Go (Milestone 0-8). Passare a un Expo Development
Build con modulo nativo custom a partire dalla Milestone 9, quando serve vero
world-tracking ARKit/ARCore.

**Perché**: Expo Go non include (e non può includere, essendo un binario
precompilato) moduli nativi AR (ARKit/ARCore world tracking, plane detection,
anchor). Permette però iterazione rapidissima su tutto il resto dell'app.
Vedi [AR_RESEARCH.md](AR_RESEARCH.md).

## 2026-09-10 — Discovery Engine disaccoppiato dal contenuto Pompei

**Decisione**: il core (`src/core/`) non deve contenere nulla di specifico su
Pompei; i contenuti Pompei vivono in `src/content/pompeii/`.

**Perché**: possibilità dichiarata di riusare il motore su altri siti
archeologici (Roma, Ercolano, Atene, Egitto) senza riscrivere il core.

## 2026-09-10 — Route dinamiche come file piatto, non cartella+index

**Decisione**: `app/discovery/[buildingId].tsx` invece di
`app/discovery/[buildingId]/index.tsx`.

**Perché**: con typed routes attivo, Expo Router registrava la seconda forma
come il percorso letterale `/discovery/[buildingId]/index` invece del segmento
dinamico `/discovery/[buildingId]`, causando errori di type-check su
`router.push()`. Il file piatto genera il tipo corretto.

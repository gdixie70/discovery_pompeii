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

## 2026-09-10 — ViroReact (`@reactvision/react-viro`) come tecnologia AR

**Decisione**: usare `@reactvision/react-viro` (ex ViroReact/NativeVision) come
libreria AR per il prototipo, invece di un modulo nativo custom scritto da
zero. Passaggio da Expo Go a Expo Development Build (EAS Build) a partire da
questo momento — confermato dall'utente dopo revisione dell'analisi.

**Perché**: verificato via ricerca (non solo dalla mia conoscenza pregressa)
che la versione attiva (2.58.x, aggiornata nelle ultime 24h al momento della
decisione) supporta la New Architecture/Fabric richiesta da React Native 0.86
(SDK 57), ha un config plugin Expo ufficiale e uno starter kit Expo
Router + TypeScript. Espone ARKit/ARCore, plane detection e anchor management
già pronti — scriverli da zero (opzione "modulo nativo custom") richiederebbe
settimane non compatibili con un MVP a sviluppatore singolo. Vedi
[AR_RESEARCH.md](AR_RESEARCH.md) per il confronto completo.

**Configurazione**: `provider: "none"` nel config plugin — disabilita i cloud
anchor di ReactVision/ARCore (non servono: il nostro sistema di allineamento è
manuale, vedi [DISCOVERY_POINT_SPEC.md](DISCOVERY_POINT_SPEC.md)), evitando la
necessità di API key esterne.

**Impatto**: da questo punto in poi l'AR non è testabile in Expo Go, serve una
Development Build installata sul dispositivo. Vedi la voce successiva per come
viene generata.

## 2026-09-10 — Build native in locale (Mac/Android Studio), non via EAS Build

**Decisione**: usare `npx expo run:ios` (dal MacBook dell'utente) e
`npx expo run:android` (locale, PC Windows o Mac con Android Studio) per
generare e installare le Development Build durante lo sviluppo quotidiano.
EAS Build/Submit restano disponibili (`eas.json` già configurato) ma riservati
a un secondo momento (distribuzione TestFlight/Play Store, non iterazione
giornaliera).

**Perché**: tentato inizialmente EAS Build (cloud) per iOS, unica opzione
disponibile finché si pensava che l'utente sviluppasse solo da Windows (senza
Mac, impossibile compilare iOS in locale). Il primo giorno di test ha
incontrato due problemi consecutivi irrisolti da remoto:
1. Build ad-hoc (`development`) installata sul device ma bloccata da iOS con
   "impossibile verificare l'integrità" — causa non diagnosticabile senza
   accesso ai log di sistema del device (serve Mac + Console.app/Xcode).
2. Tentativo alternativo via TestFlight (`production` + `eas submit`) fallito
   per un record app "fantasma" su App Store Connect (bundle ID
   `com.gdixie70.discoverypompeii` correttamente registrato come Identifier,
   ma app non trovata/non creabile su App Store Connect — creazione
   automatica di EAS Submit apparentemente fallita a metà, non risolta).

Nel frattempo, l'utente ha esaurito builder EAS gratuite spese su più progetti
nello stesso account in pochi giorni. Emerso che l'utente ha in realtà un
MacBook disponibile: la build locale via Xcode elimina completamente sia il
problema di costo (nessuna build EAS consumata per l'iterazione quotidiana)
sia il problema di diagnosi (log di sistema disponibili direttamente in
Xcode/Console.app in caso di problemi).

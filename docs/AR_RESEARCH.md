# AR Research

## Limiti di Expo Go

Expo Go è un binario precompilato distribuito da Expo: non può includere moduli
nativi custom. Funziona in Expo Go:

- `expo-camera` in modalità foto/video (non AR)
- `expo-gl` + three.js per rendering 3D non ancorato (utile come placeholder,
  Milestone 8)
- `expo-location` (GPS, heading), `expo-sensors` (magnetometro)

Non funziona in Expo Go (richiede Expo Development Build):

- World tracking ARKit (iOS) / ARCore (Android): pose della camera nel mondo,
  plane detection, anchor persistenti — il cuore tecnico dell'ancoraggio del
  modello nello spazio.
- Librerie come ViroReact, react-native-arkit, moduli nativi custom via Expo
  Modules API.

Il confine esatto è la **Milestone 9**: finché non serve ancorare un modello 3D
nello spazio reale e farlo restare fermo mentre l'utente si muove, Expo Go basta.

## Confronto tecnologie AR

| Opzione | iOS | Android | Integrazione RN | Note |
|---|---|---|---|---|
| ViroReact | ARKit | ARCore | Buona, verificare stato di manutenzione attuale prima di impegnarsi | Storicamente la scelta "RN-native" per AR cross-platform |
| react-native-arkit / react-native-arcore separati | ARKit | ARCore | Richiede due codebase parallele | Sconsigliato per un solo developer |
| Modulo nativo custom (Expo Modules API) | ARKit diretto | ARCore diretto | Massimo controllo, massima qualità tracking | Più lavoro iniziale, nessuna dipendenza da librerie terze non mantenute |
| Unity + AR Foundation (react-native-unity) | ARKit via AR Foundation | ARCore via AR Foundation | Bridge RN↔Unity aggiunge peso/complessità | Overkill per l'MVP; da rivalutare se servono VFX avanzati |

**Decisione presa (Milestone 9, 2026-09-10)**: `@reactvision/react-viro`
(ex ViroReact/NativeVision). Verificato via ricerca al momento della decisione
(non solo dalla conoscenza pregressa) che:

- Versione attiva 2.58.x, aggiornata nelle ultime 24h — non è un progetto
  abbandonato come temuto nell'analisi iniziale.
- Supporta la New Architecture/Fabric richiesta da React Native 0.86 (SDK 57).
- Config plugin Expo ufficiale + starter kit Expo Router/TypeScript.
- Espone ARKit/ARCore, plane detection e anchor management già pronti,
  risparmiando settimane di lavoro nativo Swift/Kotlin rispetto al modulo
  custom.

Compromesso accettato: dipendenza da un progetto di terzi, libreria che porta
anche funzionalità VR non usate, meno controllo fine sul rendering rispetto a
`expo-gl`/three.js puro. Da rivalutare (possibile passaggio a modulo nativo
custom, vedi anche `@stewmore/expo-ar` — molto giovane, v0.1.0 al momento
della ricerca) solo se emergono limiti concreti di rendering sul campo.

Configurato con `provider: "none"` (disabilita i cloud anchor
ReactVision/ARCore: non servono, il nostro allineamento è manuale — vedi
sotto) e `android.xRMode: ["AR"]` (esclude la modalità GVR/VR di default,
non pertinente per questa app).

Unity non è stato scelto: runtime pesante, bridge RN↔Unity fragile da
mantenere, sproporzionato per un MVP con un solo edificio.

## Development Build

Da qui in poi l'app richiede una Expo Development Build, non più Expo Go.

**Build locali (scelta attuale)** — vedi [DECISIONS.md](DECISIONS.md):

- iOS: `npx expo run:ios --device` dal MacBook dell'utente (Xcode).
- Android: `npx expo run:android` (PC Windows o Mac con Android Studio/SDK).
- Nessun costo, nessuna quota EAS consumata, log di sistema disponibili
  direttamente in caso di problemi (Xcode/Console.app, Android Studio
  Logcat).

**EAS Build/Submit (cloud)** — tentato inizialmente perché si credeva l'utente
sviluppasse solo da Windows senza Mac. Abbandonato per lo sviluppo quotidiano
dopo due problemi consecutivi non diagnosticabili da remoto (build ad-hoc
installata ma bloccata da iOS con "impossibile verificare l'integrità";
tentativo TestFlight bloccato da un record app "fantasma" su App Store
Connect) e dopo che l'utente ha esaurito la quota gratuita EAS condivisa tra i
suoi vari progetti. Resta configurato (`eas.json`, progetto
`@gdixie70/discovery-pompeii`) per un uso futuro mirato: distribuzione
TestFlight/Play Store quando l'app sarà più matura, non per l'iterazione
giornaliera.

## Allineamento

Il GPS da solo (errore tipico 3-8m in esterno) non è sufficiente per ancorare
un modello in modo credibile. L'MVP usa allineamento manuale guidato: sagoma di
riferimento sovrapposta, l'utente allinea la vista e conferma, l'app crea
l'anchor. Evoluzioni future: image recognition, VPS, feature matching, LiDAR.

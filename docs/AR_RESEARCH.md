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

**Direzione consigliata**: Expo Development Build + modulo nativo sottile
(Expo Modules API) che espone pose camera / plane detection / anchor, con
rendering del modello lato JS via `expo-gl`/three.js. In alternativa, prototipare
più rapidamente con ViroReact in Milestone 10 e decidere se sostituirlo con un
modulo custom solo se emergono limiti concreti sul campo. Unity non è scelto di
default: runtime pesante, bridge fragile da mantenere, sproporzionato per un
MVP con un solo edificio.

## Allineamento

Il GPS da solo (errore tipico 3-8m in esterno) non è sufficiente per ancorare
un modello in modo credibile. L'MVP usa allineamento manuale guidato: sagoma di
riferimento sovrapposta, l'utente allinea la vista e conferma, l'app crea
l'anchor. Evoluzioni future: image recognition, VPS, feature matching, LiDAR.

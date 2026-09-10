# Roadmap MVP

Un edificio, un Discovery Point, un modello 3D, un'esperienza AR funzionante.
Ogni milestone: obiettivo chiaro → modifica minima → test → verifica → commit → push.

- [x] **Milestone 0** — Repository GitHub, project bootstrap (Expo, TypeScript,
      navigation, struttura cartelle, documentazione)
- [x] **Milestone 1** — Home screen
- [x] **Milestone 2** — Data model Discovery Point
- [x] **Milestone 3** — Mappa + marker
- [ ] **Milestone 4** — GPS utente
- [ ] **Milestone 5** — Distanza dal Discovery Point
- [ ] **Milestone 6** — Bussola / heading
- [ ] **Milestone 7** — Navigazione semplice (distanza, direzione, freccia)
- [ ] **Milestone 8** — Download/cache modello 3D (placeholder ottimizzato,
      GLB/Draco) — spostata prima della valutazione AR per avere un modello
      reale su cui testare il prototipo
- [ ] **Milestone 9** — Valutazione AR definitiva → branch `feature/ar-prototype`
- [ ] **Milestone 10** — AR prototype
- [ ] **Milestone 11** — Manual alignment (Developer Mode di calibrazione)
- [ ] **Milestone 12** — Anchor persistente durante il movimento
- [ ] **Milestone 13** — Primo modello Blender reale
- [ ] **Milestone 14** — Test sul campo a Pompei

Le milestone 9+ vivono su branch dedicati (`feature/ar-prototype`,
`feature/manual-alignment`) finché non superano un test minimo, poi merge in
`develop`.

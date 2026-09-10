# Discovery Pompeii

App mobile per i visitatori del sito archeologico di Pompei. L'utente raggiunge un
**Discovery Point** fisico, avvia la modalità Discovery e vede, tramite la fotocamera
dello smartphone, la ricostruzione 3D dell'edificio antico sovrapposta alla realtà —
completando digitalmente ciò che il tempo ha cancellato, senza sostituire la rovina
reale quando questa è ancora visibile.

> Arriva al punto. Alza il telefono. Guarda Pompei ricostruirsi.

## Stato del progetto

In fase di bootstrap (Milestone 0). Vedi [docs/ROADMAP.md](docs/ROADMAP.md) per lo
stato avanzamento e [docs/DECISIONS.md](docs/DECISIONS.md) per le decisioni
architetturali prese finora.

## Stack

- React Native + Expo (Expo Go per lo sviluppo iniziale, Expo Development Build
  quando serve il modulo AR nativo — vedi [docs/AR_RESEARCH.md](docs/AR_RESEARCH.md))
- TypeScript
- Expo Router

## Documentazione

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — architettura del sistema
- [docs/ROADMAP.md](docs/ROADMAP.md) — roadmap incrementale e milestone
- [docs/DECISIONS.md](docs/DECISIONS.md) — decision log
- [docs/DISCOVERY_POINT_SPEC.md](docs/DISCOVERY_POINT_SPEC.md) — data model
- [docs/AR_RESEARCH.md](docs/AR_RESEARCH.md) — confronto tecnologie AR

## Workflow Git

`main` (stabile) ← `develop` (integrazione) ← `feature/*` (branch dedicati per
funzionalità sperimentali, in particolare tutto ciò che riguarda l'AR).

Commit secondo [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).

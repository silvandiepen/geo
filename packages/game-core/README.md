# @geo/game-core

Shared game engine contracts and session management for the Geo platform.

## Exports

### Types (re-exported from @geo/types)
- `GameDefinition<TRound, TAnswer, TResult>` – game contract interface
- `Round`, `Answer`, `Result`, `Score` – core game data structures

### Session Management
- `createSessionState()` – initialize a fresh game session
- `startRound(state, game, config)` – generate and start a new round
- `submitAnswer(state, game, answer)` – evaluate answer and update score

### Utilities
- `findShortestPath(start, end, getNeighbors)` – BFS path finder for border games

## Usage

Each game app implements `GameDefinition` and uses the session helpers to manage game state in a Pinia store.

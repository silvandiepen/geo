# @geo/types

Shared TypeScript type definitions for the Geo platform.

## Types

### Country Types
- `Country` – full country data model
- `Capital` – capital city data
- `Continent` – continent union type
- `Direction` – compass direction union
- `GeoDistance` – distance/direction between countries

### Game Types
- `GameDefinition<TRound, TAnswer, TResult>` – generic game contract
- `Round` – a single game question
- `Answer` – player input
- `Result` – evaluated answer
- `Score` – accumulated session score
- `GameCategory` – geography | flags | capitals | borders | hints
- `InputMode` – multiple-choice | typing | selection | path

## Helpers
- `createInitialScore()` – factory for a fresh Score
- `updateScore(score, result)` – immutable score updater

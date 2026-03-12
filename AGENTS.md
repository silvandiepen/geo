# Agents.md

This repository contains a **geography games platform** implemented as a **monorepo**.

Each game is its **own independent application**, while a **platform wrapper app** provides navigation between them.

The platform is built around **country, flag, geography, and distance data** using the `sil-data` dataset.

https://github.com/silvandiepen/sil-data

The architecture prioritizes:
- strong TypeScript typing
- modular game applications
- reusable shared packages
- maintainability
- scalability for future games

This document defines the standards GitHub Agents must follow when working in this repository.

---

# Core Architecture

This repository is a **monorepo**.

Each game is implemented as a **standalone app**, but all apps share common libraries.

Games must be able to run independently.

A wrapper app links to all games and acts as the central entry point.

---

# Monorepo Structure

Example structure:
/apps
/platform -> wrapper app listing all games
/walk-it
/guess-the-flag
/guess-by-hints
/border-blitz
/capital-match

/packages
/game-core -> shared game engine contracts
/geo-data -> wrapper around sil-data
/ui -> shared UI components
/game-ui -> shared game widgets
/utils -> common utilities
/types -> shared types

/tools
scripts and helpers

/docs
documentation


Apps should only depend on packages, not on each other.

---

# Technology Stack

All apps use the same stack.

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- SCSS

Rules:

- No `any` types
- Explicit models for game data
- Strict typing across packages
- Shared logic belongs in `/packages`

---

# Data Source

All geography data must come from:

https://github.com/silvandiepen/sil-data

Apps must **not import sil-data directly**.

Instead use the internal adapter package:

packages/geo-data


This wrapper exposes normalized helpers such as:

- getAllCountries()
- getCountryByCode()
- getCountryByName()
- searchCountries()
- getNeighbors()
- getCapital()
- getFlag()
- getSimilarFlags()
- getDistanceBetweenCountries()
- getDirectionBetweenCountries()
- getCountriesByContinent()

The adapter ensures the rest of the platform is not tightly coupled to raw dataset structures.

---

# Game Architecture

Every game follows the same contract.

Games must implement a **Game Definition**.

Example structure:

```GameDefinition {
id
name
description
category
inputMode
configOptions
generateRound()
validateAnswer()
scoreRound()
formatResult()
}
```

These types live in:
packages/game-core


---

# Shared Game Concepts

All games share common structures.

## Round

Represents a single question or task.

```
Round {
id
question
metadata
}
```



## Answer

Represents a player input.

```
Answer {
value
timestamp
}
```


## Result

Represents evaluation of an answer.

```
Result {
correct
score
details
}
```

---

# Game Apps

Each game is its own application.

Example:


apps/walk-it


Structure:


src/
components/
composables/
models/
utils/
views/
router/
store/


Games must not depend on each other.

---

# Platform App

The platform wrapper:


apps/platform


Responsibilities:

- show all available games
- provide navigation
- optionally host shared leaderboard later
- optionally host daily challenges later

It does **not contain game logic**.

---

# Shared Packages

## game-core

Contains:

- GameDefinition
- round types
- scoring models
- shared helpers

## geo-data

Wrapper around sil-data.

Normalizes country data.

## ui

Reusable UI components.

Examples:

- buttons
- cards
- layout
- modals
- inputs

## game-ui

Game-specific reusable components.

Examples:

- multiple choice
- typing input
- timer
- score display
- result panels

---

# State Management

Pinia is used for state.

Rules:

- keep stores small
- session logic should live in composables
- avoid giant stores
- prefer feature-local stores if needed

---

# Routing

Each app has its own router.

Routes should be simple.

Example:


/play
/results
/settings


---

# Styling

SCSS must be used.

Rules:

- avoid inline styles
- keep styles component scoped
- reusable variables should live in shared packages
- maintain consistent layout spacing

---

# Coding Guidelines

Agents must follow these rules:

- write clear, maintainable code
- keep functions small
- prefer composables for reusable logic
- UI components must stay presentation-focused
- game logic must not live inside UI components
- models and types must be explicit

---

# Testing

Where appropriate:

- add tests for logic utilities
- test scoring
- test round generation

Testing frameworks can be chosen by the agent.

---

# Documentation

Every game must include:


README.md


Document:

- game rules
- configuration options
- scoring logic
- extension ideas

Shared packages must also have documentation.

---

# Future Extensibility

The platform must allow future additions such as:

- daily challenge system
- leaderboard
- additional games
- multiplayer modes
- map-based interactions

Architecture decisions should not block these.

---

# Priority

Agents must prioritize:

1. architecture clarity
2. maintainability
3. extensibility
4. developer experience

Avoid premature complexity.

Prefer simple systems that can evolve naturally.





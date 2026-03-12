# Walk It

Navigate from one country to another by crossing borders.

## How to Play

1. You're given a start country and a target country
2. Select neighboring countries to advance your path
3. Reach the destination in as few steps as possible
4. The optimal path yields the maximum score

## Scoring

- Base score: 100 points
- Each extra step beyond optimal: -10 points
- Minimum score: 0

## Configuration

No extra configuration required. Countries and paths are generated automatically from the `@geo/geo-data` adapter.

## Development

```bash
pnpm dev  # Runs on http://localhost:5174
```

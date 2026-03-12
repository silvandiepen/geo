# @geo/utils

Common utility functions for the Geo platform.

## Modules

### array
- `pickRandom(arr)` – pick one random element
- `pickRandomN(arr, n)` – pick n unique random elements
- `shuffle(arr)` – Fisher-Yates shuffle
- `unique(arr)` – deduplicate

### string
- `normalizeString(str)` – lowercase + trim + NFD normalize
- `stringsMatch(a, b)` – normalized equality check
- `generateId()` – unique ID generator

### math
- `clamp(value, min, max)`
- `lerp(a, b, t)` – linear interpolation
- `haversineDistance(lat1, lng1, lat2, lng2)` – distance in km
- `bearing(lat1, lng1, lat2, lng2)` – compass bearing in degrees

### scoring
- `timeBonus(timeMs, maxTimeMs, maxBonus)` – time-based bonus
- `pathScore(actual, optimal, base)` – path efficiency score

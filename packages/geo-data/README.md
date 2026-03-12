# @geo/geo-data

Data adapter wrapping `@sil/data` for the Geo platform.

All apps must use this package instead of importing `@sil/data` directly.

## API

```typescript
getAllCountries(): Promise<Country[]>
getCountryByCode(code: string): Promise<Country | undefined>
getCountryByName(name: string): Promise<Country | undefined>
searchCountries(query: string): Promise<Country[]>
getNeighbors(code: string): Promise<Country[]>
getCapital(code: string): Promise<string | undefined>
getFlag(code: string): Promise<string | undefined>
getSimilarFlags(code: string, count?: number): Promise<Country[]>
getDistanceBetweenCountries(from: string, to: string): Promise<GeoDistance | undefined>
getDirectionBetweenCountries(from: string, to: string): Promise<Direction | undefined>
getCountriesByContinent(continent: Continent): Promise<Country[]>
```

## Data Source

Uses `@sil/data` (https://github.com/silvandiepen/sil-data) as the underlying country dataset.

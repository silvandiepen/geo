import type { Country, Direction, GeoDistance, Continent } from '@geo/types';
import { haversineDistance, bearing } from '@geo/utils';

/**
 * Raw data shape from @sil/data – we use a flexible type here since the
 * external package may not export strict types.
 */
interface RawCountry {
  cca2?: string;
  cca3?: string;
  name?: { common?: string; official?: string };
  capital?: string[];
  region?: string;
  subregion?: string;
  continents?: string[];
  borders?: string[];
  latlng?: [number, number];
  population?: number;
  area?: number;
  currencies?: Record<string, { name?: string; symbol?: string }>;
  languages?: Record<string, string>;
  flags?: { png?: string; svg?: string; emoji?: string };
  flag?: string;
}

let _cache: Country[] | null = null;

function mapContinent(raw: RawCountry): string {
  const continents = raw.continents ?? [];
  if (continents.length > 0) return continents[0];
  return raw.region ?? 'Unknown';
}

function mapCurrency(raw: RawCountry): string {
  const currencies = raw.currencies ?? {};
  const keys = Object.keys(currencies);
  if (keys.length === 0) return '';
  return keys[0];
}

function mapLanguages(raw: RawCountry): string[] {
  const languages = raw.languages ?? {};
  return Object.values(languages);
}

function mapFlag(raw: RawCountry): string {
  return raw.flags?.svg ?? raw.flags?.png ?? raw.flags?.emoji ?? raw.flag ?? '';
}

export function mapRawCountry(raw: RawCountry): Country {
  return {
    code: raw.cca2 ?? raw.cca3 ?? '',
    name: raw.name?.common ?? raw.name?.official ?? '',
    continent: mapContinent(raw),
    capital: raw.capital?.[0] ?? '',
    flag: mapFlag(raw),
    borders: raw.borders ?? [],
    lat: raw.latlng?.[0] ?? 0,
    lng: raw.latlng?.[1] ?? 0,
    population: raw.population ?? 0,
    area: raw.area ?? 0,
    currency: mapCurrency(raw),
    languages: mapLanguages(raw),
    region: raw.region ?? '',
    subregion: raw.subregion ?? '',
  };
}

async function loadCountries(): Promise<Country[]> {
  if (_cache) return _cache;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod = await import('@sil/data' as any);
    const raw: RawCountry[] = mod.countries ?? mod.default?.countries ?? [];
    _cache = raw.map(mapRawCountry);
  } catch {
    _cache = [];
  }
  return _cache;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getAllCountries(): Promise<Country[]> {
  return loadCountries();
}

export async function getCountryByCode(code: string): Promise<Country | undefined> {
  const countries = await loadCountries();
  const upper = code.toUpperCase();
  return countries.find(c => c.code.toUpperCase() === upper);
}

export async function getCountryByName(name: string): Promise<Country | undefined> {
  const countries = await loadCountries();
  const lower = name.toLowerCase();
  return countries.find(c => c.name.toLowerCase() === lower);
}

export async function searchCountries(query: string): Promise<Country[]> {
  const countries = await loadCountries();
  const lower = query.toLowerCase();
  return countries.filter(
    c =>
      c.name.toLowerCase().includes(lower) ||
      c.code.toLowerCase().includes(lower) ||
      c.capital.toLowerCase().includes(lower)
  );
}

export async function getNeighbors(code: string): Promise<Country[]> {
  const countries = await loadCountries();
  const country = countries.find(c => c.code === code.toUpperCase());
  if (!country) return [];
  return countries.filter(c => country.borders.includes(c.code));
}

export async function getCapital(code: string): Promise<string | undefined> {
  const country = await getCountryByCode(code);
  return country?.capital;
}

export async function getFlag(code: string): Promise<string | undefined> {
  const country = await getCountryByCode(code);
  return country?.flag;
}

export async function getSimilarFlags(
  code: string,
  count: number = 3
): Promise<Country[]> {
  const countries = await loadCountries();
  const target = countries.find(c => c.code === code.toUpperCase());
  if (!target) return [];

  // Heuristic: countries from same region/continent have visually similar flags
  const sameContinent = countries.filter(
    c => c.code !== target.code && c.continent === target.continent
  );

  const shuffled = [...sameContinent].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function getDistanceBetweenCountries(
  fromCode: string,
  toCode: string
): Promise<GeoDistance | undefined> {
  const from = await getCountryByCode(fromCode);
  const to = await getCountryByCode(toCode);
  if (!from || !to) return undefined;

  const distanceKm = haversineDistance(from.lat, from.lng, to.lat, to.lng);
  const deg = bearing(from.lat, from.lng, to.lat, to.lng);
  const direction = bearingToDirection(deg);

  return { from: fromCode, to: toCode, distanceKm: Math.round(distanceKm), direction };
}

export async function getDirectionBetweenCountries(
  fromCode: string,
  toCode: string
): Promise<Direction | undefined> {
  const dist = await getDistanceBetweenCountries(fromCode, toCode);
  return dist?.direction;
}

export async function getCountriesByContinent(
  continent: Continent
): Promise<Country[]> {
  const countries = await loadCountries();
  return countries.filter(c => c.continent === continent);
}

function bearingToDirection(deg: number): Direction {
  const dirs: Direction[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

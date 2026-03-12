import type { Country, Direction, GeoDistance, Continent } from '@geo/types';
import { haversineDistance, bearing } from '@geo/utils';

/**
 * Raw data shape from world-countries package.
 * Matches the REST Countries v3 API format.
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
  flag?: string; // emoji flag
}

let _cache: Country[] | null = null;
/** Map from cca3 -> cca2 for resolving border codes */
let _cca3ToCca2: Map<string, string> | null = null;

function mapCurrency(raw: RawCountry): string {
  const currencies = raw.currencies ?? {};
  const keys = Object.keys(currencies);
  return keys.length > 0 ? keys[0] : '';
}

function mapLanguages(raw: RawCountry): string[] {
  return Object.values(raw.languages ?? {});
}

function mapFlag(raw: RawCountry): string {
  // Prefer svg/png if available; fall back to emoji
  if (raw.flags?.svg) return raw.flags.svg;
  if (raw.flags?.png) return raw.flags.png;
  if (raw.flags?.emoji) return raw.flags.emoji;
  if (raw.flag) return raw.flag;
  // Generate a flag URL from flagcdn using cca2
  if (raw.cca2) return `https://flagcdn.com/${raw.cca2.toLowerCase()}.svg`;
  return '';
}

function mapContinent(raw: RawCountry): string {
  if (raw.continents && raw.continents.length > 0) return raw.continents[0];
  return raw.region ?? 'Unknown';
}

export function mapRawCountry(raw: RawCountry): Country {
  return {
    code: raw.cca2 ?? raw.cca3 ?? '',
    name: raw.name?.common ?? raw.name?.official ?? '',
    continent: mapContinent(raw),
    capital: raw.capital?.[0] ?? '',
    flag: mapFlag(raw),
    borders: raw.borders ?? [], // cca3 codes — normalised after full load
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

  let raw: RawCountry[] = [];

  try {
    // world-countries exports the array as the default export
    const mod = await import('world-countries');
    const data = mod.default ?? (mod as unknown as RawCountry[]);
    raw = Array.isArray(data) ? data : [];
  } catch {
    raw = [];
  }

  // First pass: map all countries (borders still contain cca3 codes)
  const mapped = raw.map(mapRawCountry);

  // Build cca3 -> cca2 lookup from the raw data
  _cca3ToCca2 = new Map<string, string>();
  raw.forEach(r => {
    if (r.cca3 && r.cca2) _cca3ToCca2!.set(r.cca3, r.cca2);
  });

  // Second pass: normalize border codes from cca3 to cca2
  mapped.forEach(country => {
    country.borders = country.borders
      .map(b => _cca3ToCca2!.get(b) ?? b)
      .filter(b => b.length === 2); // keep only resolved cca2 codes
  });

  _cache = mapped;
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
  const upper = code.toUpperCase();
  const country = countries.find(c => c.code === upper);
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
  count = 3
): Promise<Country[]> {
  const countries = await loadCountries();
  const target = countries.find(c => c.code === code.toUpperCase());
  if (!target) return [];

  // Same continent gives visually similar flags as distractors
  const sameContinent = countries.filter(
    c => c.code !== target.code && c.continent === target.continent
  );

  return [...sameContinent].sort(() => Math.random() - 0.5).slice(0, count);
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

  return {
    from: fromCode,
    to: toCode,
    distanceKm: Math.round(distanceKm),
    direction: bearingToDirection(deg),
  };
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

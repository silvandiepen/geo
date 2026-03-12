export interface Country {
  code: string;
  name: string;
  continent: string;
  capital: string;
  flag: string;
  borders: string[];
  lat: number;
  lng: number;
  population: number;
  area: number;
  currency: string;
  languages: string[];
  region: string;
  subregion: string;
}

export interface Capital {
  name: string;
  countryCode: string;
}

export type Continent =
  | 'Africa'
  | 'Antarctica'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America';

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface GeoDistance {
  from: string;
  to: string;
  distanceKm: number;
  direction: Direction;
}

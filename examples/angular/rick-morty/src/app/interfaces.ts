export interface Location {
  name: string;
  url: string;
}

export interface CharacterFeature {
  name: string;
  value: string;
}

export interface Episode {
  id: number;
  episode: string;
  name: string;
  air_date: string;
  characters: Array<string>;
}

export interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  origin: Location;
  location: Location;
  episode: Array<string>;
  features: Array<CharacterFeature>;
}
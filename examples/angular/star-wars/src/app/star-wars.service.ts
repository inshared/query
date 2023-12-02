import { Injectable, type Signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

const parseIdFromUrl = (url: string) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

type Film = {
  episode_id: number;
  title: string;
  release_date: string;
  url: string;
  film_id: number;
  opening_crawl: string;
  characters: Array<string>;
}

type Character = {
  name: string;
  url: string;
  character_id: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: number;
  mass: number;
  homeworld: string;
  features: Array<{ name: string, value: string }>
  films: Array<string>;
}

type Homeworld = {
  name: string;
}

type Response<T> = {
  results: Array<T>;
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  getFilms() {
    return injectQuery(() => ({
      queryKey: ['films'],
      select: ({ results }: Response<Film>) => results.map(film => ({
        ...film,
        film_id: parseIdFromUrl(film.url)
      }))
    }));
  }

  getFilmById(filmId: Signal<string | null>) {
    return injectQuery(() => ({
      queryKey: ['films', filmId()],
      enabled: !!filmId(),
      select: (film: Film) => ({
        ...film,
        film_id: parseIdFromUrl(film.url),
        characters: film.characters.map((characterUrl) => parseIdFromUrl(characterUrl))
      })
    }));
  }

  getCharacters() {
    return injectQuery(() => ({
      queryKey: ['people'],
      select: ({ results }: Response<Character>) => results.map(character => ({
        ...character,
        character_id: parseIdFromUrl(character.url)
      })),
    }));
  }

  getCharacterById(characterId: Signal<string | null>) {
    return injectQuery(() => ({
      queryKey: ['people', characterId()],
      enabled: characterId() !== null,
      select: (character: Character) => ({
        ...character,
        features: [
          { name: 'Born', value: character.birth_year },
          { name: 'Eyes', value: character.eye_color },
          { name: 'Hair', value: character.hair_color },
          { name: 'Height', value: character.height },
          { name: 'Mass', value: character.mass },
          { name: 'Homeworld', value: parseIdFromUrl(character.homeworld) },
        ],
        films: character.films.map((filmUrl) => parseIdFromUrl(filmUrl))
      })
    }));
  }

  getHomeworldById(homeworldId: Signal<string | null>) {
    return injectQuery(() => ({
      queryKey: ['planets', homeworldId()],
      enabled: !!homeworldId(),
      select: (homeworld: Homeworld) => homeworld,
    }));
  }

}
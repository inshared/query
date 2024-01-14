import { Injectable, type Signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { queryOptions } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { type Character, type Episode } from './interfaces';
import { parseIdFromUrl } from './utils';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  #httpClient = inject(HttpClient);

  getEpisodes() {
    return queryOptions({
      queryKey: ['episodes'],
      queryFn: () => lastValueFrom(
        this.#httpClient.get<{ results: Array<Episode> }>('https://rickandmortyapi.com/api/episode')
      ),
      select: (data) => data.results
    });
  }

  getEpisodeById(id: Signal<string | null>) {
    return queryOptions({
      queryKey: ['episode', id()],
      enabled: id() !== null,
      queryFn: () => lastValueFrom(
        this.#httpClient.get<Episode>(`https://rickandmortyapi.com/api/episode/${id()}`)
      ),
      select: (episode: Episode) => ({
        ...episode,
        characters: episode.characters.map((url) => parseIdFromUrl(url))
      })
    });
  }

  getCharacters() {
    return queryOptions({
      queryKey: ['characters'],
      queryFn: () => lastValueFrom(
        this.#httpClient.get<{ results: Array<Character> }>(`https://rickandmortyapi.com/api/character`)
      ),
      select: (data) => data.results
    });
  }

  getCharacterById(id: Signal<string | null>) {
    return queryOptions({
      queryKey: ['character', id()],
      enabled: id() !== null,
      queryFn: () => lastValueFrom(
        this.#httpClient.get<Character>(`https://rickandmortyapi.com/api/character/${id()}`)
      ),
      select: (character: Character) => ({
        ...character,
        features: [
          { name: 'Gender', value: character.gender },
          { name: 'Status', value: character.status },
          { name: 'Species', value: character.species },
          { name: 'Origin', value: character.origin.name },
          { name: 'Location', value: character.location.name },
        ],
        episode: character.episode.map((url) => parseIdFromUrl(url))
      })
    });
  }
}
import type { Route } from "@angular/router";

export const appRoutes: Array<Route> = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => (await import('./home/home.component')).HomeComponent,
  },
  {
    path: 'episodes',
    loadComponent: async () => (await import('./episodes/episodes.component')).EpisodesComponent,
  },
  {
    path: 'episodes/:id',
    loadComponent: async () => (await import('./episodes/episode.component')).EpisodeComponent,
  },
  {
    path: 'characters',
    loadComponent: async () => (await import('./characters/characters.component')).CharactersComponent,
  },
  {
    path: 'characters/:id',
    loadComponent: async () => (await import('./characters/character.component')).CharacterComponent,
  }
];
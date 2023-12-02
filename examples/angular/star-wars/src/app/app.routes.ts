import type { Route } from "@angular/router";

export const appRoutes: Array<Route> = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home.component').then(c => c.HomeComponent),
    },
    {
        path: 'films',
        pathMatch: 'full',
        loadComponent: () => import('./films.component').then(c => c.FilmsComponent),
    },
    {
        path: 'films/:filmId',
        pathMatch: 'full',
        loadComponent: () => import('./film.component').then(c => c.FilmComponent),
    },
    {
        path: 'characters',
        pathMatch: 'full',
        loadComponent: () => import('./characters.component').then(c => c.CharactersComponent),
    },
    {
        path: 'characters/:characterId',
        pathMatch: 'full',
        loadComponent: () => import('./character.component').then(c => c.CharacterComponent),
    },
];
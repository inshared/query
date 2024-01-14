import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { RickMortyService } from '../rick-morty.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-episodes',
  standalone: true,
  template: `
      @if (query.isPending()) {
        <p>Loading...</p>
      } @else {
        <h1 class="mat-headline-2">Episodes</h1>
        <mat-nav-list>
        @for (episode of query.data(); track episode.id) {
          <a mat-list-item [routerLink]="['/episodes', episode.id]">
            {{ episode.episode }} - {{ episode.name }} <em>{{ episode.air_date }}</em>
          </a>
        }
        </mat-nav-list>
      }
  `,
  imports: [MatListModule, RouterLink, DatePipe]
})

export class EpisodesComponent {
  #service = inject(RickMortyService);
  
  query = injectQuery(() => this.#service.getEpisodes())
}
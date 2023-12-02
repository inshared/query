import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { StarWarsService } from './star-wars.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-films',
  standalone: true,
  template: `
      @if (query().isPending) {
        <p>Loading...</p>
      } @else {
        <h1 class="mat-headline-2">Films</h1>
        <mat-nav-list>
        @for (film of query().data; track film.film_id) {
            <a mat-list-item [routerLink]="['/films', film.film_id]">
              {{ film.episode_id }}. {{ film.title }}
              <em>({{ film.release_date | date:'YYYY' }})</em>
            </a>
        }
        </mat-nav-list>
      }
  `,
  imports: [MatListModule, RouterLink, DatePipe]
})

export class FilmsComponent {
  #service = inject(StarWarsService);
  query = this.#service.getFilms();
}
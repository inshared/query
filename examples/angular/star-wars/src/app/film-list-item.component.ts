import { ChangeDetectionStrategy, Component, Input, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { StarWarsService } from "./star-wars.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-film-list-item',
  template: `
    @if (query().isSuccess) {
      <a mat-list-item [routerLink]="['/films', filmIdSignal()]">
        {{ query().data?.episode_id }}. {{ query().data?.title }}
      </a>
    }
  `,
  standalone: true,
  imports: [RouterLink, MatListModule]
})
export class FilmListItemComponent {
  #service = inject(StarWarsService);
  
  filmIdSignal = signal<string | null>(null);
  query = this.#service.getFilmById(this.filmIdSignal);

  @Input({ required: true }) set filmId(value: string) {
    this.filmIdSignal.set(value);
  }
}
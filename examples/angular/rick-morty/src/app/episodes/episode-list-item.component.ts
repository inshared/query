import { ChangeDetectionStrategy, Component, Input, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { RickMortyService } from "../rick-morty.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-episode-list-item',
  template: `
    @if (query.isSuccess()) {
      <a mat-list-item [routerLink]="['/episodes', idSignal()]">
        {{ query.data().id }}. {{ query.data().name }}
      </a>
    }
  `,
  standalone: true,
  imports: [RouterLink, MatListModule]
})
export class EpisodeListItemComponent {
  #service = inject(RickMortyService);

  idSignal = signal<string | null>(null);
  query = injectQuery(() => this.#service.getEpisodeById(this.idSignal));

  @Input({ required: true }) set id(value: string) {
    this.idSignal.set(value);
  }
}
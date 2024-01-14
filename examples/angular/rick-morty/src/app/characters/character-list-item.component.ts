import { ChangeDetectionStrategy, Component, Input, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { RickMortyService } from "../rick-morty.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-character-list-item',
  template: `
    @if (query.isSuccess()) {
      <a mat-list-item [routerLink]="['/characters', idSignal()]">
        {{ query.data().name }}
      </a>
    }
  `,
  standalone: true,
  imports: [RouterLink, MatListModule]
})
export class CharacterListItemComponent {
  #service = inject(RickMortyService);

  idSignal = signal<string | null>(null);
  query = injectQuery(() => this.#service.getCharacterById(this.idSignal));

  @Input({ required: true }) set id(value: string) {
    this.idSignal.set(value);
  }
}
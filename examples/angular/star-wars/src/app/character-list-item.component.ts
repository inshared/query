import { ChangeDetectionStrategy, Component, Input, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { StarWarsService } from "./star-wars.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-character-list-item',
  template: `
    @if (query().isSuccess) {
      <a mat-list-item [routerLink]="['/characters', characterIdSignal()]">
        {{ query().data?.name }}
      </a>
    }
  `,
  standalone: true,
  imports: [RouterLink, MatListModule]
})
export class CharacterListItemComponent {
  #service = inject(StarWarsService);

  characterIdSignal = signal<string | null>(null);
  query = this.#service.getCharacterById(this.characterIdSignal);

  @Input({ required: true }) set characterId(value: string) {
    this.characterIdSignal.set(value);
  }
}
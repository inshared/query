import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { RickMortyService } from '../rick-morty.service';
import { CharacterListItemComponent } from '../characters/character-list-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-episode',
  template: `
    @if (query.isPending()) {
      <p>Loading...</p>
    } @else {
      <h1 class="mat-headline-2">{{ query.data()!.name }}</h1>
      <p>
        {{ query.data()!.air_date }}
      </p>
      
      <h2 class="mat-headline-3">Characters</h2>
      <mat-nav-list>
        @for (characterId of query.data()!.characters; track characterId) {
          <app-character-list-item [id]="characterId" />
        }
      </mat-nav-list>
    }
  `,
  standalone: true,
  imports: [MatListModule, CharacterListItemComponent],
})
export class EpisodeComponent {
  #service = inject(RickMortyService);
  #id = signal(inject(ActivatedRoute).snapshot.paramMap.get('id'));

  query = injectQuery(() => this.#service.getEpisodeById(this.#id));
}
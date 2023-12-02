import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { StarWarsService } from './star-wars.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-characters',
    template: `
        @if (query().isPending) {
            <p>Loading...</p>
        } @else {
            <h1 class="mat-headline-2">Characters</h1>
            <mat-nav-list>
            @for (character of query().data; track character.character_id) {
                <a mat-list-item [routerLink]="['/characters', character.character_id]">
                    {{ character.name }}
                </a>
            }
            </mat-nav-list>
        }
    `,
    standalone: true,
    imports: [MatListModule, RouterLink],
})

export class CharactersComponent {
    #service = inject(StarWarsService);
    query = this.#service.getCharacters();
}
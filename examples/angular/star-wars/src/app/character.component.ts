import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from './star-wars.service';
import { FilmListItemComponent } from './film-list-item.component';
import { HomeworldComponent } from './homeworld.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-character',
  template: `
    @if (query().isPending) {
      <p>Loading...</p>
    } @else {
      <h1 class="mat-headline-2">{{ query().data!.name }}</h1>
      <div class="table-container">
        <table mat-table [dataSource]="query().data!.features" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Feature</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>

          <ng-container matColumnDef="value">
            <th mat-header-cell *matHeaderCellDef>Value</th>
            <td mat-cell *matCellDef="let element">
              @if (element.name === 'Homeworld') {
                <app-homeworld [homeworldId]="element.value" />
              } @else {
                {{ element.value }}
              }
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>

      <h2 class="mat-headline-3">Films</h2>
      <mat-nav-list>
        @for (filmId of query().data!.films; track filmId) {
          <app-film-list-item [filmId]="filmId" />
        }
      </mat-nav-list>
    }
  `,
  standalone: true,
  imports: [MatTableModule, MatListModule, FilmListItemComponent, HomeworldComponent],
  styles: [`
    .table-container {
      max-width: 450px;
    }
  `]
})

export class CharacterComponent {
  #service = inject(StarWarsService);
  #activatedRoute = inject(ActivatedRoute);
  #characterIdSignal = signal(this.#activatedRoute.snapshot.paramMap.get('characterId'));

  query = this.#service.getCharacterById(this.#characterIdSignal);

  dataSource = [];
  displayedColumns = ['name', 'value'];
}
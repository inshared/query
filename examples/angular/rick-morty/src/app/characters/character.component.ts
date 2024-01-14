import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { RickMortyService } from '../rick-morty.service';
import { EpisodeListItemComponent } from '../episodes/episode-list-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-character',
  template: `
    @if (query.isPending()) {
      <p>Loading...</p>
    } @else {
      <h1 class="mat-headline-2">{{ query.data()!.name }}</h1>
      <div class="table-container">
        <table mat-table [dataSource]="query.data()!.features" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Feature</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="value">
            <th mat-header-cell *matHeaderCellDef>Value</th>
            <td mat-cell *matCellDef="let element">
              {{ element.value }}
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
      <h2 class="mat-headline-3">Episodes</h2>
      <mat-nav-list>
        @for (episodeId of query.data()!.episode; track episodeId) {
          <app-episode-list-item [id]="episodeId" />
        }
      </mat-nav-list>
    }
  `,
  standalone: true,
  imports: [MatTableModule, MatListModule, EpisodeListItemComponent],
  styles: [`
    .table-container {
      max-width: 450px;
    }
  `]
})

export class CharacterComponent {
  #service = inject(RickMortyService);
  #activatedRoute = inject(ActivatedRoute);
  #characterIdSignal = signal(this.#activatedRoute.snapshot.paramMap.get('id'));

  query = injectQuery(() => this.#service.getCharacterById(this.#characterIdSignal));

  dataSource = [];
  displayedColumns = ['name', 'value'];
}
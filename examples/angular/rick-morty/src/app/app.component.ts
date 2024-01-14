import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental'
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rick-morty-example',
  standalone: true,
  template: `
    <mat-toolbar>
      <a mat-button color="primary" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a mat-button color="primary" routerLink="/episodes" routerLinkActive="active">Episodes</a>
      <a mat-button color="primary" routerLink="/characters" routerLinkActive="active">Characters</a>
    </mat-toolbar>
    <main class="rick-morty">
      <router-outlet />
    </main>
    <angular-query-devtools initialIsOpen />
  `,
  styles: [`
    .active { background: rgba(0,0,0,.2); }
    .rick-morty { padding: 1rem; }
  `],
  imports: [AngularQueryDevtools, RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive],
})
export class AppComponent {}
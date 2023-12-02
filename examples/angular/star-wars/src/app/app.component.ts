import { AngularQueryDevtoolsComponent } from '@tanstack/angular-query-devtools-experimental'
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'star-wars-example',
  standalone: true,
  template: `
    <mat-toolbar>
      <a mat-button color="primary" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a mat-button color="primary" routerLink="/films" routerLinkActive="active">Films</a>
      <a mat-button color="primary" routerLink="/characters" routerLinkActive="active">Characters</a>
    </mat-toolbar>
    <main class="star-wars">
      <router-outlet />
    </main>
    <angular-query-devtools initialIsOpen />
  `,
  styles: [`
    .active { background: rgba(0,0,0,.2); }
    .star-wars { padding: 1rem; }
  `],
  imports: [AngularQueryDevtoolsComponent, RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive],
})
export class AppComponent {}

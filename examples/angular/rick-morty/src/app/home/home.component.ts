import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-home',
    template: `
        <h1 class="mat-headline-2">Angular + Tanstack Query Demo</h1>
        <p>
          Using the Rick And Morty API<br>
          (Built by <a href="https://github.com/kkorte">&#64;kkorte</a>)
        </p>

        <h2 class="mat-headline-4">Tanstack Query?</h2>
        
        <p>
          ...
        </p>

        <h2 class="mat-headline-4">Ready to get started?</h2>
        <p>
          Check out the <a routerLink="/episodes">Episodes</a> and <a routerLink="/characters">Characters</a>!
        </p>
    `,
    standalone: true,
    imports: [RouterLink]
})

export class HomeComponent {}
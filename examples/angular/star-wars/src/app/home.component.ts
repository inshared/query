import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-home',
    template: `
        <h1 class="mat-headline-2">Home</h1>
    `,
    standalone: true,
})

export class HomeComponent {}
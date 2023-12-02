import { ChangeDetectionStrategy, Component, Input, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StarWarsService } from "./star-wars.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-homeworld',
  template: `
    @if (query().isSuccess) {
      {{ query().data?.name }}
    }
  `,
  standalone: true,
  imports: [RouterLink]
})
export class HomeworldComponent {
  #service = inject(StarWarsService);
  
  homeworldIdSignal = signal<string | null>(null);
  query = this.#service.getHomeworldById(this.homeworldIdSignal);

  @Input({ required: true }) set homeworldId(value: string) {
    this.homeworldIdSignal.set(value);
  }
}
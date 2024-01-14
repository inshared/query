import { provideHttpClient, withFetch } from "@angular/common/http";
import { type ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { QueryClient, provideAngularQuery } from "@tanstack/angular-query-experimental";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideAngularQuery(
      new QueryClient(),
    ),
  ],
};
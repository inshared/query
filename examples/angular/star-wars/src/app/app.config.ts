import { HttpClient, provideHttpClient, withFetch } from "@angular/common/http";
import { type ApplicationConfig, inject } from "@angular/core";
import { provideRouter } from "@angular/router";
import { lastValueFrom } from 'rxjs';
import { QueryClient, provideAngularQuery } from "@tanstack/angular-query-experimental";
import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideAngularQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            queryFn: ({ queryKey }) => lastValueFrom(
              inject(HttpClient).get(`https://swapi.dev/api/${queryKey.join('/')}/`)
            )
          },
        },
      }),
    ),
  ],
};
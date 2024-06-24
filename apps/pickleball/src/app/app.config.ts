import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { courtGroupReducer } from '@org/store';
import { EffectsModule } from '@ngrx/effects';
import { CourtYardEffects, courtYardReducer, CityReducer } from '@org/store';
import { CourtGroupEffects } from '@org/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    importProvidersFrom([
      StoreModule.forRoot({
        courtGroups: courtGroupReducer,
        courtYard: courtYardReducer,
        city: CityReducer,
      }),
      EffectsModule.forRoot([
        CourtGroupEffects,
        CourtYardEffects
      ]),
      StoreDevtoolsModule.instrument({ maxAge: 25, }),
    ])
  ],
};

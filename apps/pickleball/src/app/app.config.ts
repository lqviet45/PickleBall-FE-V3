import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { courtGroupReducer } from '@org/store';
import { EffectsModule } from '@ngrx/effects';
import { CourtGroupEffects } from '@org/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CityReducer } from '../../../../libs/store/src/lib/store/city/city.reducer';
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
        city: CityReducer,
      }),
      EffectsModule.forRoot([
        CourtGroupEffects
      ]),
      StoreDevtoolsModule.instrument({ maxAge: 25, }),
    ])
  ],
};

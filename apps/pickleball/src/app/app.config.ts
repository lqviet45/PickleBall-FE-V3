import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { courtGroupReducer } from '../../../../libs/store/src/lib/store/court-group/court-group.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourtGroupEffects } from '../../../../libs/store/src/lib/store/court-group/court-group.effects';

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
      }),
      EffectsModule.forRoot([
        CourtGroupEffects
      ])
    ])
  ],
};

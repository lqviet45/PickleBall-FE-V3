import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
  CityEffects, CityReducer,
  CourtGroupEffects, courtGroupReducer,
  UserEffects, userReducer,
  CourtYardEffects, courtYardReducer,
  BookingsEffects, bookingsReducer,
  revenuesReducer, RevenuesEffects,
  slotsReducer, SlotsEffects, authInterceptor, registerReducer, RegisterEffects, ProductEffects, productReducer
} from '@org/store';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import {HighchartsChartModule} from "highcharts-angular";


const firebaseConfig = {
  apiKey: "AIzaSyBOsfGWAtEPdrofxFEgGekQldqw7BK0OhU",
  authDomain: "pickleball-fe.firebaseapp.com",
  projectId: "pickleball-fe",
  storageBucket: "pickleball-fe.appspot.com",
  messagingSenderId: "313812647101",
  appId: "1:313812647101:web:490f9f59e506bb6d994bd4",
  measurementId: "G-GZ4XZGCLSD"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideStorage(() => getStorage()),
      StoreModule.forRoot({
        courtGroups: courtGroupReducer,
        courtYard: courtYardReducer,
        city: CityReducer,
        user: userReducer,
        users: userReducer,
        bookings: bookingsReducer,
        revenues: revenuesReducer,
        slots: slotsReducer,
        register: registerReducer,
        products: productReducer,
      }),
      EffectsModule.forRoot([
        CourtGroupEffects,
        CourtYardEffects,
        CityEffects,
        UserEffects,
        BookingsEffects,
        RevenuesEffects,
        SlotsEffects,
        RegisterEffects,
        ProductEffects
      ]),
      StoreDevtoolsModule.instrument({ maxAge: 25, }),
      HighchartsChartModule
    ])
  ],
};

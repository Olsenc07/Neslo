import 'zone.js';
import {
  bootstrapApplication,
  provideClientHydration,
  withHttpTransferCacheOptions
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, withViewTransitions } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routes/app-routing.module';
import { provideServerRendering } from '@angular/platform-server';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideServerRendering(),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    ), provideClientHydration()
  ]
})
  .then((started) => {
    console.log('Start up is working', started);
  })
  .catch((err) => {
    console.error('error has occured on start up', err);
  });

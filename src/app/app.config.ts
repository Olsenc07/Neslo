import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideServerRendering } from '@angular/platform-server';

import { routes } from './app-routes/app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideServerRendering(),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    )
  ]
};

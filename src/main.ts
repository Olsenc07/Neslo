import 'zone.js';

import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { bootstrapApplication, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app/app-routes/app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes,
    withViewTransitions(),
    withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideClientHydration(
      withHttpTransferCacheOptions({
      includePostRequests: true,
      includeRequestsWithAuthHeaders: true
      }))
    ]
}).then((started) => {
    console.log('Start up is working');
  })
  .catch((err) => {
    console.error('error has occured on start up', err);
  });
  
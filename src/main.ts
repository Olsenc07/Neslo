import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app/app-routes/app-routing.module';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideClientHydration(
      withHttpTransferCacheOptions({
      includePostRequests: true
      })),
      importProvidersFrom(
        HttpClientModule,
        BrowserAnimationsModule
      )
    ]
}).then((started) => {
    console.log('Start up is working');
  })
  .catch((err) => {
    console.error('error has occured on start up', err);
  });
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
import { environment } from 'environments/environment';

// dev only, use core for aot in production
// if (!environment.production) {
//   import('@angular/compiler').then(() => {
//     console.log('Angular JIT Compiler loaded for development.');
//   });
// }

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

//   if (environment.production) {
//     import('@angular/platform-browser').then(({ bootstrapApplication }) => {
//         bootstrapApplication(AppComponent, {
//             providers: [
//                 provideRouter(routes, withViewTransitions()),
//                 provideAnimationsAsync(),
//                 provideClientHydration(withHttpTransferCacheOptions({
//                     includePostRequests: true
//                 })),
//                 importProvidersFrom(
//                     HttpClientModule,
//                     BrowserAnimationsModule
//                 )
//             ]
//         }).then(() => {
//             console.log('Application bootstrapped in production.');
//         }).catch(err => {
//             console.error('Bootstrap error in production:', err);
//         });
//     });
// } else {
//     import('@angular/platform-browser-dynamic').then(({ platformBrowserDynamic }) => {
//         import('@angular/compiler').then(() => {
//             console.log('Angular JIT Compiler loaded for development.');
//             platformBrowserDynamic().bootstrapModule(AppComponent).then(() => {
//                 console.log('Application bootstrapped in development.');
//             }).catch(err => {
//                 console.error('Bootstrap error in development:', err);
//             });
//         });
//     });
// }
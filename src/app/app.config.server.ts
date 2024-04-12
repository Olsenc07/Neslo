import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule)
  ]
}
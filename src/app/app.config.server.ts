import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig as browserAppConfig } from './app.config';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule)
  ]
}
export const mergedConfig = mergeApplicationConfig(browserAppConfig, serverConfig);


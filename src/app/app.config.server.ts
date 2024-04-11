import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';

 export const  config: ApplicationConfig = {
  providers: [provideServerRendering(),
    provideHttpClient(withFetch())
  ]
};

export const serverConfig = mergeApplicationConfig(appConfig, config);



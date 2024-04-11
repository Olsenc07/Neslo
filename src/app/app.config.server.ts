import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from '@angular/common/http';

 export const  config: ApplicationConfig = {
  providers: [provideServerRendering()]
};

export const serverConfig = mergeApplicationConfig(appConfig, config);



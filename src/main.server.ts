import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from '../environments/environment';
import { serverConfig  } from './app/app.config.server';
import { enableProdMode } from '@angular/core';

if (environment.production) {
    enableProdMode();
  } 

const bootstrap = () => bootstrapApplication(AppComponent, serverConfig);
export default bootstrap;
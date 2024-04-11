import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { serverConfig } from './app/app.config.server';
import { ServerModule } from '@angular/platform-server';
const bootstrap = () => bootstrapApplication(AppComponent,  serverConfig);
export default bootstrap;

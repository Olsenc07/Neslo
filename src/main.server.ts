import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { mergedConfig } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, mergedConfig);
export default bootstrap;

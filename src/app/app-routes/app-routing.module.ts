import { Routes} from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then(
        (mod) => mod.HomeComponent)
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('../quote-generator/quote-generator.component').then(
        (mod) => mod.QuoteGeneratorComponent)
  }]
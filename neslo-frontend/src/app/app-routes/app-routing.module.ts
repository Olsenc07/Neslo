import { Routes} from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadComponent: () =>
      import('neslo-frontend/src/app/home/home.component').then(
        (mod) => mod.HomeComponent,
      )
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('neslo-frontend/src/app/quote-generator/quote-generator.component').then(
        (mod) => mod.QuoteGeneratorComponent,
      )
  }
]
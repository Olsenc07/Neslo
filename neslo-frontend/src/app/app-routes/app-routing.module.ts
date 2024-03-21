import { Routes} from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadComponent: () =>
      import('../home/home.component').then(
        (mod) => mod.HomeComponent,
      )
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('../quote-generator/quote-generator.component').then(
        (mod) => mod.QuoteGeneratorComponent,
      )
  }
]
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
  },
  {
    path: 'test',
    loadComponent: () =>
      import('../standard-config-size/standard-config-size.component').then(
        (mod) => mod.StandardConfigSizeComponent)
  }
]
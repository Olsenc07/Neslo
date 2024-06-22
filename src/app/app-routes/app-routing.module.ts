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
      import('../generating-popup/generating-popup.component').then(
        (mod) => mod.GeneratingPopupComponent)
  },
  { path: 'images/:folder/:index', 
    loadComponent: () =>
      import('../images/images.component').then(
        (mod) => mod.ImagesComponent)
   },
   {
    path: '**', // Wildcard route for a 404 page or redirect
    redirectTo: 'home', 
  }
]
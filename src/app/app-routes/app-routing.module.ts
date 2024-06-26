import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then(
        (c) => c.HomeComponent)
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('../quote-generator/quote-generator.component').then(
        (c) => c.QuoteGeneratorComponent)
  },
  {
    path: 'test',
    loadComponent: () =>
      import('../generating-popup/generating-popup.component').then(
        (c) => c.GeneratingPopupComponent)
  },
  { path: 'images/:folder/:index', 
    loadComponent: () =>
      import('../images/images.component').then(
        (c) => c.ImagesComponent)
   },
   { path: 'extended-showcase', 
    loadComponent: () =>
      import('../extended-showcase/extended-showcase.component').then(
        (c) => c.ExtendedShowcaseComponent)
   },
   {
    path: '**', // Wildcard route for a 404 page or redirect
    redirectTo: 'home', 
  }
]
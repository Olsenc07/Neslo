import { Routes} from '@angular/router'
import { ImagesComponent } from '../images/images.component'

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
  { path: 'images/:id/:index', component: ImagesComponent },
   {
    path: '**', // Wildcard route for a 404 page or redirect
    redirectTo: 'home', 
  }
]

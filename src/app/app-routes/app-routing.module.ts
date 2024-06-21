import { Routes} from '@angular/router'
import { OrientationService } from '../services/orientation.service'
import { PdfService } from '../services/pdf.service'
import { ImagesService } from '../services/images.service'

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
        (mod) => mod.QuoteGeneratorComponent),
        providers: [PdfService, OrientationService]
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
        (mod) => mod.ImagesComponent),
        providers: [ImagesService]
   },
   {
    path: '**', // Wildcard route for a 404 page or redirect
    redirectTo: 'home', 
  }
]
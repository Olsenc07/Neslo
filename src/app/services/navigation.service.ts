import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object) {}

  requestQuote(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/quotes']).then(() => {
        setTimeout(() => {
          const chosenElement = document.getElementById('quote');
          if (chosenElement) {
            chosenElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); 
      });
    }
  }

  requestImagesMobile(folder: string, index: number): void {
    this.router.navigate(['/images', folder, index.toString()]); 
    if (isPlatformBrowser(this.platformId)) {
    this.router.navigate(['/images', folder, index.toString()]).then(() => {
      setTimeout(() => {
        const chosenElement = document.getElementById('chosenImg');
        if (chosenElement) {
          chosenElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); 
    });
    }
  }
  
  navigateToContact(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToShowcase(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (document.getElementById('showcase')) {
        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }
}

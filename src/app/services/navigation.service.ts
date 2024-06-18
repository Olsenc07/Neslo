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
    this.router.navigate(['/quotes']);
    window.scrollTo(0, 0);
  }

  requestImagesMobile(id: { secure_url: string; public_id: string; }[], index: number): void {
    const imageId = JSON.stringify(id); 
    this.router.navigate(['/images', imageId, index.toString()]); 
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

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

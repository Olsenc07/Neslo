import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './services/title-strategy.service';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, animate, style } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatIconModule, RouterModule],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }],
  animations: [
    trigger('rotateInOut', [
      // Animation for entering the view
      transition(':enter', [   
        style({ transform: 'rotate(-90deg)' }), 
        animate('0.7s ease-out', style({ transform: 'rotate(0deg)' })) 
      ]),
      // Animation for leaving the view
      transition(':leave', [
        style({ transform: 'rotate(0deg)' }), 
        animate('0.7s ease-out', style({ transform: 'rotate(-90deg)' })) 
      ])
    ])
  ]
})
export class AppComponent {
  title: string = 'Neslo';

  showScrollButton = false;

constructor(public router: Router,
  @Inject(PLATFORM_ID) private platformId: Object
){}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
    const yOffset = window.scrollY;
    const scrollTopThreshold = 100;
    this.showScrollButton = yOffset > scrollTopThreshold;
    }
  }
  returnHome(): void {
    this.router.navigate(['/home']);
  }
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
    window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
  get isHomeRoute() {
    return this.router.url === '/' || this.router.url === '/home';
  }
}

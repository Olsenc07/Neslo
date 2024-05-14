import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './services/title-strategy.service';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, animate, style, state } from '@angular/animations';
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
      // Define states if specific styles are required for each
      state('down', style({ transform: 'rotate(0deg)' })),  // Assuming 'down' is the initial state
      state('up', style({ transform: 'rotate(180deg)' })),
  
      // Define transitions between states
      transition('down => up', [
        animate('0.7s ease-out', style({ transform: 'rotate(180deg)' }))
      ]),
      transition('up => down', [
        animate('0.7s ease-out', style({ transform: 'rotate(0deg)' }))  // Rotates back to initial position
      ])
    ])
  ]
})
export class AppComponent {
  title: string = 'Neslo';
  view: 'up' | 'down' = 'down';
  showScrollButton = false;

constructor(public router: Router,
  @Inject(PLATFORM_ID) private platformId: Object
){}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffset = window.scrollY;
    const scrollTopThreshold = 100;
    this.showScrollButton = yOffset > scrollTopThreshold;
    this.view = this.showScrollButton ? 'up' :  'down';
  }

  nav(): void {
    if (isPlatformBrowser(this.platformId)) {
    if(this.view === 'down'){
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
      this.view = 'up';
    } else if (this.view === 'up'){
      window.scrollTo({top: 0, behavior: 'smooth'});
      this.view = 'down';
    } }
  }
  back(): void{
    this.router.navigate(['/home']);
  }
  get isHomeRoute(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}

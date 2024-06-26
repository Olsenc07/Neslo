import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Scroll, TitleStrategy } from '@angular/router'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CustomTitleStrategy } from './services/title-strategy.service';
import { HideFocusService } from './services/hide-focus.service';
import { filter } from 'rxjs/operators';
import { debounceTime } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatIconModule, RouterModule, MatTooltipModule, MatButtonModule,
     MatDialogModule, NgOptimizedImage],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy },
    MatIconRegistry
  ],
  animations: [
    trigger('rotateInOut', [
      state('down', style({ transform: 'rotate(0deg)' })), 
      state('up', style({ transform: 'rotate(180deg)' })),
      transition('down => up', [
        animate('0.7s ease-out', style({ transform: 'rotate(180deg)' }))
      ]),
      transition('up => down', [
        animate('0.7s ease-out', style({ transform: 'rotate(0deg)' })) 
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title: string = 'Neslo';
  view: 'up' | 'down' = 'down';
  showScrollButton: boolean = false;
  isHomeRoute: boolean = true;
  
constructor(public router: Router,
  protected hideFocusService: HideFocusService,
  private dialog: MatDialog,
  @Inject(PLATFORM_ID) private platformId: Object
){}

ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
  this.router.events.pipe(
    filter((event: any) => event instanceof NavigationEnd || event instanceof Scroll), 
    debounceTime(400) 
  ).subscribe((event: any) => {
    if (event instanceof NavigationEnd) {
      this.isHomeRoute = (event.urlAfterRedirects === '/home' || event.urlAfterRedirects === '/');
    } else if (event instanceof Scroll) {
      this.onWindowScroll();
    }
  });
}
}


  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.dialog.openDialogs.length > 0) {
      return; // Exit if a dialog is open
    }
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
    // if on mobile images page
    if (this.router.url.startsWith('/images/')) {
      // Navigate to home and scroll to 'showcase'
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          const showcaseElement = document.getElementById('showcase');
          if (showcaseElement) {
            showcaseElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // Adjust the delay as needed for dom to render
      });
    } else {
    this.router.navigate(['/home']);
    // Scroll to top
    window.scrollTo(0, 0);
    }
  }
}

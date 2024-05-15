import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterModule, TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './services/title-strategy.service';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { HideFocusService } from './services/hide-focus.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatIconModule, RouterModule, MatTooltipModule, MatButtonModule],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }],
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
  @Inject(PLATFORM_ID) private platformId: Object
){}

ngOnInit(): void {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.updateHomeRouteStatus();
    }
  });
  this.updateHomeRouteStatus();
}

private updateHomeRouteStatus(): void {
  this.isHomeRoute = this.router.url === '/' || this.router.url === '/home';
}
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
  
}

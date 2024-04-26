import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser'
import { TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './../services/title-strategy.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate, state, stagger } from '@angular/animations';


@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [  // Use ':enter' to apply this when the element is added to the DOM
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class IntroComponent implements OnInit {
@Input() orientation: boolean = true

    constructor(
      private router: Router, 
      private el: ElementRef,
      private title:Title, @Inject(PLATFORM_ID) private platformId: Object,
      ){}
  ngOnInit(): void {
    this.title.setTitle('Neslo | Premium Windows and Doors')
  }

  // test nopt in
  requestQuote(): void {
    this.router.navigate(['/quotes']);
  }
  navigateToContact(): void {
    if (isPlatformBrowser(this.platformId)) {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToMsg(): void {
      if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}
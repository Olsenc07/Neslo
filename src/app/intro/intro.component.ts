import { Component,Input, OnInit } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser'
import { TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './../services/title-strategy.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NavigationService } from '../services/navigation.service';


@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss', './../nav-header/nav-button-styles.component.scss'],
  animations: [
    trigger('fadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50%)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInShimmer', [
      state('void', style({
        opacity: 0,
        background: 'linear-gradient(to right, #eee 10%, #ddd 20%, #eee 30%, #ddd 40%, #eee 50%, #ddd 60%, #eee 70%, #ddd 80%, #eee 90%, #ddd 100%)'
      })),
      transition(':enter', [
        animate('2s ease-in', style({
          opacity: 1,
          background: 'transparent'
        }))
      ])
    ])
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class IntroComponent implements OnInit {
@Input() orientation: boolean = true
    shimmer: boolean = false;
    constructor(
      private navigationService: NavigationService,
      private title:Title){}

  ngOnInit(): void {
    this.title.setTitle('Neslo | Premium Windows and Doors')
  }
  downDone(): void{
    this.shimmer = true;
  }

  requestQuote(): void {
    this.navigationService.requestQuote();
  }
  navigateToContact(): void {
   this.navigationService.navigateToContact();
  }

  navigateToShowcase(): void {
     this.navigationService.navigateToShowcase();
  }
}

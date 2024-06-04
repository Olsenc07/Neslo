import { Component,Input, OnInit } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser'
import { TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './../services/title-strategy.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50%)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class IntroComponent implements OnInit {
@Input() orientation: boolean = true

    constructor(
      private navigationService: NavigationService,
      private title:Title){}

  ngOnInit(): void {
    this.title.setTitle('Neslo | Premium Windows and Doors')
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

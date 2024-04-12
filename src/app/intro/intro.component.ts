import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser'
import { TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './../services/title-strategy.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class IntroComponent implements OnInit {
@Input() orientation: boolean = true
@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router,
    private title:Title
  ){}
  ngOnInit(): void {
    this.title.setTitle('Neslo | Premium Windows and Doors')
    
  }
  // test nopt in
  requestQuote(): void {
    this.router.navigate(['/quotes']);
  }
  navigateToContact(): void {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  }
  navigateToMsg(): void {
      this.valueChange.emit();
  }
}

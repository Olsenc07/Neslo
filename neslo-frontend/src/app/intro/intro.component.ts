import { Component, Input } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
@Input() orientation: boolean = true
  constructor(private router: Router){}
  requestQuote(): void {
    this.router.navigate(['/quotes']);
  }
  navigateToContact(): void {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  }
  navigateToMsg(): void {
    document.getElementById('msg')?.scrollIntoView({ behavior: 'smooth' });
  }
}

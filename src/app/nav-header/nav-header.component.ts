import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss'
})
export class NavHeaderComponent {

  constructor(private navigationService: NavigationService) 
  {}

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

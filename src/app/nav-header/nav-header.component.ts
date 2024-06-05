import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationService } from '../services/navigation.service';


@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss','./../nav-header/nav-button-styles.component.scss']
})
export class NavHeaderComponent {
  @Input() mobile!: boolean;

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

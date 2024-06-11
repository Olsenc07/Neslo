import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationService } from '../services/navigation.service';
import { ConfigExDropdownComponent } from '../config-ex-dropdown/config-ex-dropdown.component';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule,
     ConfigExDropdownComponent, MatButtonModule],
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss','./../nav-header/nav-button-styles.component.scss']
})

export class NavHeaderComponent {
  @Input() mobile!: boolean;
  dropDown: boolean = false;

  constructor(private navigationService: NavigationService) 
  {}

  toggleConfig(): void {
    this.dropDown = !this.dropDown;
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
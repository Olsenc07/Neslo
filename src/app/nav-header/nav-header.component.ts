import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NavigationService } from '../services/navigation.service';
import { ConfigExDropdownComponent } from '../config-ex-dropdown/config-ex-dropdown.component';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatDialogModule,
     ConfigExDropdownComponent, MatButtonModule],
     providers: [MatIconRegistry],
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss','./../nav-header/nav-button-styles.component.scss']
})

export class NavHeaderComponent {
  @Input() mobile!: boolean;
  configDialog: MatDialogRef<ConfigExDropdownComponent> | null = null; 

  constructor(private navigationService: NavigationService,
    private dialog: MatDialog
  ) 
  {}

  toggleConfig(): void {
    // Open the dialog if it's not already open
    if (!this.configDialog) {
      this.configDialog = this.dialog.open(ConfigExDropdownComponent);
      // Close the dialog when it's closed
      this.configDialog.afterClosed().subscribe(() => {
        this.configDialog = null; 
      });
    } else {
      this.configDialog.close();
      this.configDialog = null; 
    }
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
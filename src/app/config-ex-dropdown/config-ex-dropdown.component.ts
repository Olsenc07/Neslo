import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StandardConfigSizeComponent } from "../standard-config-size/standard-config-size.component";
import { CloseDialogDirective } from "../directives/close-dialog.directive";

@Component({
  selector: 'app-config-ex-dropdown',
  standalone: true,
  imports: [CloseDialogDirective, MatExpansionModule, MatIconModule, 
    MatInputModule,  MatDialogModule, MatTooltipModule,
    MatFormFieldModule,ReactiveFormsModule, StandardConfigSizeComponent
  ],
  templateUrl: './config-ex-dropdown.component.html',
  styleUrl: './config-ex-dropdown.component.scss'
})
export class ConfigExDropdownComponent  {

constructor( public dialog: MatDialog){}

  configSizeDialog(id: string): void {
    const dialogRef = this.dialog.open(StandardConfigSizeComponent, {
      data: {idFocus: id}
    });
 }

   standardConfig: {id: string, name: string, symbol: string,  imageUrl: string}[] = [
    { id: '1', name: '1 + 0', symbol: '_/', imageUrl: '../../assets/Neslo.png' },
    { id: '2', name: '1 + 1', symbol: `_/ \\_`, imageUrl: '../../assets/Neslo.png' },
    { id: '3', name: '2 + 0', symbol: '_^ _', imageUrl: '../../assets/Neslo.png' },
    { id: '4', name: '2 + 2', symbol: '_^ ^_', imageUrl: '../../assets/Neslo.png' },
    { id: '5', name: '3 + 0', symbol: '_/\\/ _', imageUrl: '../../assets/Neslo.png' },
    { id: '6', name: '3 + 1', symbol: '_/\\/ \\_', imageUrl: '../../assets/Neslo.png' },
    { id: '7', name: '3 + 3', symbol: '_/\\/ \/\\_', imageUrl: '../../assets/Neslo.png' },
    { id: '8', name: '4 + 0', symbol: '_/\\/\\ _', imageUrl: '../../assets/Neslo.png' },
    { id: '9', name: '4 + 4', symbol: '_/\\/\\ /\\/\\_', imageUrl: '../../assets/Neslo.png' },
    { id: '10', name: '5 + 0', symbol: '_/\\/\\/ _', imageUrl: '../../assets/Neslo.png' },
    { id: '11', name: '5 + 1', symbol: '_/\\/\\/ _', imageUrl: '../../assets/Neslo.png' },
    { id: '12', name: '5 + 3', symbol: '_/\\/\\/ \/\\_', imageUrl: '../../assets/Neslo.png' },
    { id: '13', name: '5 + 5', symbol: '_/\\/\\ /\\/\\_', imageUrl: '../../assets/Neslo.png' },
    { id: '14', name: '6 + 0', symbol: '_/\\/\\/\\ _', imageUrl: '../../assets/Neslo.png' },
    { id: '15', name: '6 + 6', symbol: '_/\\/\\/\\ /\\/\\/\\_', imageUrl: '../../assets/Neslo.png' },
    { id: '16', name: '7 + 0', symbol: '_/\\/\\/\\/ _', imageUrl: '../../assets/Neslo.png' },
    { id: '17', name: '7 + 1', symbol: '_/\\/\\/\\/ \\_', imageUrl: '../../assets/Neslo.png' },
    { id: '18', name: '8 + 0', symbol: '_/\\/\\/\\/\\ _', imageUrl: '../../assets/Neslo.png' },
    { id: '19', name: '9 + 0', symbol: '_/\\/\\/\\/\\/ _', imageUrl: '../../assets/Neslo.png' }
];
}
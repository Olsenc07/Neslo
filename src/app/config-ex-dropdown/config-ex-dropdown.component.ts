import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { StandardConfigSizeComponent } from "../standard-config-size/standard-config-size.component";
import { HideFocusDirective } from '../directives/hide-focus.directive';


@Component({
  selector: 'app-config-ex-dropdown',
  standalone: true,
  imports: [ HideFocusDirective, MatExpansionModule, MatIconModule, 
    MatInputModule,  MatDialogModule, MatSelectModule,
    MatFormFieldModule,ReactiveFormsModule, StandardConfigSizeComponent
  ],
  templateUrl: './config-ex-dropdown.component.html',
  styleUrl: './config-ex-dropdown.component.scss'
})
export class ConfigExDropdownComponent  {

constructor( public dialog: MatDialog){}

  configSizeDialog(id: string): void {
    this.dialog.open(StandardConfigSizeComponent,{
      data: id
    });
 }
 
  standardConfig: {id: string, name: string, imageUrl: string}[] = [
    { id: '1', name: '1 + 0', imageUrl: '../../assets/Neslo.png' },
    { id: '2', name: '1 + 1', imageUrl: '../../assets/Neslo.png' },
    { id: '3', name: '2 + 0', imageUrl: '../../assets/Neslo.png' },
    { id: '4', name: '2 + 2', imageUrl: '../../assets/Neslo.png' },
    { id: '5', name: '3 + 0', imageUrl: '../../assets/Neslo.png' },
    { id: '6', name: '3 + 1', imageUrl: '../../assets/Neslo.png' },
    { id: '7', name: '3 + 3', imageUrl: '../../assets/Neslo.png' },
    { id: '8', name: '4 + 0', imageUrl: '../../assets/Neslo.png' },
    { id: '9', name: '4 + 4', imageUrl: '../../assets/Neslo.png' },
    { id: '10', name: '5 + 0', imageUrl: '../../assets/Neslo.png' },
    { id: '11', name: '5 + 1', imageUrl: '../../assets/Neslo.png' },
    { id: '12', name: '5 + 3', imageUrl: '../../assets/Neslo.png' },
    { id: '13', name: '5 + 5', imageUrl: '../../assets/Neslo.png' },
    { id: '14', name: '6 + 0', imageUrl: '../../assets/Neslo.png' },
    { id: '15', name: '6 + 6', imageUrl: '../../assets/Neslo.png' },
    { id: '16', name: '7 + 0', imageUrl: '../../assets/Neslo.png' },
    { id: '17', name: '7 + 1', imageUrl: '../../assets/Neslo.png' },
    { id: '18', name: '8 + 0', imageUrl: '../../assets/Neslo.png' },
    { id: '19', name: '9 + 0', imageUrl: '../../assets/Neslo.png' }
];
}
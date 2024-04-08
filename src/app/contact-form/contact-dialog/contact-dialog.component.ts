import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form.component';
import { QuoteGeneratorComponent } from '../../quote-generator/quote-generator.component';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import  { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
  MatButtonModule,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
  ContactFormComponent
  ],
  templateUrl: './contact-dialog.component.html'
})
export class ContactDialogComponent {
  
constructor(public dialogRef: MatDialogRef<QuoteGeneratorComponent>){}

// sends msg
msg(tell: string): void {
  if(tell == 'sent')
this.dialogRef.close('send');
}
}

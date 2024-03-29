import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import  { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { QuoteGeneratorComponent } from '../quote-generator/quote-generator.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [   
    MatButtonModule,
    MatIconModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgClass
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  state: 'noFocus' | 'focus' = 'noFocus';
  imageSrc: string | ArrayBuffer | null = null;
  isFullScreen: boolean = false;

  contactForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl<string | null>(null, Validators.required),
    file: new FormControl<File | null>(null)
  });
constructor(public dialogRef: MatDialogRef<QuoteGeneratorComponent>){}
  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
  }
    onFileSelected(event: Event) {
      const element = event.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
      if (fileList) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
      }
    }
  
    onHover(isHovered: boolean): void {
      this.state = isHovered ? 'focus' : 'noFocus';
    }
    send(): void {
      console.log('Message emailed');
      if(this.dialogRef){
        // what if does not 
        this.dialogRef.close('send');
      }
      // Gives message, this message will be mailed to redman.. 
      // do you wish to continue?
  
      // display message
      // thx for the messae, get back to u soon
  }
}

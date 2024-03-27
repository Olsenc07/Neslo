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
import  {MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [   
    MatButtonModule,
    MatIconModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  state: 'noFocus' | 'focus' = 'noFocus';
  imageSrc: string | ArrayBuffer | null = null;
  contactForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl<string | null>(null, Validators.required),
    file: new FormControl<File | null>(null)
  });

  onClearMessage(): void {
    this.contactForm.get('message')?.reset();
    }
  onClearFile(): void {
      this.contactForm.get('file')?.reset();
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
      // Gives message, this message will be mailed to redman.. 
      // do you wish to continue?
  
      // display message
      // thx for the messae, get back to u soon
  }
}

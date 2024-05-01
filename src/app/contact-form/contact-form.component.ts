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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  imageSrc: SafeUrl = '';
  isFullScreen: boolean = false;
  fillAttached: boolean = false;

  constructor(private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ){}
  contactForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl<string | null>(null, Validators.required),
    file: new FormControl<File | null>(null)
  });
  fileName: string | null = null;
  fileType: string | null = null;
  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
  }
  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      const file = fileList[0];
      this.fileName = file.name; 
      this.fileType = file.type;
      const objectURL = URL.createObjectURL(file);
      this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    } 
  }
    // To remove the attached file
    removeAttachedFile() {
      this.contactForm.patchValue({ file: null });
      this.fileName = '';
      this.imageSrc = '';
    }

    onHover(isHovered: boolean): void {
      this.state = isHovered ? 'focus' : 'noFocus';
    }
    send(): void {
      this.snackBar.open('Direct messaging is not yet supported. Please try again soon.', 'Close', {
        duration: 3000
      });
      // if(this.fillAttached)
      // {
      //   this.snackBar.open('Thank you for contacting Neslo. We will get back to you with a quote as soon as possible.', '✅', {
      //     duration: 3000
      //   });
      // }else{
      //   this.snackBar.open('Thank you for contacting Neslo. We will respond as soon as possible.', '✅', {
      //     duration: 3000
      //   });
      // }

  }
}

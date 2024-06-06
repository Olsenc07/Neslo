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
import { OrientationService } from '../services/orientation.service';
import { HideFocusService } from '../services/hide-focus.service';
import { HideFocusDirective } from '../directives/hide-focus.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmailService } from '../services/email.service';
import { CloseBtnComponent } from '../close-btn/close-btn.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [   
    CloseBtnComponent,
    MatButtonModule,
    MatIconModule, 
    MatInputModule,
    MatTooltipModule,
    HideFocusDirective,
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
    protected hideFocusService: HideFocusService,
    protected emailService: EmailService,
    protected orientationService: OrientationService,
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
  fileType: string | null = null;
  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
  }
  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      const file = fileList[0];
      this.fileType = file.type;
      const objectURL = URL.createObjectURL(file);
      this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    } 
  }
    // To remove the attached file
    onBtnClicked() {
      this.contactForm.patchValue({ file: null });
      this.imageSrc = '';
    }

    onHover(isHovered: boolean): void {
      this.state = isHovered ? 'focus' : 'noFocus';
    }
    send(): void {
      // this.snackBar.open('Direct messaging is not yet supported. Please try again soon.', 'Close', {
      //   duration: 3000
      // });
      console.log('values', this.contactForm.value);
      this.emailService.sendEmail(this.contactForm.value)
        .subscribe({
    next: (response) => {
      // Handle successful response
      console.log('Email sent successfully:', response);
      // Reset the form and show a success message
      this.contactForm.reset();
      this.snackBar.open('Email sent successfully!', 'Close', {
        duration: 3000
      });
    },
    error: (error) => {
      // Handle error
      console.error('Error sending email:', error);
      this.snackBar.open('Error sending email. Please try again later.', 'Close', {
        duration: 3000
      });
    },
    complete: () => {
      // Optional: Handle completion
    }
  });
  
}
}

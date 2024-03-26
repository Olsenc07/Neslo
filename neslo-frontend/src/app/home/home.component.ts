import { Component, HostListener, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
@Component({
  standalone: true,

  selector: 'app-home',
  imports: [
    MatButtonModule, 
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('imgChild', { static: false }) imgChild!: ElementRef<HTMLImageElement>;
  triggerSubmit = document.getElementById('submitBtn');
  state: 'noFocus' | 'focus' = 'noFocus';
  imageSrc: string | ArrayBuffer | null = null;
  constructor(private renderer: Renderer2, private router: Router) {}

  contactForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl<string | null>(null, Validators.required),
    file: new FormControl<File | null>(null)

  });

  ngAfterViewInit(): void {
    this.handleScroll(); 
  }
  
  requestQuote(): void {
    this.router.navigate(['/quotes']);
  }
  navigateToContact(): void {
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  }
  navigateToMsg(): void {
    document.getElementById('msg')?.scrollIntoView({ behavior: 'smooth' });
  }
  @HostListener('window:scroll', ['$event']) 
  handleScroll(): void {
    const scrollPosition = window.scrollY;
    const height = window.innerHeight;
    // Adjust the blur value based on the scroll position. You can tweak this formula to change how quickly the blur effect increases.
    const blurValue = Math.min(70, (scrollPosition / (height) * 30)); // Cap the blur at a maximum value, e.g., 20px
  
    if (this.imgChild && this.imgChild.nativeElement) {
      this.renderer.setStyle(this.imgChild.nativeElement, 'filter', `blur(${blurValue}px)`);
    }

  }
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

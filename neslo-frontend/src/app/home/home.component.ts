import { Component, HostListener, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
@Component({
  standalone: true,

  selector: 'app-home',
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  selectedFile: File | null = null;
  // @ViewChild('vikingImage', { static: false }) vikingImage!: ElementRef<HTMLImageElement>;
  @ViewChild('imgChild', { static: false }) imgChild!: ElementRef<HTMLImageElement>;
  triggerSubmit = document.getElementById('submitBtn');
  state: 'noFocus' | 'focus' = 'noFocus';

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
  @HostListener('window:scroll', ['$event']) 
  handleScroll(): void {
    const scrollPosition = window.scrollY;
    const height = window.innerHeight;
    // Adjust the blur value based on the scroll position. You can tweak this formula to change how quickly the blur effect increases.
    const blurValue = Math.min(70, (scrollPosition / height) * 20); // Cap the blur at a maximum value, e.g., 20px
    const imgValue = 50 - (scrollPosition / height);
    if (this.imgChild && this.imgChild.nativeElement) {
      this.renderer.setStyle(this.imgChild.nativeElement, 'filter', `blur(${blurValue}px)`);
    }

  }
  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
      // You can also do further validations or checks here
    }
  }

  onHover(isHovered: boolean): void {
    this.state = isHovered ? 'focus' : 'noFocus';
  }

  send(): void {
    console.log('Message emailed');
    // Gives message, this message will be mailed to redman.. 
    // do you wish to continue?
}
}

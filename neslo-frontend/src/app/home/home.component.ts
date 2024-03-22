import { Component, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedFile: File | null = null;
  @ViewChild('vikingImage', { static: false }) vikingImage!: ElementRef<HTMLImageElement>;
  @ViewChild('imgLayout', { static: false }) imgLayout!: ElementRef<HTMLImageElement>;

  constructor(private renderer: Renderer2, private router: Router) {}

  contactForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl<string | null>(null, Validators.required)
  })
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
    const imgValue = 50 - (scrollPosition / height) * 10; 

    // Use renderer to adjust the CSS filter property for the blur effect
    this.renderer.setStyle(this.vikingImage.nativeElement, 'filter', `blur(${blurValue}px)`);
    this.renderer.setStyle(this.imgLayout.nativeElement, 'background-position', `50% (${imgValue}%)`);
  }
  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
      // You can also do further validations or checks here
    }
  }

  send(): void {
    console.log('Message emailed');
    // Give heads up that it will go to 
    // Expect Two bussiness says for a response.
  }
}

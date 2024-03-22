import { Component, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('vikingImage', { static: false }) vikingImage!: ElementRef<HTMLImageElement>;
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.handleScroll(); 
  }

  @HostListener('window:scroll', ['$event']) 
  handleScroll(): void {
    const scrollPosition = window.scrollY;
    const height = window.innerHeight;
    // Adjust the blur value based on the scroll position. You can tweak this formula to change how quickly the blur effect increases.
    const blurValue = Math.min(20, (scrollPosition / height) * 20); // Cap the blur at a maximum value, e.g., 20px

    // Use renderer to adjust the CSS filter property for the blur effect
    this.renderer.setStyle(this.vikingImage.nativeElement, 'filter', `blur(${blurValue}px)`);
  
  }
}

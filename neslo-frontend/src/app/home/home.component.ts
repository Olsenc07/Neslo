import { Component, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('heroSection', { static: false }) heroSection: ElementRef;
  divEl = viewChild<ElementRef>('el'); 
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.handleScroll(); 
  }

  @HostListener('window:scroll', ['$event']) 
  handleScroll(): void {
    const heroSection = this.renderer.selectRootElement('.hero-section', true);
    const scrollPosition = window.scrollY;
    const height = window.innerHeight;
    const opacity = 1 - (scrollPosition / height);

    if (this.heroSection && this.heroSection.nativeElement) {
      this.heroSection.nativeElement.style.opacity = opacity > 0 ? opacity : 0;
    }
  }
}

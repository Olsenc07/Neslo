import { Component, HostListener, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { ContactFormComponent } from 'src/app/contact-form/contact-form.component';
import { AboutUsComponent } from 'src/app/about-us/about-us.component';
import { SkeletonFormComponent } from 'src/app/skeleton-form/skeleton-form.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    AboutUsComponent,
    ContactFormComponent,
    MatButtonModule, 
    MatDividerModule,
    MatIconModule,
    SkeletonFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
messageAB: string = `Located in Olds, AB, Neslo specializes in the supply and installation 
of premium windows and doors, offering unparalleled durability and energy efficiency. 
Using the Folding Sliding Door System designed by FSDC.
/br
Stay up to date:
{{<a href="https://www.instagram.com/foldingsliding_doors_erik" target="_blank" class="styled-link">@foldingsliding_doors_erik</a>}}`
introAB: string =`Alberta's location for delivery and instolation of 
Folding Sliding Doors Canada .`

messageBC: string = `
Check out our latest projects at Folding Sliding Doors Canada: 
{{<a href="https://www.foldingslidingdoors.ca/" target="_blank" class="styled-link">www.foldingslidingdoors</a>}}`
introBC: string = `Folding Sliding Doors Canada is the proud supplier for Neslo.`
  @ViewChild('imgChild', { static: false }) imgChild!: ElementRef<HTMLImageElement>;
  constructor(private renderer: Renderer2, private router: Router) {}

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
 
}

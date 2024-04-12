import { Component, HostListener, Renderer2, 
  ElementRef, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

import { ContactFormComponent } from 'src/app/contact-form/contact-form.component';
import { AboutUsComponent } from 'src/app/about-us/about-us.component';
// import { SkeletonFormComponent } from 'src/app/about-us/skeleton-form/skeleton-form.component';
import { SkeletonFormFillComponent } from 'src/app/contact-form/skeleton-form-fill/skeleton-form-fill.component';
import { OrientationService } from 'src/app/services/orientation.service';
import { IntroComponent } from 'src/app/intro/intro.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    AboutUsComponent,
    ContactFormComponent,
    MatButtonModule, 
    MatDividerModule,
    MatIconModule,
    // SkeletonFormComponent,
    SkeletonFormFillComponent,
    IntroComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

atSymbol = '@';
imgAB: {img: string, alt: string } = {img:'../../assets/Neslo.jpg', alt: 'Neslo Ltd. Logo' }
messageAB: string = `Rooted in Central Alberta, we bring over 30 years of expertise as journeyman carpenters and custom home builders to your door and window installations. 
Specializing in custom solutions, we ensure top-quality craftsmanship tailored to your home. 
<br>Stay up to date:<br>
<a href="https://www.instagram.com/foldingslidingdoors_erik" target="_blank" class="styled-link">@foldingslidingdoors_erik</a>`
introAB: string =`Alberta's premier destination for the delivery and installation of Folding Sliding Doors Canada.`

imgBC: {img: string, alt: string } = {img:'../../assets/folding_sliding_doors_logo.png', alt: 'Folding Sliding Doors Canada Ltd. Logo' }
messageBC: string = `Neslo specializes in the installation of folding sliding doors from Kelowna, BC.
<br>
Check out our latest projects at Folding Sliding Doors Canada: 
<br>
<a href="https://www.foldingslidingdoors.ca/" target="_blank" class="styled-link">www.foldingslidingdoors</a>`
introBC: string = `Folding Sliding Doors Canada is the proud supplier for Neslo.`
  @ViewChild('imgChild', { static: false }) imgChild!: ElementRef<HTMLImageElement>;
  constructor(private renderer: Renderer2,
    protected orientationService: OrientationService) {}
  
  @HostListener('window:scroll', ['$event']) 
  handleScroll(): void {
    const scrollPosition: number = window.scrollY;
    const height: number = window.innerHeight;
    const blurValue: number = Math.min(30, (scrollPosition / (height) * 10)); 
  
    if (this.imgChild && this.imgChild.nativeElement) {
      this.renderer.setStyle(this.imgChild.nativeElement, 'filter', `blur(${blurValue}px)`);
    }

  }
  
}

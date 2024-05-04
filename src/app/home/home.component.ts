import { Component, HostListener, Renderer2, 
  ElementRef, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

import { ContactFormComponent } from 'src/app/contact-form/contact-form.component';
import { AboutUsComponent } from 'src/app/about-us/about-us.component';
// import { SkeletonFormComponent } from 'src/app/about-us/skeleton-form/skeleton-form.component';
import { SkeletonFormFillComponent } from 'src/app/contact-form/skeleton-form-fill/skeleton-form-fill.component';
import { OrientationService } from 'src/app/services/orientation.service';
import { IntroComponent } from 'src/app/intro/intro.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    AboutUsComponent,
    ContactFormComponent,
    MatButtonModule, 
    MatDividerModule,
    MatIconModule,
    FontAwesomeModule,
    NgClass,
    // SkeletonFormComponent,
    SkeletonFormFillComponent,
    IntroComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
atSymbol: string = '@';
faInstagramSquare = faInstagramSquare;

imgAB: {img: string, alt: string } = {img:'../../assets/Neslo.jpg', alt: 'Neslo Ltd.' }
messageAB: SafeHtml;
introAB: SafeHtml;

imgBC: {img: string, alt: string } = {img:'../../assets/folding_sliding_doors_logo.png', alt: 'Folding Sliding Doors Canada Ltd.' }
messageBC: SafeHtml;
introBC: SafeHtml;
  
@ViewChild('imgChild', { static: false }) imgChild!: ElementRef<HTMLImageElement>;
@ViewChild('borders', { static: false }) borders!: ElementRef<HTMLImageElement>;

constructor(private renderer: Renderer2, private sanitizer: DomSanitizer,
    protected orientationService: OrientationService) {
      this.introAB = this.sanitizer.bypassSecurityTrustHtml(
        `Alberta's premier destination for the delivery and installation of <br>
         <b fsdc>Folding Sliding Doors Canada</b>.`
      );
      this.messageAB = this.sanitizer.bypassSecurityTrustHtml(`
      Rooted in Central Alberta, we bring over 30 years of expertise as journeyman carpenters and custom home builders to your door and window installations. 
      Specializing in custom solutions, we ensure top-quality craftsmanship specifically to your home's needs. 
      <br> Keep connected and stay informed by following us. <br> 
      <br>
      Instagram:
      <a href="https://www.instagram.com/foldingslidingdoors_erik" target="_blank" class="styled-link">
       @foldingslidingdoors_erik</a>`
    );
  
    this.introBC = this.sanitizer.bypassSecurityTrustHtml(
      `<br><b fsdc> Folding Sliding Doors Canada</b> is the proud supplier for <b>Neslo</b>.`
    );
    this.messageBC = this.sanitizer.bypassSecurityTrustHtml(`
      <b>Neslo</b> specializes in the installation of folding sliding doors from Kelowna, BC.
      <br>
      Check out our latest projects at Folding Sliding Doors Canada. 
      <br>
      <br>
      Website:
      <a href="https://www.foldingslidingdoors.ca/" target="_blank" class="styled-link"> Folding Sliding Doors Canada</a>`
    );
    }

  @HostListener('window:scroll', ['$event']) 
  handleScroll(): void {
    const scrollPosition: number = window.scrollY;
    const height: number = window.innerHeight;
    const blurValue: number = Math.min(30, (scrollPosition / (height) * 10)); 
    // no zoom for mobile
    const zoomFactor: number = (1 + scrollPosition / height) * 100; 
     // Calculate new size percentage
  if (this.imgChild && this.imgChild.nativeElement) {
    this.renderer.setStyle(this.imgChild.nativeElement, 'filter', `blur(${blurValue}px)`);
    if(!this.orientationService.screen()){
    this.renderer.setStyle(this.imgChild.nativeElement, 'background-size', `${zoomFactor}%`);
    // reset
    if(scrollPosition < 3) {
    }}}}
}
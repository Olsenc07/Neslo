import { Component, HostListener, Renderer2, 
  ElementRef, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

import { ContactFormComponent } from 'src/app/contact-form/contact-form.component';
import { AboutUsComponent } from 'src/app/about-us/about-us.component';
// import { SkeletonFormComponent } from 'src/app/about-us/skeleton-form/skeleton-form.component';
import { SkeletonFormFillComponent } from 'src/app/contact-form/skeleton-form-fill/skeleton-form-fill.component';
import { OrientationService } from 'src/app/services/orientation.service';
import { IntroComponent } from 'src/app/intro/intro.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InstaCarouselComponent } from "../insta-carousel/insta-carousel.component";

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        AboutUsComponent,
        ContactFormComponent,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        NgClass,
        // SkeletonFormComponent,
        SkeletonFormFillComponent,
        IntroComponent,
        InstaCarouselComponent
    ],
    animations: [
      trigger('dropIn', [
        state('void', style({ opacity: 0.3, transform: 'translateY(-50px)' })), 
        state('*', style({ opacity: 1, transform: 'translateY(0)' })),
        transition('void => *', [
          animate('0.8s .3s ease-out') 
        ])
      ])
    ]
})

export class HomeComponent {
atSymbol: string = '@';

imgAB: {img: string, alt: string } = {img:'../../assets/Neslo.jpg', alt: 'Neslo Ltd.' }
messageAB: SafeHtml;
introAB: SafeHtml;

imgBC: {img: string, alt: string } = {img:'../../assets/folding_sliding_doors_logo.png', alt: 'Folding Sliding Doors Canada Ltd.' }
messageBC: SafeHtml;
introBC: SafeHtml;
  
@ViewChild('imgChild', { static: false }) imgChild?: ElementRef<HTMLImageElement>;

constructor(private renderer: Renderer2, private sanitizer: DomSanitizer,
    protected orientationService: OrientationService) {
      this.introAB = this.sanitizer.bypassSecurityTrustHtml(
        `Alberta's premier destination for the delivery and installation of <br>
         <b fsdc>Folding Sliding Doors Canada</b>.`
      );
      this.messageAB = this.sanitizer.bypassSecurityTrustHtml(`
      Rooted in Central Alberta, we bring over 30 years of expertise as journeyman carpenters and custom home builders to your door and window installations. 
      Specializing in custom solutions, we ensure top-quality craftsmanship specifically to your home's needs. 
      <br> Keep connected and stay informed by following us on instagram. <br> 
      <br>
      <p class="headings">
      <i class="bi bi-instagram px-1"></i>
      <a href="https://www.instagram.com/foldingslidingdoors_erik" target="_blank" class="styled-link">
       @foldingslidingdoors_erik</a>
       </p>`
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
      <p class="headings">
      <span class="material-symbols-outlined">
            web
       </span>
      <a href="https://www.foldingslidingdoors.ca/" target="_blank" class="styled-link"> Folding Sliding Doors Canada</a>
      </div>`
    );
    }

  @HostListener('window:scroll', ['$event']) 
  handleScroll(): void {
    // no zoom on mobile
    if(!this.orientationService.screen()){
    const scrollPosition: number = window.scrollY;
    const height: number = window.innerHeight;
    const zoomFactor: number = (1 + scrollPosition / height) * 100; 
     // Calculate new size percentage
  if (this.imgChild && this.imgChild.nativeElement) {
    this.renderer.setStyle(this.imgChild.nativeElement, 'background-size', `${zoomFactor}%`);
    // reset
    if(scrollPosition < 3) {
      this.renderer.setStyle(this.imgChild.nativeElement, 'background-size', `cover`);
    }}}}
}
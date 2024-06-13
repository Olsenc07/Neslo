import { Component, HostListener, Renderer2, 
  ElementRef, ViewChild, 
  AfterViewInit, OnDestroy} from '@angular/core';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ContactFormComponent } from 'src/app/contact-form/contact-form.component';
import { AboutUsComponent } from 'src/app/about-us/about-us.component';
import { SkeletonFormFillComponent } from 'src/app/contact-form/skeleton-form-fill/skeleton-form-fill.component';
import { OrientationService } from 'src/app/services/orientation.service';
import { IntroComponent } from 'src/app/intro/intro.component';

import { InstaCarouselComponent } from "../insta-carousel/insta-carousel.component";
import { CarouselComponent } from '../carousel/carousel.component';
import { NavHeaderComponent } from '../nav-header/nav-header.component';

import { ImgService } from '../services/img.service';
import { HeaderService } from '../services/header.service';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
      AboutUsComponent,
      CarouselComponent,
      ContactFormComponent,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      NavHeaderComponent,
      NgClass,
      SkeletonFormFillComponent,
      IntroComponent,
      InstaCarouselComponent
    ]
})

export class HomeComponent implements AfterViewInit, OnDestroy {
atSymbol: string = '@';
headerShow: boolean = false;
private observer?: IntersectionObserver;

imgAB: {img: string, alt: string } = {img:'../../assets/Neslo.png', alt: 'Neslo Ltd.' }
messageAB: SafeHtml;
introAB: SafeHtml;

imgBC: {img: string, alt: string } = {img:'../../assets/folding_sliding_doors_logo.png', alt: 'Folding Sliding Doors Canada Ltd.' }
messageBC: SafeHtml;
introBC: SafeHtml;

@ViewChild('header', { static: false }) header?: ElementRef<HTMLImageElement>;
@ViewChild('imgChild', { static: false }) imgChild?: ElementRef<HTMLImageElement>;

constructor(private renderer: Renderer2, private sanitizer: DomSanitizer, protected imgService: ImgService,
    protected orientationService: OrientationService, protected headerService: HeaderService,
  ) {
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
       foldingslidingdoors_erik
      </a>
       </p>`
    );
  
    this.introBC = this.sanitizer.bypassSecurityTrustHtml(
      `<br><b fsdc> Folding Sliding Doors Canada</b> is the proud supplier for <br>
       <b>Neslo</b>
      | Premium Windows and Doors.`
    );
    this.messageBC = this.sanitizer.bypassSecurityTrustHtml(`
      <b>Neslo</b> specializes in the installation of folding sliding doors from Kelowna, BC.
      <br>
      Check out our latest projects at on our website. 
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
    @HostListener('window:visibilityChange', ['$event'])
    onVisibilityChange() {
      this.headerService.setHeaderState(!this.headerShow);
    }

    ngAfterViewInit() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.headerShow = entry.isIntersecting;
          this.onVisibilityChange();
        });
      });
      this.observer.observe(this.header!.nativeElement);
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
    
    ngOnDestroy() {
      this.observer?.disconnect();
    }
}
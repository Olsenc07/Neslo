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
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    ],
    animations: [
      trigger('wordMoveLeft', [
        state('initial', style({
          transform: 'translateX(-20px)'
        })),
        state('final', style({
          transform: 'translateX(0px)' 
        })),
        transition('initial <=> final', animate('500ms ease-in-out')),

      ]),
      trigger('wordMoveRight', [
        state('initial', style({
          transform: 'translateX(20)'
        })),
        state('final', style({
          transform: 'translateX(0px)' // Adjust as needed
        })),
        transition('initial => final', animate('500ms ease-in')),
        transition('final => initial', animate('500ms ease-out'))
      ])
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
Nelso | Premium Windows and Doors, managed by Erik Olsen, is rooted in Central Alberta. 
With over 30 years of expertise as journeyman carpenters and custom home builders, we bring a wealth of experience and knowledge to every door and window installation.
 Our team specializes in custom solutions, meticulously crafted to meet the unique needs of your home.

<br>

<h3 heading>
<br>
Why Choose   <b> Nelso </b>
</h3>

<ul>
  <li>Over 30 years of industry expertise</li>
  <li>Custom solutions tailored to your home's needs</li>
  <li>Meticulous craftsmanship</li>
  <li>Unparalleled customer service</li>
</ul>


<h3 heading>
Our Services
</h3>

<ul>
  <li>Fireplace installation</li>
  <li>Door and window installations</li>
  <li>Delivery and installation of Folding Sliding Doors Canada</li>
</ul>

As Alberta's premier destination for Folding Sliding Doors Canada, Nelso ensures a seamless and professional experience from start to finish. 
Whether you are renovating your existing space or building a new home.
<br>
      <br> Keep connected and stay informed by following us on instagram. <br> 
      <br>
        <p class="headings">
      <i class="bi bi-instagram px-1"></i>
      <a href="https://www.instagram.com/foldingslidingdoors_erik" target="_blank">
        FoldingSlidingDoors_Erik
      </a>
       </p>`
    );
  
    this.introBC = this.sanitizer.bypassSecurityTrustHtml(
      `<br><b fsdc> Folding Sliding Doors Canada</b> is the proud supplier for <br>
       <b>Neslo
      | Premium Windows and Doors.
      </b>`
    );
    this.messageBC = this.sanitizer.bypassSecurityTrustHtml(`
Folding Sliding Doors Canada, based out of Kelowna, BC, specializes in providing innovative and effortless door solutions that transform spaces. They offer a range of high-quality folding sliding doors designed to enhance both the aesthetics and functionality of your home or business.

<h3 heading>
<br>
Why Choose <b fsdc>  FSDC </b >
</h3>

<ul>
  <li>Innovative and effortless door solutions</li>
  <li>High-quality folding sliding doors</li>
  <li>Enhanced aesthetics and functionality</li>
  <li>Crafted to meet the highest standards of quality and performance</li>
</ul>


<h3 heading>
Their Services
</h3>

<ul>
  <li>Residential and commercial door solutions</li>
  <li>Customizable options to fit your design aesthetic</li>
  <li>Expertise in large-opening door systems</li>
</ul>

Trust
<b> Nelso </b>
 for the installation of these custom windows and doors. 
      <br>
      <br>
      Check out FSDC's latest projects on their website. 
      <br>
      <br>
      <p class="headings">
      <span class="material-symbols-outlined">
            web
       </span>
      <a href="https://www.foldingslidingdoors.ca/" target="_blank"> Folding Sliding Doors Canada</a>
      </div>`
    );
    }
    @HostListener('window:visibilityChange', ['$event'])
    onHeaderVisibilityChange() {
      this.headerService.setHeaderState(!this.headerShow);
    }
    // @HostListener('window:visibilityChange', ['$event'])
    // onPartnerVisibilityChange() {
    //   //trigger animation for Neslo Partnership
    // }

    ngAfterViewInit() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.headerShow = entry.isIntersecting;
          this.onHeaderVisibilityChange();
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
import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, computed, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common'

import { take } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SkeletonFormFillComponent } from './skeleton-carousel/skeleton-carousel.component';
import { ImagesService } from '../services/images.service';
import { CloseBtnComponent } from '../close-btn/close-btn.component';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatIconModule,  MatButtonModule,NgxSkeletonLoaderModule,
    CloseBtnComponent, NgOptimizedImage, SkeletonFormFillComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [ // other animation ideas for the childs?
    trigger('enterLeftToRight', [
      transition(':enter', [
        style({ transform: 'translateX(-12px)' }),
        animate('1s linear', style({ transform: 'translateX(0px)'}))
      ])
    ])
  ],
})
export class CarouselComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() route!: 'Residential' | 'Showcase';
  @Input() heading: string = '';

  // loadedImages: boolean[] = [];
  focusShowcase: boolean = false;

  images: { secure_url: string, public_id: string }[] 
  = [{ secure_url: '', public_id: '' }];
  activeImageIndex: number = 0;
  imgView: boolean = false;
  @ViewChild('viewing', { static: false }) viewing?: ElementRef<HTMLImageElement>;

  private observerImg?: IntersectionObserver;

  private imgState = signal<boolean>(false)
  focused = computed<boolean>(() => this.imgState())

setImgState(state: boolean): void {
  this.imgState.set(state);
}
@HostListener('window:visibilityChange', ['$event'])
  onVisibilityChangeImg() {
    this.setImgState(true);
  }
  
  constructor(protected imagesService: ImagesService,
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    this.imagesService.fetchImages(this.route).pipe(
      take(1)
    ).subscribe((arrayObject: { secure_url: string, public_id: string }[]) => {
      this.images = arrayObject;
      // this.loadedImages = new Array(this.images.length).fill(false);
    });
  }

  ngAfterViewInit(): void {
    this.observerImg = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.imgView = entry.isIntersecting;
        this.onVisibilityChangeImg();
      });
    });
    this.observerImg.observe(this.viewing!.nativeElement);
  }


  // onImageLoadSmall(): void {
  //   this.loadedImages = new Array(this.images.length).fill(true);
  // }

  activateImage(index: number): void {
    if(index <= 0 ){
      this.activeImageIndex = this.images.length;
    } else if( index >= this.images.length){
      this.activeImageIndex = 0;
    } else{
      this.activeImageIndex = index;
    }
  }
  focusImg(index: number): void {
    if (window.innerWidth < 1025) {
      // Navigate to the images page
      this.navigationService.requestImagesMobile(this.route, index);
    } else {
      this.focusShowcase = true;
      if (isPlatformBrowser(this.platformId)) {
        const homeWrapper = document.querySelector('.homeWrapper'); 
        if (homeWrapper) {
          // Set the position to static
          this.renderer.setStyle(homeWrapper, 'position', 'fixed');
        }
      }
  }
}
  onBtnClicked(): void {
    this.focusShowcase = false;
    if (isPlatformBrowser(this.platformId)) {
      const homeWrapper: Element | null = document.querySelector('.homeWrapper'); 
      if (homeWrapper) {
      this.renderer.removeStyle(homeWrapper, 'position');
      }
      const showcaseElement:HTMLElement | null = document.getElementById('showcase');
      if (showcaseElement) {
        showcaseElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  ngOnDestroy() {
    this.observerImg?.disconnect();
  }
}
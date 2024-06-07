import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, computed, signal } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { take } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SkeletonFormFillComponent } from './skeleton-carousel/skeleton-carousel.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgOptimizedImage } from '@angular/common'
import { CloseBtnComponent } from '../close-btn/close-btn.component';
import { ImgService } from '../services/img.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatIconModule,  MatButtonModule,NgxSkeletonLoaderModule,
    CloseBtnComponent, NgOptimizedImage, SkeletonFormFillComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('enterLeftToRight', [
      transition(':enter', [
        style({ transform: 'translateX(-12px)' }),
        animate('1s ease-in-out', style({ transform: 'translateX(0px)'}))
      ])
    ])
  ],
})
export class CarouselComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() route!: 'Residential' | 'Showcase';
  @Input() heading: string = '';

  imageLoaded: boolean = false;
  loadedImages: boolean[] = [];
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
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    this.imagesService.fetchImages(this.route).pipe(
      take(1)
    ).subscribe((arrayObject: { secure_url: string, public_id: string }[]) => {
      this.images = arrayObject;
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

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  activateImage(index: number): void {
    if(index !== this.images.length) {
      this.activeImageIndex = index;
    } else {
    this.activeImageIndex = 0;
    }
   
  }
  focusImg(): void {
    this.focusShowcase = true;
    this.renderer.addClass(document.body, 'noScroll');
  }
  onBtnClicked(): void {
    this.focusShowcase = false;
    this.renderer.removeClass(document.body, 'noScroll');
  }
  ngOnDestroy() {
    this.observerImg?.disconnect();
  }
}
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
        style({ transform: 'translateX(-24px)' }),
        animate('1s ease-in-out', style({ transform: 'translateX(0px)'}))
      ])
    ])
  ],
})
export class CarouselComponent implements OnInit {
  @Input() route!: 'Residential' | 'Showcase';
  @Input() heading: string = '';
  imageLoaded: boolean = false;
  loadedImages: boolean[] = [];
  focusShowcase: boolean = false;

  images: { secure_url: string, public_id: string }[] 
  = [{ secure_url: '', public_id: '' }];
  activeImageIndex: number = 0;
  intervalId: NodeJS.Timeout | undefined;

  constructor(protected imagesService: ImagesService,
    private  imgService: ImgService
  ) {}

  ngOnInit(): void {
    this.imagesService.fetchImages(this.route).pipe(
      take(1)
    ).subscribe((arrayObject: { secure_url: string, public_id: string }[]) => {
      console.log('hi',arrayObject);
      this.images = arrayObject;
      // this.startCarousel();
    });
  }
  onImageLoad(): void {
    this.imageLoaded = true;
  }

  activateImage(index: number): void {
    if(index !== this.images.length) {
      this.activeImageIndex = index;
    } else {
    console.log(index)
    this.activeImageIndex = 0;
    }
   
  }
  focusImg(): void {
    this.focusShowcase = true;
    this.imgService.setImgFocus(true)
  }
  onBtnClicked(): void {
    this.focusShowcase = false;
  }
  
  
//   startCarousel(): void {
//     let iterations = 0;
//     // const maxIterations = this.images.length * 3; 

//     // this.intervalId = setInterval(() => {
//     //     if (iterations >= maxIterations) {
//     //         clearInterval(this.intervalId);
//     //         return;
//     //     }
//     //     this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
//     //     this.activateImage(this.activeImageIndex);
//     //     iterations++;
//     // }, 10000);
// } 
}
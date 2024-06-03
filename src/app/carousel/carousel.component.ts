import { Component, Input, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SkeletonFormFillComponent } from './skeleton-carousel/skeleton-carousel.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,NgxSkeletonLoaderModule,
     SkeletonFormFillComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('activeImage', [
      transition(':enter', [
        style({ opacity: 0.8 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ])
    ]),
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

  images: { secure_url: string, public_id: string }[] 
  = [{ secure_url: '', public_id: '' }];
  activeImageIndex: number = 0;
  intervalId: NodeJS.Timeout | undefined;
  
  constructor(protected imagesService: ImagesService) {}

  ngOnInit(): void {
    this.imagesService.fetchImages(this.route).pipe(
      take(1)
    ).subscribe((arrayObject: { secure_url: string, public_id: string }[]) => {
      this.images = arrayObject;
      this.startCarousel();
    });
  }

  activateImage(index: number): void {
    if(index >= this.images.length) {
      this.activeImageIndex = 0;
    }
    console.log(index)
    this.activeImageIndex = index;
   
  }

  startCarousel(): void {
    let iterations = 0;
    // const maxIterations = this.images.length * 3; 

    // this.intervalId = setInterval(() => {
    //     if (iterations >= maxIterations) {
    //         clearInterval(this.intervalId);
    //         return;
    //     }
    //     this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
    //     this.activateImage(this.activeImageIndex);
    //     iterations++;
    // }, 10000);
} 




}
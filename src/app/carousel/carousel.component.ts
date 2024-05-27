import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('activeImage', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0.8 }),
        animate('1s ease-in-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s ease-in-out', style({ transform: 'scale(0.8)', opacity: 0.8 })),
      ]),
    ])
  ],
})
export class CarouselComponent implements OnInit {
  @Input() route!: 'Residential' | 'Showcase';
  @Input() heading: string = '';
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

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
    this.activeImageIndex = index;
    // reasign focused image but no chnages to view smaller
    // Move the clicked image to the first position
    // this.images.splice(index, 1);
    // this.images.unshift(this.images[index]);
  }

  startCarousel(): void {
    let iterations = 0;
    const maxIterations = this.images.length * 3; 

    this.intervalId = setInterval(() => {
        if (iterations >= maxIterations) {
            clearInterval(this.intervalId);
            return;
        }
        this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
        this.activateImage(this.activeImageIndex);
        iterations++;
    }, 8000);
} 




}
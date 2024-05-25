import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('activeImage', [
      transition(':enter', [
        style({ transform: 'scale(1)', opacity: 0.8 }),
        animate('0.5s ease-in-out', style({ transform: 'scale(1.2)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'scale(1)', opacity: 0.8 })),
      ]),
    ]),
    trigger('smallerImage', [
      transition(':enter', [
        style({ transform: 'scale(1)', opacity: 0.5 }),
        animate('0.5s ease-in-out', style({ transform: 'scale(0.8)', opacity: 0.8 })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'scale(1)', opacity: 0.5 })),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() route!: 'Residential' | 'Showcase';
  @Input() heading: string = '';
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  images: { secure_url: string, public_id: string }[] = [];
  activeImageIndex: number = 0;
  intervalId: NodeJS.Timeout | undefined;
  
  constructor(protected imagesService: ImagesService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  loadImages(): void {
    this.imagesService.fetchImages(this.route)
    
    if(this.route == 'Residential'){
      this.images = this.imagesService.getResidentialImages();
    }else{
        this.images = this.imagesService.getShowcaseImages();
      }
  }

  activateImage(index: number): void {
    this.activeImageIndex = index;
    // Move the clicked image to the first position
    this.images.splice(index, 1);
    this.images.unshift(this.images[index]);
    this.startCarousel();
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
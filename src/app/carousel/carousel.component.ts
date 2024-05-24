import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() route!: 'Residential' | 'Showcase';
  @Input() heading: string = '';
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  images: string[] = [];
  intervalId: NodeJS.Timeout | undefined;
  
  constructor(protected imagesService: ImagesService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  loadImages(): void {
    this.imagesService.fetchImages(this.route).subscribe({
      next: (images: string[]) => {
        this.images = images;
      },
      error: error => console.error('Error fetching images:', error)
    });
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      const container = this.carouselContainer.nativeElement as HTMLElement;
      const imageElements = container.getElementsByClassName('carousel-image');
      const activeElement = container.querySelector('.carousel-image.active') as HTMLElement;
  
      // Ensure activeElement is not null
      if (!activeElement) {
        // If no active element found, set the first element as active
        if (imageElements.length > 0) {
          (imageElements[0] as HTMLElement).classList.add('active');
        }
        return;
      }
  
      let activeIndex = Array.from(imageElements).indexOf(activeElement);
      const nextIndex = (activeIndex + 1) % imageElements.length;
  
      activeElement.classList.remove('active');
      (imageElements[nextIndex] as HTMLElement).classList.add('active');
    }, 3000);
  }


  stopCarousel(): void {
    clearInterval(this.intervalId);
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

}

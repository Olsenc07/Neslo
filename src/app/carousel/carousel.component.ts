import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() route!: 'Residential' | 'Showcase' | 'NesloTeam';
  @Input() heading: string = '';
  images: string[] = [];

  constructor(private http: HttpClient,
    protected imagesService: ImagesService,
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.imagesService.fetchImages(this.route).subscribe({
      next: (images: string[]) => {
        this.images = images;
      },
      error: error => console.error('Error fetching images:', error)
    });
  }
}

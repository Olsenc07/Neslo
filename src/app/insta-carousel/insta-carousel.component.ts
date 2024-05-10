import { Component } from '@angular/core';
import { InstagramService } from '../services/instagram.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-insta-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './insta-carousel.component.html',
  styleUrl: './insta-carousel.component.scss'
})
export class InstaCarouselComponent {
  instagramPosts: any[] = [];

  constructor(private instagramService: InstagramService) {}

  ngOnInit() {
    this.instagramService.getInstagramMedia().subscribe({
      next: (data) => {  // 'data' needs to be defined as a parameter of the function
        this.instagramPosts = data.data; // Adjust this based on your actual API response structure
      },
      error: (error) => {
        console.error('Error fetching Instagram posts:', error);
      }
    });
  }
}

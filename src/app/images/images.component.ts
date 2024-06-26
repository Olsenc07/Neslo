import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [NgClass, NgxSkeletonLoaderModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
  providers: [ImagesService] 
})

export class ImagesComponent {
  tempImages: { secure_url: string; public_id: string; }[] = [];
  images: { secure_url: string; public_id: string; }[] = [];
  imgCount = Math.max(this.tempImages.length, 10);

  private imagesReady = signal<boolean>(false);
  ready = computed(() => this.imagesReady());

  constructor(private route: ActivatedRoute, 
    protected imagesService: ImagesService) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(async params => {
        const idParam = params.get('folder');
        const indexParam = params.get('index') || '0';
        const targetIndex = parseInt(indexParam, 10); // Use 10 as radix for parseInt
    
        this.imagesReady.set(false);
    
        if (idParam === 'Residential') {
          this.tempImages = this.imagesService.getResidentialImages();
        } else if (idParam === 'Showcase') {
          this.tempImages = this.imagesService.getShowcaseImages();
        } else if (idParam === 'Windows') {
          this.tempImages = this.imagesService.getWindowsImages();
        } else if (idParam === 'Specific') {
          this.tempImages = this.imagesService.getSpecificImages();
        } else if (idParam === 'Handles') {
          this.tempImages = this.imagesService.getHandlesImages();
        }
    
        if (this.tempImages.length > 0) {
          const [targetImage] = this.tempImages.splice(targetIndex, 1);
          this.images = [targetImage, ...this.tempImages];
          this.imagesReady.set(true);
        }
      });
    }
    
}

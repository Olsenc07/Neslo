import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../services/images.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [NgClass, NgxSkeletonLoaderModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
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
        const targetIndex = parseInt(indexParam, this.imgCount);
  
        this.imagesReady.set(false);
        
        if (idParam === 'Residential') {
          this.tempImages = this.imagesService.getResidentialImages();
        } else if (idParam === 'Showcase') {
          this.tempImages = this.imagesService.getShowcaseImages();
        }
        const [targetImage] = this.tempImages.splice(targetIndex, 1);
            this.images = [targetImage, ...this.tempImages]; 
            this.imagesReady.set(true);
      });
    }
}

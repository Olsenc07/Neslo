import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, debounceTime } from 'rxjs';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [NgClass],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})

export class ImagesComponent {
  images: { secure_url: string; public_id: string; }[] = [];
  indexParam: string | null = '0';

  constructor(private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
       this.indexParam = params.get('index');
      if (idParam) { // Check if idParam is not null
        this.images = JSON.parse(idParam);
      } else {
        // Handle the case where id is missing (e.g., display an error message)
        console.error(`Image can't be displayed.`);
        this.router.navigate(['/']);
      }
    });
  }


 
}

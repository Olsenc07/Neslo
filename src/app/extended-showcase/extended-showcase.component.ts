import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-extended-showcase',
  standalone: true,
  imports: [
    CarouselComponent,
    MatDividerModule
  ],
  templateUrl: './extended-showcase.component.html',
  styleUrl: './extended-showcase.component.scss'
})
export class ExtendedShowcaseComponent {}
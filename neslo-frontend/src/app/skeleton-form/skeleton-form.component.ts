import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton-form',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './skeleton-form.component.html',
  styleUrl: './skeleton-form.component.scss'
})
export class SkeletonFormComponent {

}

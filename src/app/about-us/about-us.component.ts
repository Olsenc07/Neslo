import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  faInstagramSquare = faInstagramSquare;
  @Input() title!: string;
  @Input() img!: {img: string, alt: string };
  @Input() intro!: SafeHtml;
  @Input() tel!: string;
  @Input() email!: string;
  @Input() fax?: string;
  @Input() message!: SafeHtml;

constructor(){}
}
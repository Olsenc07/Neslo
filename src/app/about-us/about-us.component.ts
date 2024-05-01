import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  @Input() title!: string;
  @Input() img!: {img: string, alt: string };
  @Input() intro!: SafeHtml;
  @Input() tel!: string;
  @Input() email!: string;
  @Input() fax?: string;
  @Input() message!: SafeHtml;

constructor(){}
}

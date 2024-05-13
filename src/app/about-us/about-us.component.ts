import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  @Input() title!: string;
  @Input() customColor!: boolean;
  @Input() img!: {img: string, alt: string };
  @Input() intro!: SafeHtml;
  @Input() tel!: string;
  @Input() email!: string;
  @Input() fax?: string;
  @Input() message!: SafeHtml;

constructor(){}
}
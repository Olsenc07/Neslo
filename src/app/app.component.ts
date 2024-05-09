import { Component, HostListener } from '@angular/core';
import { RouterModule, TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './services/title-strategy.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class AppComponent {
  title: string = 'Neslo';

  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.scrollY;
    const scrollTopThreshold = 100;
    this.showScrollButton = yOffset > scrollTopThreshold;
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}

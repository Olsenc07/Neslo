import { Component } from '@angular/core';
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
}

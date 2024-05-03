import { Component } from '@angular/core';
import { RouterModule, TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './services/title-strategy.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, MatProgressBarModule],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class AppComponent {
  title: string = 'Neslo';
}

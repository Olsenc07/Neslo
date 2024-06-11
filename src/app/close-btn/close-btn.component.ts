import { MatIconModule } from '@angular/material/icon';
import  { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-close-btn',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './close-btn.component.html',
  styleUrl: './close-btn.component.scss'
})
export class CloseBtnComponent {
@Output() close = new EventEmitter<void>();

emit(): void {
  this.close.emit();
}
}

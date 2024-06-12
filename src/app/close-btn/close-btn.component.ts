import { MatIconModule } from '@angular/material/icon';
import  { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-close-btn',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  templateUrl: './close-btn.component.html',
  styleUrl: './close-btn.component.scss'
})
export class CloseBtnComponent {
@Input() style: boolean = false;
@Output() close = new EventEmitter<void>();

emit(): void {
  this.close.emit();
}
}

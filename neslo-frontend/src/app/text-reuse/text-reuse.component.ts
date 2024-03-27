import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-text-reuse',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './text-reuse.component.html',
  styleUrl: './text-reuse.component.scss'
})
export class TextReuseComponent {
@Input() label!: string;
@Input() intro?: string;
@Input() types: 'text' | 'tel' | 'date' | 'email' = 'text';
input: FormControl<string | null> = new FormControl<string | null>('');
@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

constructor(){}

reset(): void {
  this.input.reset();
  this.valueChange.emit('');
}
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import  { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-text-reuse',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule,  
    MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './text-reuse.component.html',
  styleUrl: './text-reuse.component.scss'
})
export class TextReuseComponent {
@Input() intValue?: string;
@Input() intro!: string;
@Input() types: 'text' | 'tel' | 'email' = 'text';
input: FormControl<string | null> = new FormControl<string | null>('');
@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

}

import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import  { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-reuse',
  standalone: true,
  imports: [
    MatDatepickerModule, MatButtonModule, MatFormFieldModule,
    MatIconModule, MatInputModule, ReactiveFormsModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './date-reuse.component.html',
  styleUrl: './../text-reuse/text-reuse.component.scss'
})
export class DateReuseComponent {
  @Input() intro!: string;
  @Input() intValue?: string;
  @Input() value?: string;
  input: FormControl<string | null> = new FormControl<string | null>('');
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef){
    this.input.valueChanges.subscribe((value: string | null) => {
      this.valueChange.emit(value || ''); 
    });
  }

  ngOnChanges(): void {
    this.input.setValue(this.value || '', { emitEvent: false });
    this.cdr.detectChanges();
  }
}

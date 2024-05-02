import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import  { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-text-reuse',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule,  
  MatFormFieldModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './text-reuse.component.html',
  styleUrl: './text-reuse.component.scss'
})
export class TextReuseComponent {
@Input() need?:boolean = true;
@Input() intValue?: string;
@Input() intro!: string;
@Input() value?: string;
@Input() types: 'text' | 'tel' | 'email' = 'text';
input: FormControl<string | null> = new FormControl<string | null>('');
@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

constructor(private cdr: ChangeDetectorRef) {
  this.input.valueChanges.subscribe((value: string | null) => {
    this.valueChange.emit(value || ''); 
  });
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['types'] || changes['intValue'] || changes['value']) {
    this.updateValidatorsAndValue();
  }
  }

  updateValidatorsAndValue(): void {
    const validators = [Validators.required]; 
    if (this.types === 'email') {
      validators.push(Validators.email);
    } 
    this.input.setValidators(validators);
    this.input.updateValueAndValidity();

    if (!this.input.value || this.input.pristine) {
      this.input.setValue(this.intValue || this.value || '', { emitEvent: false });
      this.cdr.detectChanges();
    }

}}
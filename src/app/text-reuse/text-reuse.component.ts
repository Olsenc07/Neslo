import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import  { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HideFocusService } from '../services/hide-focus.service';
import { OrientationService } from '../services/orientation.service';
import { HideFocusDirective } from '../directives/hide-focus.directive';

@Component({
  selector: 'app-text-reuse',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule,  
    HideFocusDirective, MatFormFieldModule, ReactiveFormsModule],
  providers: [HideFocusService, OrientationService, MatIconRegistry],
  templateUrl: './text-reuse.component.html',
  styleUrl: './text-reuse.component.scss'
})
export class TextReuseComponent {
@Input() need?:boolean = false;
@Input() intValue?: string;
@Input() intro!: string;
@Input() value?: string;
@Input() types: 'text' | 'tel' | 'email' = 'text';
input: FormControl<string | null> = new FormControl<string | null>('');
private unsubscribe$: Subject<void> = new Subject<void>();
@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

constructor(protected hideFocusService: HideFocusService,
  protected orientationService: OrientationService) {
  this.input.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    takeUntil(this.unsubscribe$)   
  )
  .subscribe((value: string | null) => {
    this.valueChange.emit(value || ''); 
  });
}

focusChanged(isFocused: boolean): void {
  if(this.orientationService.screen()){
  this.hideFocusService.setInputFocus(isFocused);
  }
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['types'] || changes['intValue'] || changes['value']) {
    this.updateValidatorsAndValue();
  }
  }

  updateValidatorsAndValue(): void {
    const validators: ValidatorFn[] = [];
    if (this.need) {
      validators.push(Validators.required);
    }
    if (this.types === 'email') {
      validators.push(Validators.email);
    }
    this.input.setValidators(validators);
    this.input.updateValueAndValidity();
  }
  
ngOnDestroy(): void {
  this.unsubscribe$.next(); 
  this.unsubscribe$.complete(); 
}
}
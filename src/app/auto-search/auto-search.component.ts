import {
  MatAutocomplete,
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BoldPipe } from 'src/app/pipes/bold.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatestWith, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-auto-search',
  standalone: true,
  imports: [
    AsyncPipe,
    BoldPipe,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './auto-search.component.html',
  styleUrl: './auto-search.component.scss'
})
export class AutoSearchComponent implements OnChanges {
  @Input() filler!: string;
  @Input() intro!: string;
  @Input() value?: string;
  @Input() initialList: string[] = [''];
  input: FormControl<string | null> = new FormControl<string | null>('');
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  auto: MatAutocomplete | undefined;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  filteredList$: Observable<string[]> = new Observable<string[]>();

  constructor(private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void {
    this.initializeFilteredList();
    this.input.setValue(this.value || '', { emitEvent: false }); // Initialize with input value if available
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && changes['value'].currentValue !== changes['value'].previousValue) {
      console.log('chazz', this.value);
      this.input.setValue(this.value || '', { emitEvent: false });
      this.cdr.detectChanges();
    }
    if (changes['initialList']) {
      this.initializeFilteredList(); // Reinitialize the filtered list if the initial list changes
    }
  }

  initializeFilteredList(): void {
    const initialList$ = of(this.initialList);
    this.filteredList$ = this.input.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(''),
      combineLatestWith(initialList$),
      map(([typed, list]) => {
        if(typed){
        return list.filter(item => typed || item.toLowerCase().includes(typed.toLowerCase()))
        } else {
          return list
        }
      })
    );
  }

  emitSelectedChange(selectedValue: string): void {
    this.valueChange.emit(selectedValue);
  }
}
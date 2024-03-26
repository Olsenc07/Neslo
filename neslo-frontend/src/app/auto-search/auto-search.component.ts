import {
  MatAutocomplete,
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BoldPipe } from 'src/app/pipes/bold.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
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
    ReactiveFormsModule
  ],
  templateUrl: './auto-search.component.html',
  styleUrl: './auto-search.component.scss'
})
export class AutoSearchComponent implements OnChanges {
  @Input() filler!: string;
  @Input() label!: string;
  @Input() initialList: string[] = [''];
  input: FormControl<string | null> = new FormControl<string | null>('');
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  auto: MatAutocomplete | undefined;
  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();
  filteredList$: Observable<string[]> = new Observable<string[]>();

  ngOnChanges(): void {
    const initialList$ = of(this.initialList);

    this.filteredList$ = this.input.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(''),
      combineLatestWith(initialList$),
      map(([typed, list]) => {
        if(typed){
        return list.filter(item => item && item.toLowerCase().includes(typed.toLowerCase()));
        } else {
          return list
        }
      })
    );
  }
  emitSelectedChange(selectedValue: string): void {
    this.selectedChange.emit(selectedValue);
  }

}

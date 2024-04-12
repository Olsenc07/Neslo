import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Grid } from '../interfaces/grid';
import  { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-grid-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatSelectModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.scss'
})
export class GridFormComponent implements OnDestroy {
  doorConfigForm!: FormGroup;
  @Output() sendGrid: EventEmitter<Grid[]> = new EventEmitter<Grid[]>();
  private unsubscribe$: Subject<void> = new Subject<void>();
  
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.doorConfigForm = this.fb.group({
      rows: this.fb.array([])
    });
    this.doorConfigForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$) // This will unsubscribe when unsubscribe$ emits
      )
      .subscribe((value) => {
        this.sendGrid.emit(value.rows);
      }); 
        this.addRow();

  }
  
  get rows(): FormArray {
    return this.doorConfigForm.get('rows') as FormArray;
  }

  addRow(): void {
    const rowForm = this.fb.group({
      roomLabel: '',
      width: '',
      height: '',
      configuration0: '',
      configuration1: '',
      left: '',
      right: '',
      activePanel: ''
    });
    this.rows.push(rowForm);
  }
  removeRow(index: number): void {
    if (this.rows.length > 1) { // Prevent removing all rows
      this.rows.removeAt(index);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
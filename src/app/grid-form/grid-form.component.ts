import { Component, EventEmitter, Output, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Grid } from '../interfaces/grid';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-grid-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatIconModule, MatSelectModule, MatCardModule,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.scss',
})
export class GridFormComponent implements OnDestroy {
  doorConfigForm!: FormGroup;
  @Input() gridForm!: FormArray;
  @Output() sendGrid: EventEmitter<Grid[]> = new EventEmitter<Grid[]>();
  private unsubscribe$: Subject<void> = new Subject<void>();
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addRow();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridForm'] && changes['gridForm'].currentValue) {
      this.initializeForm();
    }
  }

initializeForm(): void {
  // Ensure doorConfigForm is initialized.
  if (!this.doorConfigForm) {
    this.doorConfigForm = this.fb.group({
      rows: this.fb.array([])
    });
  }

  const rowsArray = this.doorConfigForm.get('rows') as FormArray;
  // Clear existing rows.
  rowsArray.clear();

  // Populate the form with the data from gridForm input.
  this.gridForm.controls.forEach(control => {
    rowsArray.push(control);
  });

  // Set up the value changes subscription.
  this.doorConfigForm.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged(), 
    takeUntil(this.unsubscribe$))
    .subscribe(value => {
      this.sendGrid.emit(value.rows);
    });
}

  get rows(): FormArray {
    return this.doorConfigForm.get('rows') as FormArray;
  }

  addRow(gridData?: Grid): void {
    const rowForm = this.fb.group({
      roomLabel: [gridData?.roomLabel || ''],
      width: [gridData?.width || ''],
      height: [gridData?.height || ''],
      configuration0: [gridData?.configuration0 || ''],
      configuration1: [gridData?.configuration1 || ''],
      left: [gridData?.left || ''],
      right: [gridData?.right || ''],
      activePanel: [gridData?.activePanel || ''],
    });
    this.rows.push(rowForm);
  }
  
  removeRow(index: number): void {
    if (this.rows.length > 1) { 
      this.rows.removeAt(index);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
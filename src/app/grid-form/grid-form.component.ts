import { Component, EventEmitter, Output, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Grid } from '../interfaces/grid';
import  { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-grid-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatSelectModule, MatCardModule,
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
  // PDf Creation 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridForm'] && this.gridForm) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.doorConfigForm = this.fb.group({
      rows: this.fb.array([])
    });

    // Populate the form with existing data
    this.gridForm.controls.forEach(gridItem => {
      this.addRow(gridItem.value);
    });

    this.doorConfigForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.sendGrid.emit(value.rows);
    });
  }
  // Normal
  get rows(): FormArray {
    return this.doorConfigForm.get('rows') as FormArray;
  }

  addRow(gridData?: any): void {
    const rowForm = this.fb.group({
      roomLabel: gridData ? gridData.roomLabel : '',
      width: gridData ? gridData.width : '',
      height: gridData ? gridData.height : '',
      configuration0: gridData ? gridData.configuration0 : '',
      configuration1: gridData ? gridData.configuration1 : '',
      left: gridData ? gridData.left : '',
      right: gridData ? gridData.right : '',
      activePanel: gridData ? gridData.activePanel : ''
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
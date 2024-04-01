import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-grid-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.scss'
})
export class GridFormComponent implements OnInit {
  doorConfigForm: FormGroup;

@Output() sendGrid: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
    this.doorConfigForm = this.fb.group({
      rows: this.fb.array([])
    });
  }
  ngOnInit(): void {
      // do this without sub!!!!
  
    this.doorConfigForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      // .subscribe((value) => {
        this.sendGrid.emit(value);
      });

    // Initialize with one row
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
      configuration: '',
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

  onSubmit(): void {
// emeit on doorConfigForm value changes in 
  }

}
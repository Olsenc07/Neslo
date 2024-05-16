import { Component, Directive, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Directive({
  selector: '[appCloseDialog]',
  standalone: true
})
export class CloseDialogDirective {
  constructor(private dialogRef: MatDialogRef<Component>) { }

  @HostListener('click') onClick() {
    this.dialogRef.close();
  }
}
import { Directive, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StandardConfigSizeComponent } from '../standard-config-size/standard-config-size.component';

@Directive({
  selector: '[appCloseDialog]',
  standalone: true
})
export class CloseDialogDirective {
  constructor(private dialogRef: MatDialogRef<StandardConfigSizeComponent>) {}

  @HostListener('click') onClick() {
    this.dialogRef.close();
  }
}
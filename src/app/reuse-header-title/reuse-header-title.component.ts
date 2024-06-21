import { Component, Input } from "@angular/core";
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CloseDialogDirective } from '../directives/close-dialog.directive';

@Component({
    selector: 'app-header-title',
    standalone: true,
    imports: [CloseDialogDirective, MatButtonModule, NgClass],
    templateUrl: './reuse-header-title.component.html',
    styleUrl: './reuse-header-title.component.scss'
  })
  
  export class ReuseHeaderTitleComponent {
    @Input() title!: string;
    @Input() sticky?: boolean = false;

    constructor(){

    }
  }
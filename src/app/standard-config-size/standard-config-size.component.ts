import { AfterViewInit, Component, Inject, OnDestroy} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { CloseDialogDirective } from '../directives/close-dialog.directive';

@Component({
  selector: 'app-standard-config-size',
  standalone: true,
  imports: [ MatDividerModule, MatIconModule, MatDialogModule,
    MatButtonModule, MatTableModule, CloseDialogDirective],
  templateUrl: './standard-config-size.component.html',
  styleUrl: './standard-config-size.component.scss',
})
export class StandardConfigSizeComponent implements AfterViewInit, OnDestroy{
  columnsName: string[] = ['config', 'symbol', 'fd72_73', 'fd27'];
  idMatch: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public dialogRef: MatDialogRef<StandardConfigSizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idFocus: string }) {

    }

    // scroll isn't working
ngAfterViewInit(): void {
  this.onScroll(this.data.idFocus);
  
}

    onScroll(id: string) {
    this.idMatch = id;
    console.log('woooo', this.idMatch);
    if (isPlatformBrowser(this.platformId)) {
        document.getElementById('focusedId')?.scrollIntoView({ behavior: 'smooth' });
      }
  }

  readonly tableData: {
    id: string,
    config: string;
    symbol: string;
    fd72_73: string;
    fd27: string;
}[] = [
      { id: '1', config: '1 + 0', symbol: '_/', fd72_73: '40 1/4', fd27: '40 3/8' },
      { id: '2', config: '1 + 1', symbol: `_/ \\_`, fd72_73: '74 1/8', fd27: '74 3/4' },
      { id: '3', config: '2 + 0', symbol: '_^ _', fd72_73: '72 15/16', fd27: '73 9/16' },
      { id: '4', config: '2 + 2', symbol: '_^ ^_', fd72_73: '145 1/2', fd27: '-' },
      { id: '5', config: '3 + 0', symbol: '_/\\/ _', fd72_73: '108', fd27: '109 1/16' },
      { id: '6', config: '3 + 1', symbol: '_/\\/ \\_', fd72_73: '141 7/8', fd27: '143 7/16' },
      { id: '7', config: '3 + 3', symbol: '_/\\/ \/\\_', fd72_73: '209 5/8', fd27: '-' },
      { id: '8', config: '4 + 0', symbol: '_/\\/\\ _', fd72_73: '140 3/4', fd27: '142 1/4' },
      { id: '9', config: '4 + 4', symbol: '_/\\/\\ /\\/\\_', fd72_73: '277 1/8', fd27: '-' },
      { id: '10', config: '5 + 0', symbol: '_/\\/\\/ _', fd72_73: '175 3/4', fd27: '177 3/4' },
      { id: '11', config: '5 + 1', symbol: '_/\\/\\/ _', fd72_73: '209 5/8', fd27: '' },
      { id: '12', config: '5 + 3', symbol: '_/\\/\\/ \/\\_', fd72_73: '277 1/2', fd27: '-' },
      { id: '13', config: '5 + 5', symbol: '_/\\/\\ /\\/\\_', fd72_73: '345 1/4', fd27: '-' },
      { id: '14', config: '6 + 0', symbol: '_/\\/\\/\\ _', fd72_73: '208 1/2', fd27: '' },
      { id: '15', config: '6 + 6', symbol: '_/\\/\\/\\ /\\/\\/\\_', fd72_73: '416 3/4', fd27: '-' },
      { id: '16', config: '7 + 0', symbol: '_/\\/\\/\\/ _', fd72_73: '243 1/2', fd27: '-' },
      { id: '17', config: '7 + 1', symbol: '_/\\/\\/\\/ \\_', fd72_73: '277 1/2', fd27: '-' },
      { id: '18', config: '8 + 0', symbol: '_/\\/\\/\\/\\ _', fd72_73: '276 1/4', fd27: '-' },
      { id: '19', config: '9 + 0', symbol: '_/\\/\\/\\/\\/ _', fd72_73: '311 1/4', fd27: '-' },
  ];

  ngOnDestroy(): void {
    this.idMatch = '';
  }
}
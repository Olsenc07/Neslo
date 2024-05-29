import { Component,} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CloseDialogDirective } from '../directives/close-dialog.directive';

@Component({
  selector: 'app-standard-config-size',
  standalone: true,
  imports: [ MatDividerModule, MatIconModule,
    MatButtonModule, MatTableModule, CloseDialogDirective],
  templateUrl: './standard-config-size.component.html',
  styleUrl: './standard-config-size.component.scss',
})
export class StandardConfigSizeComponent {
  columnsName: string[] = ['config', 'symbol', 'fd72_73', 'fd27'];
  constructor() {}

  readonly tableData: {
    config: string;
    symbol: string;
    fd72_73: string;
    fd27: string;
}[] = [
    { config: '1 + 0', symbol: '_/', fd72_73: '40 1/4', fd27: '40 3/8' },
    { config: '1 + 1', symbol: `_/ \\_`, fd72_73: '74 1/8', fd27: '74 3/4' },
    { config: '2 + 0', symbol: '_^ _', fd72_73: '72 15/16', fd27: '73 9/16' },
    { config: '2 + 2', symbol: '_^ ^_', fd72_73: '145 1/2', fd27: '-' },
    { config: '3 + 0', symbol: '_/\\/ _', fd72_73: '108', fd27: '109 1/16' },
    { config: '3 + 1', symbol: '_/\\/ \\_', fd72_73: '141 7/8', fd27: '143 7/16' },
    { config: '3 + 3', symbol: '_/\\/ \/\\_', fd72_73: '209 5/8', fd27: '-' },
    { config: '4 + 0', symbol: '_/\\/\\ _', fd72_73: '140 3/4', fd27: '142 1/4' },
    { config: '4 + 4', symbol: '_/\\/\\ /\\/\\_', fd72_73: '277 1/8', fd27: '-' },
    { config: '5 + 0', symbol: '_/\\/\\/ _', fd72_73: '175 3/4', fd27: '177 3/4' },
    { config: '5 + 1', symbol: '_/\\/\\/ _', fd72_73: '209 5/8', fd27: '' },
    { config: '5 + 3', symbol: '_/\\/\\/ \/\\_', fd72_73: '277 1/2', fd27: '-' },
    { config: '5 + 5', symbol: '_/\\/\\ /\\/\\_', fd72_73: '345 1/4', fd27: '-' },
    { config: '6 + 0', symbol: '_/\\/\\/\\ _', fd72_73: '208 1/2', fd27: '' },
    { config: '6 + 6', symbol: '_/\\/\\/\\ /\\/\\/\\_', fd72_73: '416 3/4', fd27: '-' },
    { config: '7 + 0', symbol: '_/\\/\\/\\/ _', fd72_73: '243 1/2', fd27: '-' },
    { config: '7 + 1', symbol: '_/\\/\\/\\/ \\_', fd72_73: '277 1/2', fd27: '-' },
    { config: '8 + 0', symbol: '_/\\/\\/\\/\\ _', fd72_73: '276 1/4', fd27: '-' },
    { config: '9 + 0', symbol: '_/\\/\\/\\/\\/ _', fd72_73: '311 1/4', fd27: '-' },
  ];
}
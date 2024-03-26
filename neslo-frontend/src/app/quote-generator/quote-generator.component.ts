import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-quote-generator',
  templateUrl: './quote-generator.component.html',
  styleUrls: ['./quote-generator.component.scss'],
  imports: [MatInputModule, MatSelectModule]
})
export class QuoteGeneratorComponent {
  quoteForm: FormGroup = new FormGroup({
    dealerName: new FormControl<string>(''),
    dealerBranch: new FormControl<string>(''),
    contactName: new FormControl<string>(''),
    contactEmail: new FormControl<string>(''),
    contactPhone: new FormControl<string>(''),
    jobName: new FormControl<string>(''),
    jobSiteAddress: new FormControl<string>(''),
    jobCity: new FormControl<string>(''),
    date: new FormControl<string>(''),
    doorModel: new FormControl<string>(''),
    exteriorFinish: new FormControl<string>(''),
    exteriorColor: new FormControl<string>(''),
    interiorFinish: new FormControl<string>(''),
    interiorColor: new FormControl<string>(''),
    glass: new FormControl<string>(''),
    handleColor: new FormControl<string>(''),
    additionalNotes: new FormControl<string>(''),

  })
  

  doorModel: string[] = [

  ]
  exteriorFinish: string[] = [
    'Anotized',
    'Custom Color',
    'Std Color (White/Black)',
    'Std Color (White/Black)',
    'FD27 (Black Ext)',
    'FD27 (White Ext)'
  ]
  interionFinish: string[] = [
    'FD27 / Black Int',
    'FD27 / White Int',
    'FD72 / Same as Exterior',
    'FD73 / VG Fir / Custom Stain & Clear'
  ]
  glass: string[] = [
    'Cust 270 / Clr',
    'Stk 366 / Clear',
    'Stk 366 / i89',
    'Cust Clr / Clr',
    'Cust 270 / Clr',
    'Cust 180 / i89',
    'Cust 270 / i89',
    'Cust 366 / i89',
    'Tri 270 / Clr / 270',
    'Tri 180 / 180 / i89',
    'Tri 270 / i80 / i89',


  ]
  constructor() {}
  
  generatePDF(): void {
    // const doc = new jsPDF();
    // doc.save('quote.pdf');
  }
}

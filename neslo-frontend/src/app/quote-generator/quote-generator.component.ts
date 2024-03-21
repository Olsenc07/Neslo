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
  
  
  constructor() {}
  
  generatePDF(): void {
    // const doc = new jsPDF();
    // doc.save('quote.pdf');
  }
}

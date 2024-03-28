import { AutoSearchComponent } from 'src/app/auto-search/auto-search.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TextReuseComponent } from 'src/app/text-reuse/text-reuse.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import  { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  standalone: true,
  selector: 'app-quote-generator',
  templateUrl: './quote-generator.component.html',
  styleUrls: ['./quote-generator.component.scss'],
  imports: [AutoSearchComponent, MatInputModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, ReactiveFormsModule,
     MatSelectModule, TextReuseComponent]
})
export class QuoteGeneratorComponent {
  quoteForm: FormGroup = new FormGroup({
    dealerName: new FormControl<string>('Erik Olsen'),
    dealerBranch: new FormControl<string>(''),
    contactName: new FormControl<string>(''),
    contactEmail: new FormControl<string>('redman68&#64;live.ca'),
    contactPhone: new FormControl<string>('403 994 - 1202'),
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
    additionalNotes: new FormControl<string>('')
  })

  constructor(private router: Router){}
  
  returnHome(): void {
    this.router.navigate(['/home']);
  }
  updateField(fieldName: string, value: string): void {
    this.quoteForm.get(fieldName)?.setValue(value);
  }
 
  generatePDF(): void {
    const doc = new jsPDF();
  
    // Basic text layout example
    doc.text('Quote Form', 10, 10);
    doc.text(`Dealer Name: ${this.quoteForm.value.dealerName}`, 10, 20);
    doc.text(`Contact Email: ${this.quoteForm.value.contactEmail}`, 10, 30);
    doc.text(`Contact Phone: ${this.quoteForm.value.contactPhone}`, 10, 40);

    // add the colum chart
    // Attach two other pages below it 
    // Save the PDF
    doc.save('quote.pdf');
  }
  

  doorModel: string[] = [
    'FD27 PVCU'
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
      'Tri 270 / i80 / i89'
    ]
}

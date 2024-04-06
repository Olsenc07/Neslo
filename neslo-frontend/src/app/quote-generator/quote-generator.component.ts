import { AutoSearchComponent } from 'src/app/auto-search/auto-search.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TextReuseComponent } from 'src/app/text-reuse/text-reuse.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import  { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactDialogComponent } from '../contact-form/contact-dialog/contact-dialog.component';
import { GridFormComponent } from 'src/app/grid-form/grid-form.component';
import { SkeletonFormFillComponent } from 'src/app/contact-form/skeleton-form-fill/skeleton-form-fill.component';
import { Grid } from '../interfaces/grid'
import { MatDividerModule } from '@angular/material/divider';
import { OrientationService } from '../services/orientation.service';

@Component({
  standalone: true,
  selector: 'app-quote-generator',
  templateUrl: './quote-generator.component.html',
  styleUrls: ['./quote-generator.component.scss'],
  imports: [AutoSearchComponent, ContactDialogComponent, 
    MatInputModule, MatButtonModule, GridFormComponent, MatDividerModule,
    MatIconModule, MatFormFieldModule, ReactiveFormsModule,
     MatSelectModule, TextReuseComponent, SkeletonFormFillComponent]
})
export class QuoteGeneratorComponent {
  quoteForm: FormGroup = new FormGroup({
    dealerName: new FormControl<string>('Erik Olsen', [
      Validators.required]),
    dealerBranch: new FormControl<string>(''),
    contactName: new FormControl<string>(''),
    contactEmail: new FormControl<string>('sales@foldingslidingdoors.ca', [
      Validators.required]),
    contactPhone: new FormControl<string>('403 994 - 1202', [
      Validators.required]),
    jobName: new FormControl<string>(''),
    jobSiteAddress: new FormControl<string>('', [
      Validators.required]),
    jobCity: new FormControl<string>('', [
      Validators.required]),
    date: new FormControl<string>('', [
      Validators.required]),
    doorModel: new FormControl<string>('', [
      Validators.required]),
    exteriorFinish: new FormControl<string>(''),
    exteriorColor: new FormControl<string>(''),
    interiorFinish: new FormControl<string>(''),
    interiorColor: new FormControl<string>(''),
    glass: new FormControl<string>('', [
      Validators.required]),
    handleColor: new FormControl<string>(''),
    additionalNotes: new FormControl<string>('')
  })

  constructor(private router: Router, private snackBar: MatSnackBar,
    protected orientationService: OrientationService,
    private dialog: MatDialog){}
  
  returnHome(): void {
    this.router.navigate(['/home']);
  }
  updateField(fieldName: string, value: string): void {
    this.quoteForm.get(fieldName)?.setValue(value);
  }
 
  // maybe reduce? and need to add more grids dynamically
  generatePDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(16); // Large font for titles
    doc.text('Folding Sliding Doors Canada Ltd.', 105, 20, { align: 'center' }); // Centered title
    doc.setFontSize(10); // Smaller font for subtitles
    doc.text('105 - 1155 St. Paul Street', 105, 30, { align: 'center' });
    doc.text('Kelowna, BC V1Y 2C6', 105, 35, { align: 'center' });
    doc.text('Ph: 1(250)-448-6418', 105, 40, { align: 'center' });
    // Section titles
    doc.setFontSize(12); // Font size for section titles
    doc.setFont('bold'); // Set font to bold for section titles
    doc.text('Dealer Information', 10, 50);
    doc.text('Job Information', 10, 100);
  
    // Reset font for regular text
    doc.setFont('normal'); // Set font back to normal
    doc.setFontSize(12); // Reset font size for form content
  
    // Basic form layout example
    doc.text(`Dealer Name: ${this.quoteForm.value.dealerName}`, 10, 60);
    doc.text(`Contact Email: ${this.quoteForm.value.contactEmail}`, 10, 70);
    doc.text(`Contact Phone: ${this.quoteForm.value.contactPhone}`, 10, 80);
  
    // Draw lines to separate sections
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 95, 200, 95); // Change coordinates as needed
  
    // More content
    doc.text(`Job name: ${this.quoteForm.value.jobName}`, 10, 110);
    doc.text(`Site Address: ${this.quoteForm.value.siteAddress}`, 10, 120);
    doc.text(`City: ${this.quoteForm.value.city}`, 10, 130);
    doc.text(`Date: ${this.quoteForm.value.date}`, 10, 140);
  // Grid
  const pageWidth = doc.internal.pageSize.getWidth();
  // Define starting positions
  const startX = 10;
  const startY = 10;
  const lineSpacing = 7;
  // Draw table headers
  const headers = ['SET #', 'ROOM LABEL', 'ROUGH OPENING', 'CONFIGURATION', 'LEFT', 'RIGHT', 'ACTIVE PANEL'];
  const headerWidths = [20, 30, 40, 50, 20, 20, 30]; // Width of each column
  let currentX = startX;

  doc.setFontSize(10);
  headers.forEach((header, index) => {
    doc.text(header, currentX, startY);
    currentX += headerWidths[index];
  });

  // Draw a line below headers
  doc.line(startX, startY + 3, pageWidth - startX, startY + 3);

  // Add content for each row
  const data = [
    ['1', 'Living Room', '120x240', '2+2+1', '0', '0', 'Right']
    // Add more rows as needed
  ];

  let currentY = startY + 6;

  data.forEach((row, rowIndex) => {
    currentX = startX;
    row.forEach((text, index) => {
      // Add a text field or content for each cell
      doc.text(text, currentX, currentY + (rowIndex * lineSpacing));
      currentX += headerWidths[index];
    });

    // Optionally, add a line separator for each row
    currentY += lineSpacing;
    doc.line(startX, currentY + 3, pageWidth - startX, currentY + 3);
  });

  
    // Save the PDF
    doc.save('quote.pdf');
  }
  
  
contactForm(): void {
  const dialogRef = this.dialog.open(ContactDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'send') {
    const snackBarRef = this.snackBar.open(
      "Your message has been sent to sales@foldingslidingdoors.ca",
      "We will get back to you shortly.",
      {
        duration: 3500
      }
    );
      }
      // handle send failure
  });
}

grid(values: Grid[]): void {
console.log('grid list', values);
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

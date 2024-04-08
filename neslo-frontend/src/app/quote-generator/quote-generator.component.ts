import { AutoSearchComponent } from 'src/app/auto-search/auto-search.component';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TextReuseComponent } from 'src/app/text-reuse/text-reuse.component';
import { DateReuseComponent } from 'src/app/date-reuse/date-reuse.component';

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
import html2canvas from 'html2canvas';

@Component({
  standalone: true,
  selector: 'app-quote-generator',
  templateUrl: './quote-generator.component.html',
  styleUrls: ['./quote-generator.component.scss'],
  imports: [AutoSearchComponent, ContactDialogComponent, 
    MatInputModule, MatButtonModule, GridFormComponent, MatDividerModule,
    MatIconModule, MatFormFieldModule, ReactiveFormsModule, DateReuseComponent,
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
  
  generatePDF(): void {
    const formElement = document.getElementById('quote') as HTMLElement;
  
    // if (formElement) {
    //   // Save the current styles to restore later
    //   const originalStyles = formElement.getAttribute('style');
  
    //   // Set styles to enforce desktop layout
    //   formElement.setAttribute('style', 'max-width: none; width: 800px;'); // Set width to your desktop width
  
    //   html2canvas(formElement, {
    //     scale: 1,
    //     logging: true,
    //     useCORS: true,
    //     ignoreElements: (element) => {
    //       // Condition to ignore specific elements
    //       return element.classList.contains('ignore0') || element.classList.contains('ignore1');
    //     },
    //     onclone: (clonedDoc) => {
    //       // This function is called after the document is cloned for rendering
    //       // but before it's rendered. Apply any styles or classes that should
    //       // only affect the cloned document for the screenshot here.
    //       const clonedElement = clonedDoc.getElementById('quote');
    //       if (clonedElement) {
    //         clonedElement.style.width = '1600px'; // Ensure cloned element is also set to desktop width
    //       }
    //     }
    //   }).then((canvas) => {
    //     // Canvas is generated
    //     const imgData = canvas.toDataURL('image/jpeg', 1.0);
  
    //     // Now, generate a PDF with this image
    //     const pdfWidth = 1600; // A4 width in mm
    //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Calculate the height in mm
    //     const doc = new jsPDF({
    //       orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    //       unit: 'mm',
    //       format: [pdfWidth, pdfHeight]
    //     });
  
    //     doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    //     doc.save('quote.pdf');
  
    //     // Restore the original styles
    //     if (originalStyles) {
    //       formElement.setAttribute('style', originalStyles);
    //     } else {
    //       formElement.removeAttribute('style');
    //     }
    //   });
    // } else {
    //   console.error('Element not found');
    // }
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

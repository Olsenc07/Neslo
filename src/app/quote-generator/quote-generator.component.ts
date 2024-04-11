import { AutoSearchComponent } from 'src/app/auto-search/auto-search.component';
import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TextReuseComponent } from 'src/app/text-reuse/text-reuse.component';
import { DateReuseComponent } from 'src/app/date-reuse/date-reuse.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import  { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactDialogComponent } from '../contact-form/contact-dialog/contact-dialog.component';
import { GridFormComponent } from 'src/app/grid-form/grid-form.component';
import { SkeletonFormFillComponent } from 'src/app/contact-form/skeleton-form-fill/skeleton-form-fill.component';
import { Grid } from '../interfaces/grid'
import { MatDividerModule } from '@angular/material/divider';
import { OrientationService } from '../services/orientation.service';
import { PdfService } from '../services/pdf.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Title } from '@angular/platform-browser'
import { TitleStrategy } from '@angular/router'
import { CustomTitleStrategy } from './../services/title-strategy.service';

@Component({
  standalone: true,
  selector: 'app-quote-generator',
  templateUrl: './quote-generator.component.html',
  styleUrls: ['./quote-generator.component.scss'],
  imports: [AutoSearchComponent, ContactDialogComponent, 
    MatInputModule, MatButtonModule, GridFormComponent, MatDividerModule,
    MatIconModule, MatFormFieldModule, ReactiveFormsModule, DateReuseComponent,
     MatSelectModule, TextReuseComponent, SkeletonFormFillComponent],
     providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
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
  });

  gridFormArray: FormArray = new FormArray<FormGroup>([]);

  constructor(private router: Router, private snackBar: MatSnackBar,
    private title:Title,
    protected orientationService: OrientationService, 
   @Inject(PLATFORM_ID) private platformId: Object,
    private pdfService: PdfService,
    private dialog: MatDialog){
      this.title.setTitle('Neslo | Quote')
    }
  
  returnHome(): void {
    this.router.navigate(['/home']);
  }
  updateField(fieldName: string, value: string): void {
    this.quoteForm.get(fieldName)?.setValue(value);
  }
  grid(values: Grid[]): void {  
    if (isPlatformBrowser(this.platformId)) {
    values.forEach((gridRow: Grid) => {
      const rowGroup = new FormGroup({
        roomLabel: new FormControl(gridRow.roomLabel),
        width: new FormControl(gridRow.width),
        height: new FormControl(gridRow.height),
        configuration0: new FormControl(gridRow.configuration0),
        configuration1: new FormControl(gridRow.configuration1),
        left: new FormControl(gridRow.left),
        right: new FormControl(gridRow.right),
        activePanel: new FormControl(gridRow.activePanel),
      });
      this.gridFormArray.push(rowGroup); 
    });
  }
  }

  generatePDF(): void {
    if (isPlatformBrowser(this.platformId)) {
    const finalFormData = {
      ...this.quoteForm.value, 
      grid: this.gridFormArray.value 
    };
    // Send the combined data to the backend using the PDF service
    this.pdfService.generatePdf(finalFormData).subscribe({
      next: (pdfBlob: any) => {
        console.log('blobbb', pdfBlob)
       
        this.snackBar.open('PDF has been generated and downloaded.', 'Close', {
          duration: 3000
        });
      },
      error: (error: any) => {
        console.error('PDF generator failed:', error);
        this.snackBar.open('Error generating pdf. Please try again.', 'Close', {
          duration: 3000
        });
      },
      complete: () => {
        console.log('PDF generation process is complete.');
      }
  });
      }
  }



   // const blobUrl = window.URL.createObjectURL(pdfBlob);
        // const link = document.createElement('a');
        // link.href = blobUrl;
        // link.download = 'FSD_Neslo_Quote.pdf';
        // link.click();
        // window.URL.revokeObjectURL(link.href);
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

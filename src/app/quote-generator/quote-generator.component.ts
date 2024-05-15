import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser'
import { TitleStrategy } from '@angular/router'
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AutoSearchComponent } from 'src/app/auto-search/auto-search.component';
import { TextReuseComponent } from 'src/app/text-reuse/text-reuse.component';
import { DateReuseComponent } from 'src/app/date-reuse/date-reuse.component';
import { GridFormComponent } from 'src/app/grid-form/grid-form.component';
import { SkeletonFormFillComponent } from 'src/app/contact-form/skeleton-form-fill/skeleton-form-fill.component';

import { Grid } from '../interfaces/grid'

import { PdfService } from '../services/pdf.service';
import { CustomTitleStrategy } from './../services/title-strategy.service';
import { environment } from 'environments/environment';
import { StandardConfigSizeComponent } from "../standard-config-size/standard-config-size.component";
import { OrientationService } from '../services/orientation.service';
import { Subscription } from 'rxjs';
import { HideFocusDirective } from '../directives/hide-focus.directive';

@Component({
    standalone: true,
    selector: 'app-quote-generator',
    templateUrl: './quote-generator.component.html',
    styleUrl: './quote-generator.component.scss',
    providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }],
    imports: [AutoSearchComponent, MatProgressSpinnerModule, MatDialogModule, HideFocusDirective,
        MatInputModule, MatButtonModule, GridFormComponent, MatDividerModule, MatCardModule,
        MatIconModule, MatFormFieldModule, ReactiveFormsModule, DateReuseComponent, MatTooltipModule,
        MatSelectModule, TextReuseComponent, SkeletonFormFillComponent, StandardConfigSizeComponent]
})
export class QuoteGeneratorComponent implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;
  progress: boolean = false;
  state: 'noFocus' | 'focus' = 'noFocus';
  
  // add disabled button on invalid fields
  quoteForm: FormGroup = new FormGroup({
    dealerName: new FormControl<string>('Erik Olsen', [
      Validators.required]),
    dealerBranch: new FormControl<string>(''),
    contactName: new FormControl<string>(''),
    contactEmail: new FormControl<string>('Foldingslidingdoors.ab@gmail.com', [
      Validators.required]),
    contactPhone: new FormControl<string>('(403) 994 - 1202'),
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
  private formChangeSubscription: Subscription | undefined;
  @ViewChild('formElement') formElement!: ElementRef;
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    protected orientationService: OrientationService,
    private title:Title, 
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
   @Inject(PLATFORM_ID) private platformId: Object,
    private pdfService: PdfService){
      // if (isPlatformBrowser(this.platformId)) {
      //   this.loadForm();
      // }
    }

    ngOnInit(): void {
      this.title.setTitle('Neslo | Quote Request');
      // pre set formcontrol values
      // this.quoteForm.valueChanges.subscribe(values => {
      //   console.log('form value', values);
      //   sessionStorage.setItem('quoteFormData', JSON.stringify(values));
      // });
    }
  
    // private loadForm(): void {
    //   try{
    //   const savedForm = sessionStorage.getItem('quoteFormData');
    //   if (savedForm) {
    //     const formData = JSON.parse(savedForm);
    //     console.log('Loaded form data:', formData);
    //     this.quoteForm.patchValue(formData, { emitEvent: false });
    //     this.cdr.detectChanges();
    //   }
    // } catch (e) {
    //   console.error('Error parsing form data', e);
    // }
    // }
    
  updateField(fieldName: string, value: string): void {
    this.quoteForm.get(fieldName)?.setValue(value);
  }
  
  grid(values: Grid[]): void {  
    if (isPlatformBrowser(this.platformId)) {
      this.gridFormArray.clear();
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
  }}
  generatePDF(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.quoteForm.invalid) {
        this.scrollToFirstInvalidControl();
      this.progress = true;
        this.pdfService.generatePdf(this.quoteForm.value, this.gridFormArray.value).subscribe({
      next: (pdfBlob: Blob) => {
        this.downloadPDF(pdfBlob);
        this.snackBar.open('Quote has been generated successfully.', '✅', {
          duration: 3000
        });
      },
      error: (error: any) => {
      this.progress = false;
        console.error('PDF generator failed:', error);
        this.snackBar.open('Error generating PDF. Please try again.', '❌', {
          duration: 3000
        });
      },
      complete: () => {
      this.progress = false;
        console.log('PDF generation process is complete.');
      }
  })
  } else {
    console.warn('PDF generation is not supported on this platform.');
    this.snackBar.open('PDF generation is only available in a browser environment.', '❌', {
      duration: 3000
    });
  }}};
  private scrollToFirstInvalidControl(): void {
    for (const key of Object.keys(this.quoteForm.controls)) {
      if (this.quoteForm.controls[key].invalid) {
        const invalidControl: HTMLElement = this.formElement.nativeElement.querySelector(`#${key}`);
        if (invalidControl) {
          invalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    }
  }
// download 
private downloadPDF(pdfBlob: Blob): void {
  const url = window.URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Neslo-Quote-Request.pdf'; 
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}
// notes
resizeTextarea(event: Event): void {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto'; 
  textarea.style.height = `${textarea.scrollHeight}px`;  
}
contactForm(): void {
  this.router.navigate(['/home']);
  // if (isPlatformBrowser(this.platformId)) {
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: 'smooth'
  //   });
// }
  }
  onHover(isHovered: boolean): void {
      this.state = isHovered ? 'focus' : 'noFocus';
    }
standard(): void {
   this.dialog.open(StandardConfigSizeComponent);
}

ngOnDestroy(): void {
  // Unsubscribe to ensure no memory leaks
  // this.formChangeSubscription?.unsubscribe();
}
  doorModel: string[] = [
    'FD72 TB Aluminum',
    'FD73 Ali-Clad',
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

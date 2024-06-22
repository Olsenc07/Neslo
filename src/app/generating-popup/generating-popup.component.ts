import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription, take, timer } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface QuoteGenerationStatus {
  status: 'generating' | 'processing' | 'complete' | 'error';
  message: string;
}

@Component({
  selector: 'app-generating-popup',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './generating-popup.component.html',
  styleUrl: './generating-popup.component.scss'    

})
export  class GeneratingPopupComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject<void>();
    private statusSubscription: Subscription | undefined;
    status: QuoteGenerationStatus = {
      status: 'generating',
      message: 'Your quote is being generated...'
    };
  
    constructor(
      // public dialogRef: MatDialogRef<GeneratingPopupComponent>,
      // @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  
    ngOnInit(): void {
      // Simulate quote generation process (replace with your actual logic)
      // this.statusSubscription = this.data.quoteGenerationStatus$.pipe(take(1)).subscribe((status: QuoteGenerationStatus) => {
      //   this.status = status;
      // });
      timer(1000).subscribe(() => {
        this.status = {
          status: 'processing',
          message: 'Processing your quote...'
        };
      });

      timer(3000).subscribe(() => {
        this.status = {
          status: 'complete',
          message: 'Quote generated successfully!'
        };
      });

      // Simulate an error scenario
      timer(5000).subscribe(() => {
        this.status = {
          status: 'error',
          message: 'An error occurred while generating your quote.'
        };
      });
    }
  
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      this.statusSubscription?.unsubscribe();
    }
  

}

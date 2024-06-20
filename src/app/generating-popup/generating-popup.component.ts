import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject, Subscription, take, timer } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

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
  styleUrl: './generating-popup.component.scss',
  animations: [
    trigger('quoteStatus', [
      // Initial state (hidden)
      state('void', style({
        opacity: 0,
        transform: 'translateX(-50%)'
      })),

      // Generating state (spinning icon)
      state('generating', style({
        opacity: 1,
        transform: 'translateX(-50%) rotate(0deg)' // Initial rotation
      })),

      // Processing state (progress bar)
      state('processing', style({
        opacity: 1,
        transform: 'translateX(-50%) scale(1)' // No scaling
      })),

      // Complete state (check icon)
      state('complete', style({
        opacity: 1,
        transform: 'translateX(-50%) scale(1.1)' // Slight zoom in
      })),

      // Error state (error icon)
      state('error', style({
        opacity: 1,
        transform: 'translateX(-50%) scale(1.2) rotate(10deg)' // Zoom in and slight rotation
      })),

      // Transitions
      transition('void => generating', [
        style({ opacity: 0, transform: 'translateX(-50%)' }),
        animate('0.3s ease-in-out', style({ opacity: 1, transform: 'translateX(-50%)' }))
      ]),
      transition('generating => processing', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(-50%) scale(1)' })) // Scale down to 1
      ]),
      transition('processing => complete', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(-50%) scale(1.1)' })) // Zoom in slightly
      ]),
      transition('processing => error', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(-50%) scale(1.2) rotate(10deg)' })) // Zoom in and rotate
      ]),
    ])
  ]

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

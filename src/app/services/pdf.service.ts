import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  generatePdf(finalForm: any): Observable<Blob> {

    if (!isPlatformBrowser(this.platformId)) {
        console.log('PDF generation is not supported on the server');
        // Return an observable with a specific value or message
        return of(new Blob(['PDF generation not supported on the server']));
      }
    return this.http.post(this.apiUrl, finalForm, { responseType: 'blob' })
    .pipe(
      catchError((error) => {
        console.error('Error generating PDF:', error);
        return throwError(() => new Error('Error generating PDF'));
      })
    );
  
  }
}

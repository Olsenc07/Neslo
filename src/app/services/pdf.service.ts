import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common'

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
      // Server-side, return a placeholder error or handle accordingly
      console.log('PDF generation is not supported on the server');
      return throwError(() => new Error('PDF generation is not supported on the server'));
    }

    console.log('Executing generatePdf in the browser:', this.apiUrl);
    const url = `${this.apiUrl}/api/pdf`;
    return this.http
      .post<any>(url, finalForm)
      .pipe(
        catchError((error) => {
          console.error('Error generating PDF:', error);
          return throwError(() => new Error('Error generating PDF'));
        })
      );
// , { responseType: 'blob' as 'json' }
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class PdfService {
apiUrl = environment.apiUrl;
private platformId: Object;

  constructor(private http: HttpClient,
  @Inject(PLATFORM_ID) platformId: Object 
  ) { this.platformId = platformId; }

  generatePdf(finalForm: any): Observable<Blob> {
    console.log('service')
    if (isPlatformBrowser(this.platformId)) {
      console.log('Executing generatePdf in the browser');
      const url = `${this.apiUrl}/api/pdf`;
      return this.http.post<Blob>(url, finalForm, { responseType: 'blob' as 'json' });
    } else {
      // Server-side logic or an alternative return for server-side
      console.log('Attempted to execute generatePdf on the server');
      return throwError(() => new Error('generatePdf called from the server-side'));
    }
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PdfService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generatePdf(finalForm: any): Observable<Blob> {
    console.log('hey', `${this.apiUrl}`)
      return this.http.post(`${this.apiUrl}/pdf/generator`, finalForm, { responseType: 'blob' })
      .pipe(
        catchError((error) => {
            console.error('Error generating PDF:', error);
            return throwError(() => new Error('Error generating PDF'));
        })
      );
}
}
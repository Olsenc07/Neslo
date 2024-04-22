import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Form } from '../interfaces/form';
import { Grid } from '../interfaces/grid';


@Injectable({
  providedIn: 'root'
})

export class PdfService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  
  generatePdf(quoteForm: Form, grid: Grid): Observable<Blob> {
    
    console.log('Sending data to:', `${this.apiUrl}/pdf/generator`);
    return this.http.post(`${this.apiUrl}/pdf/generator`, { quoteForm, grid }, 
    {
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        // Log the error or perform other error handling steps
        console.error('Failed to generate PDF:', error);
        return throwError(() => new Error('A friendly error message.'));
      })
    );
  }
  
  }
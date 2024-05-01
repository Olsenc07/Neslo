import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

    apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendEmail(formData: FormData): Observable<any> {
    // You may want to adjust the headers and responseType as needed
    return this.http.post(`${this.apiUrl}/email/emit`, formData).pipe(
      catchError(this.handleError) 
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error.error.message);
    return throwError(() => new Error('Email failed to send. Please try again.'));
  }
}

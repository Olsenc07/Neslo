import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
interface EmailData {
  name: string;
  email: string;
  message: string;
  file: File;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendEmail(formData: EmailData): Observable<object> {
    console.log('service', formData);
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

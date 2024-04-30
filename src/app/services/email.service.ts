import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

    apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendEmail(formData: FormData): Observable<any> {
    // You may want to adjust the headers and responseType as needed
    return this.http.post(`${this.apiUrl}/email/emit`, formData).pipe(
      catchError(this.handleError) // handle errors
    );
  }

  private handleError(error: any) {
    // Error handling logic
    // You can log the error to the console or display it to the user
    console.error('An error occurred:', error.error.message);
    return throwError(() => new Error('A friendly error email message.'));
  }
}

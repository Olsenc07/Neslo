import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class RecaptchaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<boolean> {
    return this.http.get<{ secretKey: string }>(`${this.apiUrl}/security/recaptcha-key`).pipe(
      switchMap(response => {
        const secretKey: string = response.secretKey;
        const url = `https://www.google.com/recaptcha/api/siteverify`;
        const body: string = `secret=${secretKey}&response=${token}`;
        const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post<{ success: boolean }>(url, body, { headers }).pipe(
          map(response => response.success),
          catchError((error) => {
            console.error('Error verifying reCAPTCHA token:', error);
            return throwError(() => new Error('reCAPTCHA verification failed'));
          })
        );
      })
    );
  } 
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import dotenv from 'dotenv';
dotenv.config();

@Injectable({
    providedIn: 'root'
  })
export class RecaptchaService {
  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<boolean> {
    const secretKey =  process.env['recaptchaSecretKey']
    console.log('s key',secretKey)
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
  }
}
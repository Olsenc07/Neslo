import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<boolean> {
    const body = { token };

    return this.http.post<{ success: boolean }>(`${this.apiUrl}/security/verify-recaptcha`, body).pipe(
      map(response => response.success),
      catchError((error) => {
        console.error('Error verifying reCAPTCHA token:', error);
        throw new Error('reCAPTCHA verification failed');
      })
    );
  }
}

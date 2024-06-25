// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { environment } from '../../../environments/environment';

// interface RecaptchaResponse {
//   success: boolean;
//   score: number;
//   action: string;
//   challenge_ts: string;
//   hostname: string;
//   'error-codes'?: string[];
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class RecaptchaService {
//   apiUrl: string = environment.apiUrl;
//   constructor(private http: HttpClient) {}

//   verifyToken(token: string): Observable<RecaptchaResponse> {
//     const body = { token };
//     return this.http.post<RecaptchaResponse>(`${this.apiUrl}/security/verify-recaptcha`, body).pipe(
//       catchError((error) => {
//         console.error('Error verifying reCAPTCHA token:', error);
//         throw new Error('reCAPTCHA verification failed');
//       })
//     );
//   }
// }

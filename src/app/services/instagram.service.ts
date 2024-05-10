import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getInstagramMedia(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/instagram/callback`).pipe(
        catchError(this.handleError) 
      );
  }
  private handleError(error: any) {
    console.error('An error occurred:', error.error.message);
    return throwError(() => new Error('Insta verification failed. Please try again.'));
  }
}

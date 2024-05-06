// // src/app/instagram.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class InstagramService {
//   private apiUrl = 'https://graph.instagram.com/me/media';
//   private fields = 'id,caption,media_type,media_url,permalink';
//   private accessToken = 'YOUR_ACCESS_TOKEN';  // Replace YOUR_ACCESS_TOKEN with your actual Instagram access token

//   constructor(private http: HttpClient) { }

//   getPosts(): Observable<any> {
//     const url = `${this.apiUrl}?fields=${this.fields}&access_token=${this.accessToken}`;
//     return this.http.get(url);
//   }
// }

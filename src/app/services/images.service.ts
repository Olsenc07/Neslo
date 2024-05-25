import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  apiUrl: string = environment.apiUrl;

  // private residentialImages = signal<{ secure_url: string, public_id: string }[]>([]);
  // private showcaseImages = signal<{ secure_url: string, public_id: string }[]>([]);

  // getResidentialImages = computed(() => this.residentialImages());
  // getShowcaseImages = computed(() => this.showcaseImages());

  constructor(private http: HttpClient) {}

  fetchImages(folder: string): Observable<{ secure_url: string, public_id: string }[]> {
    return this.http.get<{ secure_url: string, public_id: string }[]>(`${this.apiUrl}/images/cloudinary?folder=${folder}`).pipe(
      map((images: { secure_url: string, public_id: string }[]) => images.map(image => ({
        secure_url: image.secure_url,
        public_id: image.public_id
      })))
    );
  }
  
}
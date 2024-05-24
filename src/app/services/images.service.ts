import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  apiUrl: string = environment.apiUrl;

  private residentialImages = signal<string[]>([]);
  private showcaseImages = signal<string[]>([]);

  getResidentialImages = computed(() => this.residentialImages());
  getShowcaseImages = computed(() => this.showcaseImages());

  constructor(private http: HttpClient) {}

  fetchImages(folder: 'Residential' | 'Showcase'): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cloudinary?folder=${folder}`).pipe(
      tap((images: string[]) => {
        if (folder === 'Residential') {
          this.residentialImages.set(images);
        } else if (folder === 'Showcase') {
          this.showcaseImages.set(images);
        } 
      })
    );
  }
}
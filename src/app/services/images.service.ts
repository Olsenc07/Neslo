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

  private residentialImages = signal<{ secure_url: string, public_id: string }[]>(this.loadFromCache('ResidentialImages') || []);
  private showcaseImages = signal<{ secure_url: string, public_id: string }[]>(this.loadFromCache('ShowcaseImages') || []);
  private windowsImages = signal<{ secure_url: string, public_id: string }[]>(this.loadFromCache('WindowsImages') || []);
  private specificImages = signal<{ secure_url: string, public_id: string }[]>(this.loadFromCache('SpecificImages') || []);
  private handlesImages = signal<{ secure_url: string, public_id: string }[]>(this.loadFromCache('HandlesImages') || []);

  getResidentialImages = computed(() => this.residentialImages());
  getShowcaseImages = computed(() => this.showcaseImages());
  getWindowsImages = computed(() => this.windowsImages());
  getSpecificImages = computed(() => this.specificImages());
  getHandlesImages = computed(() => this.handlesImages());

  constructor(private http: HttpClient) {}

  fetchImages(folder: string): Observable<{ secure_url: string, public_id: string }[]> {
    return this.http.get<{ secure_url: string, public_id: string }[]>(`${this.apiUrl}/images/cloudinary?folder=${folder}`).pipe(
      map((images: { secure_url: string, public_id: string }[]) => images.map(image => ({
        secure_url: image.secure_url,
        public_id: image.public_id
      }))),
      tap(images => {
        if (folder === 'Residential') {
          this.residentialImages.set(images);
          this.saveToCache('ResidentialImages', images);
        } else if (folder === 'Showcase') {
          this.showcaseImages.set(images);
          this.saveToCache('ShowcaseImages', images);
        } else if (folder === 'Windows') {
          this.windowsImages.set(images);
          this.saveToCache('WindowsImages', images);
        } else if (folder === 'Specific') {
          this.specificImages.set(images);
          this.saveToCache('SpecificImages', images);
        } else if (folder === 'Handles') {
          this.handlesImages.set(images);
          this.saveToCache('HandlesImages', images);
        }
      })
    );
  }
  
  private saveToCache(key: string, data: { secure_url: string; public_id: string }[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

   loadFromCache(key: string): { secure_url: string; public_id: string }[] | null {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }
}
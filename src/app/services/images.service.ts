import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private imageFolder = signal<['']>([''])
  folder = computed<boolean>(() => this.imageFolder())

  constructor() { }

// when in view a specific route is called and fills the array
// make 5 at a time until requested more

}

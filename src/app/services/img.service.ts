import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  private imgState = signal<boolean>(true)
  img = computed<boolean>(() => this.imgState())
  
  constructor() {}

  setImgFocus(focus: boolean): void {
    this.imgState.set(focus)
  }
}

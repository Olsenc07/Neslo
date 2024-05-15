import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HideFocusService {
  private faceState = signal<boolean>(false)
  focused = computed<boolean>(() => this.faceState())

  constructor() {}

  setInputFocus(state: boolean): void {
    this.faceState.set(state);
  }
}

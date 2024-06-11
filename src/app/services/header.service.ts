import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class HeaderService {
    constructor() {}
  
private headerState = signal<boolean>(false)
  headerToggle = computed<boolean>(() => this.headerState())

setHeaderState(state: boolean): void {
  this.headerState.set(state); 
}
  }
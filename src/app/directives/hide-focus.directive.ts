import { Directive, HostListener } from '@angular/core';
import { HideFocusService } from '../services/hide-focus.service';
import { OrientationService } from '../services/orientation.service';

@Directive({
  selector: '[appHideFocus]',
  standalone: true
})
export class HideFocusDirective {

  constructor( protected hideFocusService: HideFocusService,
    protected orientationService: OrientationService) {}

    @HostListener('focus', ['$event.target'])
    onFocus(): void {
      this.focusChanged(true);
    }
  
    @HostListener('blur', ['$event.target'])
    onBlur(): void {
      this.focusChanged(false);
    }

    private focusChanged(isFocused: boolean): void {
    if(this.orientationService.screen()){
    this.hideFocusService.setInputFocus(isFocused);
    }
  }
}
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy} from '@angular/router';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
  
  @Injectable({
    providedIn: 'root'
  })
  export class CustomTitleStrategy extends TitleStrategy {
    constructor(private titleService: Title) {
      super();
    }

    override updateTitle(snapshot: RouterStateSnapshot): void {
      let childRoute: ActivatedRouteSnapshot = snapshot.root;
      while (childRoute.firstChild) {
        childRoute = childRoute.firstChild;
      }

      const title: string = childRoute.data['title'] ?? 'Neslo';
      this.titleService.setTitle(title);
    }
  }
  
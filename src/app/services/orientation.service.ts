import {
    AfterRenderPhase,
    Inject,
    Injectable,
    NgZone,
    OnDestroy,
    PLATFORM_ID,
    afterRender,
    computed,
    signal
  } from '@angular/core'
  import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router'
  import { Subject, filter, takeUntil } from 'rxjs'
  import { isPlatformBrowser } from '@angular/common'
  
  @Injectable({
    providedIn: 'root'
  })
  export class OrientationService implements OnDestroy {
    private routeSub$: Subject<void> = new Subject<void>()
  
    private orientationState = signal<boolean>(true)
    screen = computed<boolean>(() => this.orientationState())

    private isMobile = signal<boolean>(true)
    screenMobile = computed<boolean>(() => this.orientationState())
  
    private urlState = signal<string>('/')
    url = computed<string>(() => this.urlState())
  
    constructor(
      private ngZone: NgZone,
      private router: Router,
      @Inject(PLATFORM_ID) private platformId: Object
      ) {
      if (isPlatformBrowser(this.platformId)) {
        this.setOrientationState()
        window.addEventListener('resize', () => {
          this.ngZone.run(() => {
            const orientationType = window.screen.orientation.type
            switch (orientationType) {
              case 'landscape-primary':
              case 'landscape-secondary':
                this.orientationState.set(false)
                break
              case 'portrait-primary':
              case 'portrait-secondary':
                this.orientationState.set(true)
                break
              default:
                this.orientationState.set(true)
                break
            }
             // Check if mobile for landscape of mobile for nav headers.
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        this.isMobile.set(true);
      } else if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|webOS)/i.test(
          ua
        )
      ) {
        this.isMobile.set(true);
      } else {
        this.isMobile.set(false);
      }
          })
        })
        // SSR check changing url
        afterRender(
          () => {
            this.urlState.set(this.router.url)
            this.router.events
              .pipe(
                filter(
                  (event: RouterEvent): event is NavigationEnd =>
                    event instanceof NavigationEnd
                ),
                takeUntil(this.routeSub$)
              )
              // eslint-disable-next-line rxjs-angular/prefer-async-pipe
              .subscribe((event: NavigationEnd) => {
                this.urlState.set(event.url)
              })
          },
          { phase: AfterRenderPhase.Read }
        )
      }
    }
    // SSR
    private setOrientationState(): void {
      if (isPlatformBrowser(this.platformId)) {
      const orientationType = window.screen.orientation.type
      switch (orientationType) {
        case 'landscape-primary':
        case 'landscape-secondary':
          this.orientationState.set(false)
          break
        case 'portrait-primary':
        case 'portrait-secondary':
          this.orientationState.set(true)
          break
        default:
          this.orientationState.set(true)
          break
      }
    }
    }
  
    ngOnDestroy(): void {
      this.routeSub$.next()
      this.routeSub$.complete()
    }
  }
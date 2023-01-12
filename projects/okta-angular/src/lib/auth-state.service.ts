import { DOCUMENT, Location } from '@angular/common';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Event, NavigationStart, Router, RouterEvent } from '@angular/router';
import { OktaAuth, AuthState, toRelativeUrl } from '@okta/okta-auth-js';
import { BehaviorSubject, defer, filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { OktaAuthConfigService } from './auth-config.service';
import { OktaConfig, OKTA_AUTH, OKTA_CONFIG } from './okta.config';

const defaultAuthState: AuthState = {
  isAuthenticated: false
}

@Injectable({
  providedIn: 'root'
})
export class OktaAuthStateService implements OnDestroy {
  private authStateSub$: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>(defaultAuthState);
  private destroySub$: Subject<void> = new Subject<void>;

  public readonly authState$: Observable<AuthState> = this.authStateSub$.asObservable();
  public readonly oktaAuth: OktaAuth = this.oktaAuthInstance; // entry point to access OktaAuth

  constructor(@Inject(OKTA_AUTH) private oktaAuthInstance: OktaAuth, private router: Router, private location: Location, @Optional() @Inject(OKTA_CONFIG) private config: OktaConfig) {

    // Only needed if not using CallbackComponent
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent && e instanceof NavigationStart),
      filter((routerEvent: RouterEvent) => routerEvent.url.includes('code')),
      filter(() => oktaAuthInstance.isLoginRedirect()),
      switchMap(() => defer(() => oktaAuthInstance.handleLoginRedirect())),
      takeUntil(this.destroySub$)
    ).subscribe(_ => {
      console.log('Login redirect handled');
    });

    this.authStateHandler = this.authStateHandler.bind(this);

    // set initial authState
    const initialAuthState = this.oktaAuth.authStateManager.getAuthState() || defaultAuthState;
    this.authStateSub$.next(initialAuthState);

    // subscribe to future changes
    this.oktaAuth.authStateManager.subscribe(this.authStateHandler);
  }

  public ngOnDestroy(): void {
    this.oktaAuth.stop();
    this.destroySub$.next();
    this.destroySub$.complete();
  }

  public signIn(): void {
    this.oktaAuth.signInWithRedirect();
  }

  public signOut(): void {
    this.oktaAuth.signOut();
  }

  private authStateHandler(authState: AuthState): void {
    this.authStateSub$.next(authState);
  }
}

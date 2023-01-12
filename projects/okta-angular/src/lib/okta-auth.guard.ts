import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthStateService } from './auth-state.service';
import { map, Observable, tap } from 'rxjs';
import { OKTA_AUTH } from './okta.config';

@Injectable()
export class OktaAuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private auth: OktaAuthStateService, private router: Router) { }

  // Will want to support CanMatch starting with v14

  public canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

      return this.auth.authState$.pipe(
        map((authState: AuthState) => authState.isAuthenticated ?? false),
        tap((isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            this.oktaAuth.signInWithRedirect();
          }
        })
      );
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth.authState$.pipe(
      map((authState: AuthState) => authState.isAuthenticated ?? false),
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.oktaAuth.signInWithRedirect();
        }
      })
    );
  }
}

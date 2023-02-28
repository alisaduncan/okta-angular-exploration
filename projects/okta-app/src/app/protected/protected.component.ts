import { Component, Inject, OnInit } from '@angular/core';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { OktaAuthStateOrigService, OKTA_AUTH } from 'okta-angular';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-protected',
  template: `
    <p>protected works!</p>
    <div *oktaHasAnyGroup="'test'">
      In protected group
    </div>
    <span *ngIf="name$ | async as name">
        Welcome to protected module, {{name}}
    </span>
  `
})
export class ProtectedComponent implements OnInit {

  name$ = this.oktaStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
    map((authState: AuthState) => authState.idToken?.claims.name ?? '')
  );

  constructor(private oktaStateService: OktaAuthStateOrigService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { } // original pattern


  ngOnInit(): void {
  }

}

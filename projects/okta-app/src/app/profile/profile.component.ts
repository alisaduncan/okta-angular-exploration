import { Component, OnInit } from '@angular/core';
import { AuthState } from '@okta/okta-auth-js';
import { OktaAuthStateOrigService, OktaAuthStateService } from 'okta-angular';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  template: `
    <p>You're logged in!
      <span *ngIf="name$ | async as name">
        Welcome, {{name}}
      </span>
    </p>
    <p *oktaHasAnyGroup="'test'">
      Hello from oktaHasAnyGroup directive 
    </p>
  `,
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public name$!: Observable<string>;

  // constructor(private oktaStateService: OktaAuthStateService) { } // OktaAuthModule example
  constructor(private oktaStateService: OktaAuthStateOrigService) { } // original pattern

  public ngOnInit(): void {
    this.name$ = this.oktaStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
  }

}

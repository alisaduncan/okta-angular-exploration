import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth, AuthState, toRelativeUrl } from '@okta/okta-auth-js';
import { OktaAuthStateOrigService, OktaAuthStateService, OKTA_AUTH } from 'okta-angular';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html' ,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'okta-app';
  public isAuthenticated$ = this.oktaStateService.authState$.pipe(
    filter((s: AuthState) => !!s),
    map((s: AuthState) => s.isAuthenticated ?? false)
  );

  constructor(private oktaStateService: OktaAuthStateOrigService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { } // original pattern
  // constructor(private oktaStateService: OktaAuthStateService) { } // when using the OktaAuthModule method example


  public ngOnInit(): void { }

  public async signIn() : Promise<void> {

    await this.oktaAuth.signInWithRedirect();
    // await this.oktaStateService.signIn();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
    // await this.oktaStateService.signOut();
  }
}

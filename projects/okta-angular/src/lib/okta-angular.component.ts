import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaConfig, OKTA_AUTH, OKTA_CONFIG_ORIG, OktaConfigOrig } from './okta.config';

@Component({
  selector: 'lib-okta-angular',
  template: `
    <div>{{error}}</div>
  `,
  styles: [
  ]
})
export class OktaAngularComponent implements OnInit {
  public error?: string;

  constructor(
    @Inject(OKTA_CONFIG_ORIG) private config: OktaConfigOrig,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      // Parse code or tokens from the URL, store tokens in the TokenManager, and redirect back to the originalUri
      await this.oktaAuth.handleLoginRedirect();
    } catch (e) {
      // Callback from social IDP. Show custom login page to continue.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Supports auth-js v5 & v6-7
      const isInteractionRequiredError = this.oktaAuth.isInteractionRequiredError || this.oktaAuth.idx.isInteractionRequiredError;
      // if (isInteractionRequiredError(e) && this.injector) {
      //   const { onAuthResume, onAuthRequired } = this.config;
      //   const callbackFn = onAuthResume || onAuthRequired;
      //   if (callbackFn) {
      //     callbackFn(this.oktaAuth, this.injector);
      //     return;
      //   }
      // }
      this.error = (e as Error).toString();
    }
  }

}

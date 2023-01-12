import { InjectionToken } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';

// to support loading the config from an external API at app load time
export interface OktaConfig {
  clientId: string;
  domain: string;
  redirectUrl: string;
}

// Original config option to pass in the OktaAuth instance
export interface OktaConfigOrig {
  oktaAuth: OktaAuth;
}

export const OKTA_CONFIG = new InjectionToken<OktaConfig>('okta.config');
export const OKTA_AUTH = new InjectionToken<OktaAuth>('okta.auth');

export const OKTA_CONFIG_ORIG = new InjectionToken<OktaConfigOrig>('okta.config.orig');

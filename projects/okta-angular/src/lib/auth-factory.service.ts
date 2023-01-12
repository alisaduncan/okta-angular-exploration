import { Location } from '@angular/common';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import OktaAuth, { toRelativeUrl } from '@okta/okta-auth-js';
import { OktaAuthConfigService } from './auth-config.service';
import { OktaConfig, OKTA_CONFIG } from './okta.config';

export class AuthFactory {
  public static createOktaAuth(configService: OktaAuthConfigService, router?: Router, location?: Location ): OktaAuth {
    const config = configService.getConfig();

    if (!config) {
      throw new Error('Eek! Don\'t forget to set the config using OktaAuthModule.forRoot() or through AuthConfigService.setConfig().');
    }

    const oktaAuth = new OktaAuth({...config});
    if (!oktaAuth.options.restoreOriginalUri && router && location) {
      oktaAuth.options.restoreOriginalUri = async (_, originalUri: string | undefined) => {
        const baseUrl = window.location.origin + location.prepareExternalUrl('');
        const routePath = toRelativeUrl(originalUri || '/', baseUrl);
        router.navigateByUrl(routePath);
      };
    }

    oktaAuth.start();
    return oktaAuth;
  }
}

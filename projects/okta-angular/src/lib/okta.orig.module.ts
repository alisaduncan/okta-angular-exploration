import { Location } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { OktaAuthStateOrigService } from './auth-state.orig.service';
import { OktaAngularComponent } from './okta-angular.component';
import { OktaAuthGuard } from './okta-auth.guard';
import { OktaConfigOrig, OKTA_AUTH, OKTA_CONFIG_ORIG } from './okta.config';

// This is pretty much the existing OktaAuthModule implementation, with the extra forRoot static method
@NgModule({
  declarations: [OktaAngularComponent],
  providers: [
    OktaAuthGuard,
    OktaAuthStateOrigService,
    {
      provide: OKTA_AUTH,
      useFactory: (config: OktaConfigOrig) => config.oktaAuth,
      deps: [ OKTA_CONFIG_ORIG ]
    }
  ]
})
export class OktaAuthOrigModule {
  static forRoot(config?: OktaConfigOrig): ModuleWithProviders<OktaAuthOrigModule> {
    return {
      ngModule: OktaAuthOrigModule,
      providers: [
        OktaAuthStateOrigService,
        OktaAuthGuard,
        { provide: OKTA_CONFIG_ORIG, useValue: config },
        {
          provide: OKTA_AUTH,
          useFactory: (config: OktaConfigOrig) => config.oktaAuth,
          deps: [ OKTA_CONFIG_ORIG ]
        }
      ]
    }
  }

  constructor(
    @Inject(OKTA_CONFIG_ORIG) config: OktaConfigOrig,
    @Optional() location?: Location,
    @Optional() router?: Router
  ) {
    const { oktaAuth } = config;

    // Provide a default implementation of `restoreOriginalUri`
    if (!oktaAuth.options.restoreOriginalUri && router && location) {
      oktaAuth.options.restoreOriginalUri = async (_: any, originalUri: string | undefined) => {
        const baseUrl = window.location.origin + location.prepareExternalUrl('');
        const routePath = toRelativeUrl(originalUri || '/', baseUrl);
        router.navigateByUrl(routePath);
      };
    }

    // Start services
    oktaAuth.start();
  }
 }

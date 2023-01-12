import { Location } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { OktaAuthConfigService } from './auth-config.service';
import { AuthFactory } from './auth-factory.service';
import { OktaAuthStateService } from './auth-state.service';
import { OktaAngularComponent } from './okta-angular.component';
import { OktaAuthGuard } from './okta-auth.guard';
import { OktaConfig, OKTA_AUTH, OKTA_CONFIG } from './okta.config';

// Supports loading config from external API at load time. Note no constructor with expectation of instantiated OktaAuth
// The smarts for this approach is in the OktaAuthStateService.

@NgModule({
  // Unneeded with router event, but you can also have it if desired.
  // Angular doesn't support 2 modules declaring the same component so commenting out for now
  // declarations: [OktaAngularComponent]
})
export class OktaAuthModule {
  static forRoot(config?: OktaConfig): ModuleWithProviders<OktaAuthModule> {
    return {
      ngModule: OktaAuthModule,
      providers: [
        OktaAuthConfigService,
        OktaAuthStateService,
        OktaAuthGuard,
        { provide: OKTA_CONFIG, useValue: config },
        { provide: OKTA_AUTH, useFactory: AuthFactory.createOktaAuth, deps: [OktaAuthConfigService, Router, Location] }
      ]
    }
  }
 }

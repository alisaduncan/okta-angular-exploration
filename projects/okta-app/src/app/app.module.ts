import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthConfigService, OktaAuthModule, OktaAuthOrigModule, OktaConfigOrig, OktaConfig, OKTA_CONFIG_ORIG } from 'okta-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { take, tap } from 'rxjs';

 const oktaAuth = new OktaAuth({
    clientId: 'beep',
    issuer: 'boop',
    redirectUri: window.location.origin + '/login/callback'
});

// function configInitializer(httpBackend: HttpBackend, configService: OktaAuthConfigService): () => void {
//   return () =>
//   new HttpClient(httpBackend)
//   .get('http://localhost:3000/config') // this is from okta-angular-async-config-example repo's Express server
//   .pipe(
//     tap((authConfig: any) => configService.setConfig(authConfig)),
//     take(1)
//   );
// }

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // OktaAuthModule.forRoot({
    //   clientId: 'beep',
    //   issuer: 'boop'
    // })
    OktaAuthOrigModule.forRoot({oktaAuth})
    // OktaAuthOrigModule
  ],
  providers: [
    // { provide: APP_INITIALIZER, useFactory: configInitializer, deps: [HttpBackend, OktaAuthConfigService], multi: true } // enable when importing OktaAuthModule and loading config from an external API
    // { provide: OKTA_CONFIG_ORIG, useValue: {oktaAuth} } // enable when importing OktaAuthOrigModule without the forRoot
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

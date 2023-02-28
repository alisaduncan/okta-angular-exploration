import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAngularComponent, OktaAuthGuard } from 'okta-angular';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard] },
  { path: 'profile2', component: ProfileComponent, canActivate: [OktaAuthGuard] },
  { path: 'profile3', component: ProfileComponent, canActivate: [OktaAuthGuard] },
  { path: 'protected', loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule) },
  { path: 'login/callback', component: OktaAngularComponent },
  // { path: '', component: AppComponent },
  // { path: '', redirectTo: '', pathMatch: 'full', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

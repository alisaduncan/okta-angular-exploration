import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { OktaAuthOrigModule } from 'okta-angular';


@NgModule({
  declarations: [
    ProtectedComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    OktaAuthOrigModule
  ]
})
export class ProtectedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';

import { jwtOptionsFactory } from './global/helpers';
import { AuthGuard } from './global/auth.guard';
import { AuthService } from './global/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [ LocalStorageService ]
      }
    }),
    LocalStorageModule.forRoot({
      prefix: 'dev-project_client__',
      storageType: 'localStorage'
    }),
    LayoutModule,
  ],
  providers: [
    AuthGuard, AuthService
  ],
})
export class CoreModule { }

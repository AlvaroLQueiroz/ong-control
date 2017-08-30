import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    ApiService,
    AuthService,
  ]
})
export class ApiModule { }

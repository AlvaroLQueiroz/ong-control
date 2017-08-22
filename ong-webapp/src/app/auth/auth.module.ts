import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { MaterializeCssModule } from './../materialize-css/materialize-css.module';

import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeCssModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }

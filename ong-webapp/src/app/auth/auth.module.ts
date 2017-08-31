import { ApiModule } from './../api/api.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



@NgModule({
  imports: [
    ApiModule,
    CommonModule,
    CoreModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [],
})
export class AuthModule { }

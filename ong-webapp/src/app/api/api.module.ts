import { ViaCepService } from './via-cep.service';
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
    ViaCepService,
  ]
})
export class ApiModule { }

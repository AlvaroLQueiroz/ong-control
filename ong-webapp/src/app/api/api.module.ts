import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletService } from './wallet.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    WalletService
  ]
})
export class ApiModule { }

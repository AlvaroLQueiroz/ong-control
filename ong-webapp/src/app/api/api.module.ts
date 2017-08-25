import { TransactionService } from './transaction.service';
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
    WalletService,
    TransactionService,
  ]
})
export class ApiModule { }

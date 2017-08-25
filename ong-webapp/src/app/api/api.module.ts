import { TransactionCategoryService } from './transaction-category.service';
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
    TransactionCategoryService,
  ]
})
export class ApiModule { }

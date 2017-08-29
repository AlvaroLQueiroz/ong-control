import { PaginationService } from './pagination.service';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
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
    ApiService,
    AuthService,
    PaginationService,
    TransactionCategoryService,
    TransactionService,
    WalletService,
  ]
})
export class ApiModule { }

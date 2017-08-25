import { TransactionCategory } from './transaction-category';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TransactionCategory],
  exports: [TransactionCategory]
})
export class TransactionCategoryModule { }

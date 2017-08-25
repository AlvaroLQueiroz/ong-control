import { TransactionCategoryService } from './../../api/transaction-category.service';
import { TransactionCategory } from './../transaction-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-category-list',
  templateUrl: './transaction-category-list.component.html',
  styleUrls: ['./transaction-category-list.component.css']
})
export class TransactionCategoryListComponent implements OnInit {

  transactionsCategories: TransactionCategory[] = null;

  constructor(
    private transactionCategoryService: TransactionCategoryService
  ) { }

  ngOnInit() {
    this.transactionCategoryService.listTransactionCategory()
      .then(transactionCategories => {
        this.transactionsCategories = transactionCategories;
      })
  }

}
